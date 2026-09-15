import { Component, useEffect, useState, type ReactNode } from 'react';
import type { Block, CalloutTone, Lang } from '../../lib/ai/types';
import type { Copy } from '../../lib/ai/copy';
import { Markdown } from './Markdown';
import { Chart } from './Chart';

type Of<K extends Block['kind']> = Extract<Block, { kind: K }>;

const TONES: CalloutTone[] = ['info', 'positive', 'warning', 'accent'];

const list = <T,>(v: T[] | undefined | null): T[] => (Array.isArray(v) ? v : []);

const isHttpUrl = (url: unknown): url is string => typeof url === 'string' && /^https?:\/\/\S+$/i.test(url.trim());

// CTA links are stricter than prose links: https or an in-site path only.
function ctaHref(url: unknown): string | null {
  if (typeof url !== 'string') return null;
  const u = url.trim();
  if (/^https:\/\/\S+$/i.test(u)) return u;
  if (u.startsWith('/') && !u.startsWith('//') && !u.startsWith('/\\')) return u;
  return null;
}

// Mirrors parseVideoEmbed in unbound-app so only known players are ever iframed.
function videoEmbed(url: string): string | null {
  const u = url.trim();
  let m = u.match(/(?:youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/);
  if (m) return `https://www.youtube.com/embed/${m[1]}`;
  m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (m) return `https://player.vimeo.com/video/${m[1]}`;
  m = u.match(/loom\.com\/(?:share|embed)\/([A-Za-z0-9]+)/);
  if (m) return `https://www.loom.com/embed/${m[1]}`;
  return null;
}

function Caption({ text }: { text?: string }) {
  return text ? <figcaption className="air-caption">{text}</figcaption> : null;
}

function TableBlock({ block }: { block: Of<'table'> }) {
  const columns = list(block.columns);
  const rows = list(block.rows);
  const width = Math.max(columns.length, ...rows.map((r) => list(r).length), 0);
  return (
    <figure className="air-table">
      <div
        className="air-table__scroll"
        tabIndex={0}
        role={block.caption ? 'region' : undefined}
        aria-label={block.caption || undefined}
      >
        <table className="air-table__el">
          {columns.length > 0 && (
            <thead>
              <tr>
                {Array.from({ length: width }, (_, i) => (
                  <th key={i} scope="col">
                    {columns[i] ?? ''}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows.map((row, r) => (
              <tr key={r}>
                {Array.from({ length: width }, (_, i) => (
                  <td key={i}>{list(row)[i] ?? ''}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Caption text={block.caption} />
    </figure>
  );
}

function BeforeAfterBlock({ block, copy }: { block: Of<'beforeAfter'>; copy: Copy }) {
  // The result leads; the reader can flip back to where it started.
  const [side, setSide] = useState<'before' | 'after'>('after');
  const sides = [
    { key: 'before' as const, kicker: copy.before, data: block.before },
    { key: 'after' as const, kicker: copy.after, data: block.after },
  ];
  return (
    <figure className="air-ba">
      {block.label && <p className="air-kicker">{block.label}</p>}
      <div className="air-ba__toggle" role="group" aria-label={block.label || `${copy.before} / ${copy.after}`}>
        {sides.map((s) => (
          <button
            key={s.key}
            type="button"
            className="air-ba__btn"
            aria-pressed={side === s.key}
            onClick={() => setSide(s.key)}
          >
            {s.kicker}
          </button>
        ))}
      </div>
      <div className="air-ba__panes">
        {sides.map((s) => (
          <div key={s.key} className={`air-ba__pane air-ba__pane--${s.key}${side === s.key ? ' is-on' : ''}`}>
            <span className="air-ba__kicker">{s.kicker}</span>
            <span className="air-ba__value">{s.data?.value ?? ''}</span>
            <span className="air-ba__label">{s.data?.label ?? ''}</span>
          </div>
        ))}
      </div>
      <Caption text={block.caption} />
    </figure>
  );
}

function ChecklistBlock({ block, resourceKey }: { block: Of<'checklist'>; resourceKey: string }) {
  const items = list(block.items);
  const storageKey = `dfj_ai_check:${resourceKey}:${block.id}`;
  const [checked, setChecked] = useState<boolean[]>(() => items.map((it) => !!it.checked));

  // Saved state is read after mount only, so the server markup and the first
  // client render match.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (!raw) return;
      const saved: unknown = JSON.parse(raw);
      if (Array.isArray(saved) && saved.length === items.length) setChecked(saved.map((v) => v === true));
    } catch {
      // Storage can be blocked in in-app browsers; the defaults still work.
    }
  }, [storageKey, items.length]);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = prev.map((v, n) => (n === i ? !v : v));
      try {
        window.localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Not persisting is fine.
      }
      return next;
    });
  };

  return (
    <figure className="air-checklist">
      <ul className="air-checklist__list">
        {items.map((it, i) => (
          <li key={i} className={`air-checklist__item${checked[i] ? ' is-done' : ''}`}>
            <label className="air-checklist__label">
              <input
                type="checkbox"
                className="air-checklist__box"
                checked={!!checked[i]}
                onChange={() => toggle(i)}
              />
              <span className="air-checklist__text">{it.text}</span>
            </label>
          </li>
        ))}
      </ul>
      <Caption text={block.caption} />
    </figure>
  );
}

function VideoBlock({ block }: { block: Of<'video'> }) {
  if (typeof block.url !== 'string') return null;
  const embed = videoEmbed(block.url);
  if (!embed) {
    if (!isHttpUrl(block.url)) return null;
    return (
      <p className="air-video air-video--link">
        <a href={block.url.trim()}>{block.title || block.url.trim()}</a>
        {block.caption && <span className="air-caption">{block.caption}</span>}
      </p>
    );
  }
  return (
    <figure className="air-video">
      <div className="air-video__frame">
        <iframe
          src={embed}
          title={block.title || 'Video'}
          loading="lazy"
          allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
      <Caption text={block.caption} />
    </figure>
  );
}

function BlockView({ block, resourceKey, copy, lang }: { block: Block; resourceKey: string; copy: Copy; lang?: Lang }) {
  switch (block.kind) {
    case 'text':
      return (
        <div className="air-text">
          <Markdown md={block.md} />
        </div>
      );

    case 'table':
      return <TableBlock block={block} />;

    case 'chart':
      return <Chart block={block} copy={copy} lang={lang} />;

    case 'image':
      if (!isHttpUrl(block.url)) return null;
      return (
        <figure className="air-image">
          <img src={block.url.trim()} alt={block.alt ?? ''} loading="lazy" decoding="async" />
          <Caption text={block.caption} />
        </figure>
      );

    case 'callout': {
      const tone = TONES.includes(block.tone) ? block.tone : 'info';
      return (
        <aside className={`air-callout air-callout--${tone}`}>
          <Markdown md={block.md} />
        </aside>
      );
    }

    case 'stat':
      return (
        <figure className="air-stat">
          <dl className="air-stat__grid">
            {list(block.items).map((it, i) => (
              <div key={i} className="air-stat__item">
                <dt className="air-stat__label">{it.label}</dt>
                <dd className="air-stat__value">{it.value}</dd>
              </div>
            ))}
          </dl>
          <Caption text={block.caption} />
        </figure>
      );

    case 'accordion':
      return (
        <div className="air-accordion">
          {list(block.items).map((it, i) => (
            <details key={i} className="air-accordion__item">
              <summary className="air-accordion__summary">{it.title}</summary>
              <div className="air-accordion__body">
                <Markdown md={it.md} />
              </div>
            </details>
          ))}
        </div>
      );

    case 'beforeAfter':
      return <BeforeAfterBlock block={block} copy={copy} />;

    case 'timeline':
      return (
        <figure className="air-timeline">
          <ol className="air-timeline__list">
            {list(block.items).map((it, i) => (
              <li key={i} className="air-timeline__item">
                {it.stat && <span className="air-timeline__stat">{it.stat}</span>}
                <span className="air-timeline__label">{it.label}</span>
                {it.detail && <span className="air-timeline__detail">{it.detail}</span>}
              </li>
            ))}
          </ol>
          <Caption text={block.caption} />
        </figure>
      );

    case 'quote':
      return (
        <figure className="air-quote">
          <blockquote className="air-quote__body">
            <Markdown md={block.md} />
          </blockquote>
          {(block.author || block.role) && (
            <figcaption className="air-quote__by">
              {block.author && <span className="air-quote__author">{block.author}</span>}
              {block.role && <span className="air-quote__role">{block.role}</span>}
            </figcaption>
          )}
        </figure>
      );

    case 'divider':
      return block.label ? (
        <div className="air-divider air-divider--label" role="separator">
          <span>{block.label}</span>
        </div>
      ) : (
        <hr className="air-divider" />
      );

    case 'checklist':
      return <ChecklistBlock block={block} resourceKey={resourceKey} />;

    case 'sourceNote':
      return (
        <aside className="air-source">
          <p className="air-kicker">{copy.sourceLabel}</p>
          <Markdown md={block.md} />
        </aside>
      );

    case 'keyTakeaway':
      return (
        <aside className="air-takeaway">
          <p className="air-kicker">{block.label || copy.takeawayLabel}</p>
          <Markdown md={block.md} />
        </aside>
      );

    case 'gallery': {
      const items = list(block.items).filter((it) => isHttpUrl(it?.url));
      if (!items.length) return null;
      return (
        <figure className="air-gallery">
          <div className="air-gallery__grid">
            {items.map((it, i) => (
              <figure key={i} className="air-gallery__item">
                <img src={it.url.trim()} alt={it.alt ?? ''} loading="lazy" decoding="async" />
                <Caption text={it.caption} />
              </figure>
            ))}
          </div>
          <Caption text={block.caption} />
        </figure>
      );
    }

    case 'logos': {
      const items = list(block.items).filter((it) => isHttpUrl(it?.url));
      if (!items.length) return null;
      return (
        <figure className="air-logos">
          <ul className="air-logos__row">
            {items.map((it, i) => (
              <li key={i} className="air-logos__item">
                <img src={it.url.trim()} alt={it.alt ?? ''} loading="lazy" decoding="async" />
              </li>
            ))}
          </ul>
          <Caption text={block.caption} />
        </figure>
      );
    }

    case 'video':
      return <VideoBlock block={block} />;

    case 'cta': {
      const href = ctaHref(block.url);
      return (
        <section className="air-cta">
          <h2 className="air-cta__title">{block.heading}</h2>
          {block.body && (
            <div className="air-cta__body">
              <Markdown md={block.body} />
            </div>
          )}
          {href && block.label && (
            <a className="air-cta__btn" href={href}>
              {block.label}
            </a>
          )}
        </section>
      );
    }

    default:
      return null;
  }
}

// One malformed block should cost that block, not the whole resource.
class BlockBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export function Blocks({
  blocks,
  resourceKey,
  copy,
  lang,
}: {
  blocks: Block[];
  resourceKey: string;
  copy: Copy;
  lang?: Lang;
}) {
  return (
    <div className="air-blocks">
      {list(blocks).map((block, i) =>
        block && typeof block === 'object' ? (
          <BlockBoundary key={`${block.id ?? ''}:${i}`}>
            <BlockView block={block} resourceKey={resourceKey} copy={copy} lang={lang} />
          </BlockBoundary>
        ) : null,
      )}
    </div>
  );
}
