import { useEffect, useRef, useState, type ReactElement } from 'react';
import type { Block, ChartNumberFormat, Lang } from '../../lib/ai/types';
import type { Copy } from '../../lib/ai/copy';

type ChartBlock = Extract<Block, { kind: 'chart' }>;

const PALETTE = ['var(--gold)', 'var(--cyan)', 'var(--signal)', 'var(--cream)', 'var(--gold-light)', 'var(--muted)'];

// Server render uses this width; the real width is measured after mount, so
// SSR and hydration always agree.
const DEFAULT_WIDTH = 640;

const color = (i: number) => PALETTE[i % PALETTE.length];

// Copy has no lang field, but its language switch always names the other one.
export const langFromCopy = (copy: Copy): Lang => (copy.langSwitch === 'English' ? 'es' : 'en');

export function makeNumberFormatter(nf: ChartNumberFormat | undefined, lang: Lang): (n: number) => string {
  const opts: Intl.NumberFormatOptions = {};
  const decimals = typeof nf?.decimals === 'number' ? Math.max(0, Math.min(4, Math.round(nf.decimals))) : undefined;
  if (decimals !== undefined) {
    opts.minimumFractionDigits = decimals;
    opts.maximumFractionDigits = decimals;
  } else {
    opts.maximumFractionDigits = nf?.compact ? 1 : 2;
  }
  if (nf?.compact) opts.notation = 'compact';
  if (nf?.style === 'currency' && nf.currency && /^[A-Za-z]{3}$/.test(nf.currency)) {
    opts.style = 'currency';
    opts.currency = nf.currency.toUpperCase();
  }
  const locale = lang === 'es' ? 'es-CO' : 'en-US';
  let intl: Intl.NumberFormat;
  try {
    intl = new Intl.NumberFormat(locale, opts);
  } catch {
    intl = new Intl.NumberFormat(locale, { maximumFractionDigits: 2 });
  }
  const pct = nf?.style === 'percent' ? '%' : '';
  return (n) => `${nf?.prefix ?? ''}${intl.format(n)}${pct}${nf?.suffix ?? ''}`;
}

function isValid(block: ChartBlock): boolean {
  const labels = block.labels;
  const series = block.series;
  if (!Array.isArray(labels) || !labels.length || !Array.isArray(series) || !series.length) return false;
  const shaped = series.every(
    (s) => s && Array.isArray(s.data) && s.data.length === labels.length && s.data.every((v) => typeof v === 'number' && Number.isFinite(v)),
  );
  if (!shaped) return false;
  if (block.chartType === 'pie') return series[0].data.reduce((a, v) => a + Math.max(0, v), 0) > 0;
  return ['bar', 'line', 'area'].includes(block.chartType);
}

function niceStep(raw: number): number {
  const exp = Math.floor(Math.log10(raw));
  const f = raw / 10 ** exp;
  const nice = f <= 1 ? 1 : f <= 2 ? 2 : f <= 5 ? 5 : 10;
  return nice * 10 ** exp;
}

function ticksFor(min: number, max: number, count: number): number[] {
  if (min === max) max = min + 1;
  const step = niceStep((max - min) / count);
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const out: number[] = [];
  // Rounding guards against float drift such as 0.30000000000000004.
  for (let v = lo; v <= hi + step / 2; v += step) out.push(Number(v.toPrecision(12)));
  return out;
}

function clip(label: string, max: number): string {
  return label.length > max ? `${label.slice(0, max - 1)}…` : label;
}

function DataTable({ block, fmt, caption }: { block: ChartBlock; fmt: (n: number) => string; caption?: string }) {
  const labels = Array.isArray(block.labels) ? block.labels : [];
  const series = Array.isArray(block.series) ? block.series.filter((s) => s && Array.isArray(s.data)) : [];
  const rows = Math.max(labels.length, ...series.map((s) => s.data.length), 0);
  return (
    <div className="air-table__scroll">
      <table className="air-table__el">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th scope="col" />
            {series.map((s, i) => (
              <th key={i} scope="col">
                {s.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }, (_, r) => (
            <tr key={r}>
              <th scope="row">{labels[r] ?? ''}</th>
              {series.map((s, i) => {
                const v = s.data[r];
                return <td key={i}>{typeof v === 'number' && Number.isFinite(v) ? fmt(v) : ''}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function arcPath(cx: number, cy: number, r: number, inner: number, a0: number, a1: number): string {
  const pt = (rad: number, a: number) => `${cx + rad * Math.sin(a)} ${cy - rad * Math.cos(a)}`;
  const large = a1 - a0 > Math.PI ? 1 : 0;
  if (inner <= 0) return `M ${cx} ${cy} L ${pt(r, a0)} A ${r} ${r} 0 ${large} 1 ${pt(r, a1)} Z`;
  return `M ${pt(r, a0)} A ${r} ${r} 0 ${large} 1 ${pt(r, a1)} L ${pt(inner, a1)} A ${inner} ${inner} 0 ${large} 0 ${pt(inner, a0)} Z`;
}

function PieSvg({ block, width, height, fmt }: { block: ChartBlock; width: number; height: number; fmt: (n: number) => string }) {
  const values = block.series[0].data.map((v) => Math.max(0, v));
  const total = values.reduce((a, v) => a + v, 0);
  const cx = width / 2;
  const cy = height / 2;
  const r = Math.min(width, height) / 2 - 8;
  const inner = block.donut === false ? 0 : r * 0.58;
  let angle = 0;
  return (
    <g>
      {values.map((v, i) => {
        if (v <= 0) return null;
        const share = v / total;
        // A single full slice cannot be drawn as one arc, so stop just short.
        const sweep = Math.min(share * Math.PI * 2, Math.PI * 2 - 0.0001);
        const d = arcPath(cx, cy, r, inner, angle, angle + sweep);
        angle += share * Math.PI * 2;
        return (
          <path key={i} d={d} style={{ fill: color(i), opacity: 1 - Math.floor(i / PALETTE.length) * 0.35 }} className="air-chart__slice">
            <title>{`${block.labels[i]}: ${fmt(block.series[0].data[i])} (${Math.round(share * 100)}%)`}</title>
          </path>
        );
      })}
    </g>
  );
}

function CartesianSvg({ block, width, height, fmt }: { block: ChartBlock; width: number; height: number; fmt: (n: number) => string }) {
  const { labels, series, chartType } = block;
  const n = labels.length;
  const stacked = chartType === 'bar' && !!block.stacked && series.length > 1;

  let min = 0;
  let max = 0;
  if (stacked) {
    for (let i = 0; i < n; i++) {
      let pos = 0;
      let neg = 0;
      for (const s of series) {
        if (s.data[i] >= 0) pos += s.data[i];
        else neg += s.data[i];
      }
      max = Math.max(max, pos);
      min = Math.min(min, neg);
    }
  } else {
    for (const s of series) {
      max = Math.max(max, ...s.data);
      min = Math.min(min, ...s.data);
    }
  }
  const ticks = ticksFor(min, max, height < 280 ? 3 : 4);
  const lo = ticks[0];
  const hi = ticks[ticks.length - 1];

  const tickText = ticks.map(fmt);
  const left = Math.max(28, Math.max(...tickText.map((t) => t.length)) * 6.6 + 10);
  const right = 8;
  const top = 10;
  const bottom = 28;
  const plotW = Math.max(10, width - left - right);
  const plotH = Math.max(10, height - top - bottom);
  const y = (v: number) => top + plotH - ((v - lo) / (hi - lo)) * plotH;
  const zero = y(Math.min(Math.max(0, lo), hi));

  const band = plotW / n;
  const xBand = (i: number) => left + band * i + band / 2;
  const xLine = (i: number) => (n === 1 ? left + plotW / 2 : left + (plotW * i) / (n - 1));
  const x = chartType === 'bar' ? xBand : xLine;

  // Thin out axis labels so they never collide on a phone.
  const every = Math.max(1, Math.ceil(n / Math.max(1, Math.floor(plotW / 64))));
  const maxChars = Math.max(4, Math.floor((band * every) / 7));

  const marks: ReactElement[] = [];
  if (chartType === 'bar') {
    // Capped so a two point chart does not draw slabs.
    const inner = Math.min(band * 0.72, stacked ? 72 : 44 * series.length);
    const slot = stacked ? inner : inner / series.length;
    for (let i = 0; i < n; i++) {
      let pos = 0;
      let neg = 0;
      series.forEach((s, si) => {
        const v = s.data[i];
        let y0: number;
        let y1: number;
        if (stacked) {
          const base = v >= 0 ? pos : neg;
          y0 = y(base);
          y1 = y(base + v);
          if (v >= 0) pos += v;
          else neg += v;
        } else {
          y0 = zero;
          y1 = y(v);
        }
        const bx = left + band * i + (band - inner) / 2 + (stacked ? 0 : slot * si);
        marks.push(
          <rect
            key={`${i}-${si}`}
            x={bx}
            y={Math.min(y0, y1)}
            width={Math.max(1, slot - (stacked ? 0 : 2))}
            height={Math.max(0, Math.abs(y1 - y0))}
            style={{ fill: color(si) }}
          >
            <title>{`${labels[i]}, ${s.name}: ${fmt(v)}`}</title>
          </rect>,
        );
      });
    }
  } else {
    series.forEach((s, si) => {
      const pts = s.data.map((v, i) => `${x(i)},${y(v)}`);
      if (chartType === 'area') {
        marks.push(
          <path
            key={`a${si}`}
            d={`M ${x(0)},${zero} L ${pts.join(' L ')} L ${x(n - 1)},${zero} Z`}
            style={{ fill: color(si), fillOpacity: 0.16 }}
          />,
        );
      }
      marks.push(<polyline key={`l${si}`} points={pts.join(' ')} className="air-chart__line" style={{ stroke: color(si) }} />);
      if (n <= 24) {
        s.data.forEach((v, i) =>
          marks.push(
            <circle key={`d${si}-${i}`} cx={x(i)} cy={y(v)} r={3} style={{ fill: color(si) }}>
              <title>{`${labels[i]}, ${s.name}: ${fmt(v)}`}</title>
            </circle>,
          ),
        );
      }
    });
  }

  return (
    <g>
      {ticks.map((t, i) => (
        <g key={`t${i}`}>
          <line x1={left} x2={width - right} y1={y(t)} y2={y(t)} className={t === 0 ? 'air-chart__zero' : 'air-chart__grid'} />
          <text x={left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="air-chart__tick">
            {tickText[i]}
          </text>
        </g>
      ))}
      {marks}
      {labels.map((l, i) =>
        i % every === 0 ? (
          <text key={`x${i}`} x={x(i)} y={height - 8} textAnchor={chartType === 'bar' || n === 1 ? 'middle' : i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle'} className="air-chart__tick">
            {clip(String(l), maxChars)}
          </text>
        ) : null,
      )}
    </g>
  );
}

export function Chart({ block, copy, lang }: { block: ChartBlock; copy: Copy; lang?: Lang }) {
  const fmt = makeNumberFormatter(block.numberFormat, lang ?? langFromCopy(copy));
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setWidth(Math.max(240, Math.round(el.clientWidth)));
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!isValid(block)) {
    return (
      <figure className="air-chart air-chart--table">
        <DataTable block={block} fmt={fmt} caption={copy.chartTable} />
        {block.caption && <figcaption className="air-caption">{block.caption}</figcaption>}
      </figure>
    );
  }

  const isPie = block.chartType === 'pie';
  const height = isPie ? Math.min(300, Math.round(width * 0.62)) : width < 480 ? 240 : 320;
  const series = isPie ? block.series.slice(0, 1) : block.series;
  const summary = series
    .map((s) => `${s.name}: ${block.labels.slice(0, 12).map((l, i) => `${l} ${fmt(s.data[i])}`).join(', ')}${block.labels.length > 12 ? ', …' : ''}`)
    .join('; ');
  const legend = isPie
    ? block.labels.map((l, i) => ({ name: `${l} ${fmt(block.series[0].data[i])}`, i }))
    : series.length > 1
      ? series.map((s, i) => ({ name: s.name, i }))
      : [];

  return (
    <figure className={`air-chart air-chart--${block.chartType}`}>
      <div className="air-chart__canvas" ref={ref}>
        <svg
          role="img"
          aria-label={block.caption ? `${block.caption}. ${summary}` : summary}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          className="air-chart__svg"
        >
          {isPie ? (
            <PieSvg block={block} width={width} height={height} fmt={fmt} />
          ) : (
            <CartesianSvg block={block} width={width} height={height} fmt={fmt} />
          )}
        </svg>
      </div>
      {legend.length > 0 && (
        <ul className="air-chart__legend" aria-hidden="true">
          {legend.map(({ name, i }) => (
            <li key={i}>
              <span className="air-chart__swatch" style={{ background: color(i), opacity: isPie ? 1 - Math.floor(i / PALETTE.length) * 0.35 : 1 }} />
              {name}
            </li>
          ))}
        </ul>
      )}
      {block.caption && <figcaption className="air-caption">{block.caption}</figcaption>}
      <details className="air-chart__data">
        <summary>{copy.chartTable}</summary>
        <DataTable block={block} fmt={fmt} />
      </details>
    </figure>
  );
}
