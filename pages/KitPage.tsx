import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../lib/SeoHead';
import { SITE } from '../data/siteConfig';
import { localePath, useLang, useUi, type Lang } from '../lib/i18n';
import { attribution, pushEvent, readStore, writeStore } from '../lib/ai/context';
import { BOOKING_URL, sendLead } from '../lib/lead';
import { forgetReader, rememberReader, savedReader, type Reader } from '../lib/reader';
import { linkTrackUrl, startVisit } from '../lib/visitTrack';
import { evalExpr, sheetText } from '../lib/kitCalc';
import { kitEntry, kitPath, loadKit, parseKitRef } from '../data/kits';
import type { Kit, KitBlock, KitContent } from '../data/kits/types';
import { LeadFields, validateFields, type LeadField } from '../components/LeadFields';
import NotFoundPage from './NotFoundPage';

// A kit a faceless video promises (2026-11-27): /kit/<slug> in Spanish, /en/kit/<slug>
// in English. The person commented the word, got this link by DM with
// ?r=<ig|tk|yt>-fd-<video> (data/kits/index.ts parseKitRef), and lands here.
//
// The page shows the kit's name, its promise and its contents, then the same gate as
// the /d reports (email required, name optional, remembered 96 hours, lib/reader.ts),
// so a reader who unlocked one kit or report opens the next one directly. On unlock the
// reader goes to the CRM through lib/lead.ts (/api/contact, site danielforeroj) with
// the kit word, the network, the video and the language in the message header.
//
// The kit (data/kits/<slug>.ts) is its own chunk, loaded on this page only. Its blocks
// are tools: checklists keep their ticks in the browser, templates and sheets copy with
// one tap, calculators run on the page. Print gives a clean sheet to keep.
//
// Kit copy addresses the reader as usted (Daniel's rule for the faceless series), so
// this page keeps its own interface strings instead of lib/i18n.ts, where the site is tú.

const UI = {
  es: {
    kicker: 'danielforeroj / kit',
    byline: 'Un kit de Daniel Forero',
    minutes: (n: number) => `${n} minutos`,
    contents: 'Lo que trae',
    gateTitle: 'Escriba su email y se lo abro',
    gateBody: 'Un solo paso, y solo una vez en este navegador. Sin códigos de confirmación.',
    submit: 'Abrir el kit',
    loading: 'Cargando el kit.',
    loadError: 'El kit no cargó. Recargue la página para intentarlo de nuevo.',
    readingAs: 'Abierto como {email}.',
    change: 'Usar otro email',
    howTo: 'Cómo usarlo',
    copy: 'Copiar',
    copied: 'Copiado',
    copySheet: 'Copiar para Sheets o Excel',
    csv: 'Descargar CSV',
    sheetHint: 'Copie y pegue en la celda A1 de una hoja nueva: las fórmulas quedan funcionando.',
    print: 'Imprimir o guardar en PDF',
    pass: 'Resultado',
    done: (a: number, b: number) => `${a} de ${b}`,
    videoFrom: 'Viene del video',
    nextTitle: 'El paso siguiente',
    notFound: 'Este kit no está disponible',
  },
  en: {
    kicker: 'danielforeroj / kit',
    byline: 'A kit by Daniel Forero',
    minutes: (n: number) => `${n} minutes`,
    contents: "What's inside",
    gateTitle: 'Enter your email to open it',
    gateBody: 'One step, asked once on this browser. No code to confirm.',
    submit: 'Open the kit',
    loading: 'Loading the kit.',
    loadError: 'The kit did not load. Refresh the page to try again.',
    readingAs: 'Opened as {email}.',
    change: 'Use another email',
    howTo: 'How to use it',
    copy: 'Copy',
    copied: 'Copied',
    copySheet: 'Copy for Sheets or Excel',
    csv: 'Download CSV',
    sheetHint: 'Paste into cell A1 of a new sheet: the formulas keep working.',
    print: 'Print or save as PDF',
    pass: 'Result',
    done: (a: number, b: number) => `${a} of ${b}`,
    videoFrom: 'From the video',
    nextTitle: 'The next step',
    notFound: 'This kit is not available',
  },
};

type T = (typeof UI)['es'];

// ---------------------------------------------------------------------------
// Inline marks: **bold** and `code`, nothing else.
// ---------------------------------------------------------------------------

function Inline({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).filter(Boolean);
  return (
    <>
      {parts.map((s, i) =>
        s.startsWith('**') && s.endsWith('**') ? (
          <strong key={i}>{s.slice(2, -2)}</strong>
        ) : s.startsWith('`') && s.endsWith('`') ? (
          <code key={i}>{s.slice(1, -1)}</code>
        ) : (
          <React.Fragment key={i}>{s}</React.Fragment>
        ),
      )}
    </>
  );
}

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // In-app browsers without the clipboard API: a hidden textarea and execCommand.
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

type Ctx = { slug: string; lang: Lang; t: T };

const CopyButton: React.FC<{ text: string; label: string; t: T; onCopy: () => void; className?: string }> = ({
  text,
  label,
  t,
  onCopy,
  className,
}) => {
  const [done, setDone] = React.useState(false);
  return (
    <button
      type="button"
      className={className ?? 'aif-btn aif-btn--o kit-btn'}
      onClick={async () => {
        if (await copyText(text)) {
          setDone(true);
          onCopy();
          window.setTimeout(() => setDone(false), 1800);
        }
      }}
    >
      {done ? t.copied : label}
    </button>
  );
};

const Checklist: React.FC<{ block: Extract<KitBlock, { type: 'check' }>; ctx: Ctx }> = ({ block, ctx }) => {
  const key = `dfj_kit_${ctx.slug}_${ctx.lang}_${block.id}`;
  const [ticks, setTicks] = React.useState<boolean[]>(() => block.items.map(() => false));
  React.useEffect(() => {
    try {
      const saved = JSON.parse(readStore(key, 'local') ?? '[]') as boolean[];
      if (Array.isArray(saved)) setTicks(block.items.map((_, i) => Boolean(saved[i])));
    } catch {
      /* fresh */
    }
  }, [key, block.items]);
  const toggle = (i: number) =>
    setTicks((prev) => {
      const next = prev.map((v, j) => (j === i ? !v : v));
      writeStore(key, JSON.stringify(next), 'local');
      return next;
    });
  const count = ticks.filter(Boolean).length;
  return (
    <div className="kit-card">
      <div className="kit-card__head">
        {block.title ? <p className="kit-card__title">{block.title}</p> : <span />}
        <p className="aif-meta">{ctx.t.done(count, block.items.length)}</p>
      </div>
      <ul className="kit-check">
        {block.items.map((it, i) => (
          <li key={i}>
            <label>
              <input type="checkbox" checked={ticks[i]} onChange={() => toggle(i)} />
              <span>
                <Inline text={it} />
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

const Calc: React.FC<{ block: Extract<KitBlock, { type: 'calc' }>; ctx: Ctx }> = ({ block, ctx }) => {
  const [vals, setVals] = React.useState<Record<string, string>>(() =>
    Object.fromEntries(block.inputs.map((i) => [i.id, String(i.value)])),
  );
  const nums = Object.fromEntries(Object.entries(vals).map(([k, v]) => [k, Number(v.replace(',', '.'))]));
  const nf = new Intl.NumberFormat(ctx.lang === 'es' ? 'es-CO' : 'en-US', { maximumFractionDigits: 1 });
  const money = new Intl.NumberFormat(ctx.lang === 'es' ? 'es-CO' : 'en-US', { maximumFractionDigits: 0 });
  const fmt = (v: number, f: string) => {
    if (!Number.isFinite(v)) return '…';
    if (f === 'money') return money.format(v);
    if (f === 'percent') return `${nf.format(v * 100)} %`;
    if (f === 'hours') return `${nf.format(v)} h`;
    return nf.format(v);
  };
  const verdict = block.verdict ? evalExpr(block.verdict.expr, nums) : NaN;
  return (
    <div className="kit-card kit-calc">
      <p className="kit-card__title">{block.title}</p>
      <div className="kit-calc__inputs">
        {block.inputs.map((i) => (
          <label key={i.id} className="kit-calc__field">
            <span>
              {i.label}
              {i.unit ? <span className="aif-meta"> ({i.unit})</span> : null}
            </span>
            <input
              type="text"
              inputMode="decimal"
              value={vals[i.id]}
              onChange={(e) => setVals((s) => ({ ...s, [i.id]: e.target.value }))}
            />
            {i.hint ? <span className="aif-meta">{i.hint}</span> : null}
          </label>
        ))}
      </div>
      <dl className="kit-calc__out">
        {block.outputs.map((o) => (
          <div key={o.label}>
            <dt>{o.label}</dt>
            <dd>{fmt(evalExpr(o.expr, nums), o.format)}</dd>
          </div>
        ))}
      </dl>
      {block.verdict && Number.isFinite(verdict) ? (
        <p className={verdict > 0 ? 'kit-verdict kit-verdict--pass' : 'kit-verdict kit-verdict--fail'} role="status">
          <span className="aif-meta">{ctx.t.pass}</span> {verdict > 0 ? block.verdict.pass : block.verdict.fail}
        </p>
      ) : null}
    </div>
  );
};

const Block: React.FC<{ block: KitBlock; ctx: Ctx; onUse: (what: 'copy' | 'download', id: string) => void }> = ({
  block,
  ctx,
  onUse,
}) => {
  const { t } = ctx;
  switch (block.type) {
    case 'p':
      return (
        <p className="aif-body kit-p">
          <Inline text={block.text} />
        </p>
      );
    case 'rule':
      return (
        <p className="kit-rule">
          <Inline text={block.text} />
        </p>
      );
    case 'steps':
      return (
        <ol className="kit-steps">
          {block.items.map((s, i) => (
            <li key={i}>
              <p className="kit-steps__title">
                <Inline text={s.title} />
              </p>
              {s.body ? (
                <p className="kit-steps__body">
                  <Inline text={s.body} />
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      );
    case 'check':
      return <Checklist block={block} ctx={ctx} />;
    case 'template':
      return (
        <div className="kit-card">
          <div className="kit-card__head">
            <p className="kit-card__title">{block.title}</p>
            <CopyButton text={block.body} label={t.copy} t={t} onCopy={() => onUse('copy', block.title)} />
          </div>
          <pre className="kit-pre">{block.body}</pre>
          {block.note ? (
            <p className="aif-meta kit-note">
              <Inline text={block.note} />
            </p>
          ) : null}
        </div>
      );
    case 'sheet':
      return (
        <div className="kit-card">
          <div className="kit-card__head">
            <p className="kit-card__title">{block.title}</p>
          </div>
          <div className="kit-table-wrap">
            <table className="kit-table">
              <thead>
                <tr>
                  <th aria-hidden="true" />
                  {block.columns.map((c, i) => (
                    <th key={i} scope="col">
                      <span className="kit-col">{String.fromCharCode(65 + i)}</span>
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((r, i) => (
                  <tr key={i}>
                    <th scope="row" className="kit-rownum">
                      {i + 2}
                    </th>
                    {block.columns.map((_, j) => (
                      <td key={j} className={(r[j] ?? '').startsWith('=') ? 'kit-formula' : undefined}>
                        {r[j] ?? ''}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="kit-actions">
            <CopyButton
              text={sheetText(block.columns, block.rows, '\t')}
              label={t.copySheet}
              t={t}
              onCopy={() => onUse('copy', block.id)}
              className="aif-btn kit-btn"
            />
            <button
              type="button"
              className="aif-btn aif-btn--o kit-btn"
              onClick={() => {
                const blob = new Blob(['﻿' + sheetText(block.columns, block.rows, ',')], { type: 'text/csv;charset=utf-8' });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `${ctx.slug}-${block.id}.csv`;
                document.body.appendChild(a);
                a.click();
                a.remove();
                window.setTimeout(() => URL.revokeObjectURL(a.href), 2000);
                onUse('download', block.id);
              }}
            >
              {t.csv}
            </button>
          </div>
          <p className="aif-meta kit-note">{block.note ? <Inline text={block.note} /> : t.sheetHint}</p>
        </div>
      );
    case 'calc':
      return <Calc block={block} ctx={ctx} />;
    case 'compare':
      return (
        <div className="kit-compare">
          <div className="kit-compare__col kit-compare__col--bad">
            <p className="kit-card__title">{block.bad.title}</p>
            <ul>
              {block.bad.items.map((x, i) => (
                <li key={i}>
                  <Inline text={x} />
                </li>
              ))}
            </ul>
          </div>
          <div className="kit-compare__col kit-compare__col--good">
            <p className="kit-card__title">{block.good.title}</p>
            <ul>
              {block.good.items.map((x, i) => (
                <li key={i}>
                  <Inline text={x} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    default:
      return null;
  }
};

function nextHref(page: KitContent['next']['page'], lang: Lang): { href: string; external: boolean } {
  switch (page) {
    case 'book':
      return { href: BOOKING_URL, external: true };
    case 'work':
      return { href: localePath('/work-w-me', lang), external: false };
    case 'ai':
      return { href: localePath('/ai', lang), external: false };
    case 'geo':
      return { href: localePath('/geo', lang), external: false };
    default:
      return { href: localePath('/crecer', lang), external: false };
  }
}

/** The lines under the lead header: which kit, from which network and video. */
function kitLeadLines(
  entry: { word: string; title: Partial<Record<Lang, string>> },
  parsed: ReturnType<typeof parseKitRef>,
  r: Reader,
): string[] {
  return [
    `Abrió el kit ${entry.word}: ${entry.title.es ?? entry.title.en}`,
    `kit: ${entry.word}`,
    `red: ${parsed?.net ?? '(sin red)'}`,
    `video: ${parsed?.video ?? '(por el hilo del comentario en la app)'}`,
    `nombre: ${r.name || '(no lo dio)'}`,
  ];
}

// ---------------------------------------------------------------------------

const KitPage: React.FC = () => {
  const { slug } = useParams();
  const lang = useLang();
  const l = useUi().lead;
  const t = UI[lang];
  const entry = kitEntry(slug, lang);

  const [reader, setReader] = React.useState<Reader | null | 'unknown'>('unknown');
  const [kit, setKit] = React.useState<Kit | null>(null);
  const [loadFailed, setLoadFailed] = React.useState(false);
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({});
  const [hp, setHp] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const bodyRef = React.useRef<HTMLDivElement>(null);

  const ref = React.useMemo(() => {
    if (typeof window === 'undefined') return { src: '', parsed: null as ReturnType<typeof parseKitRef> };
    const src = attribution().src;
    return { src, parsed: parseKitRef(src) };
  }, []);

  React.useEffect(() => {
    setReader(savedReader());
  }, []);

  // The kit chunk loads right away, so the contents show above the gate.
  React.useEffect(() => {
    if (!entry) return;
    let alive = true;
    setKit(null);
    setLoadFailed(false);
    const p = loadKit(entry.slug);
    if (!p) {
      setLoadFailed(true);
      return;
    }
    p.then((k) => alive && setKit(k)).catch(() => alive && setLoadFailed(true));
    pushEvent({ event: 'kit_view', kit: entry.word, lang, r: ref.src });
    return () => {
      alive = false;
    };
  }, [entry, lang, ref.src]);

  const email = reader && reader !== 'unknown' ? reader.email : '';

  // A visit on the app's document link, when the kit has one (data/kits/index.ts trackSlug).
  React.useEffect(() => {
    if (!entry?.trackSlug || !email || !kit) return;
    const attr = attribution();
    const v = startVisit({
      url: linkTrackUrl(entry.trackSlug),
      email,
      mode: 'stack',
      pagesTotal: 1,
      src: attr.src,
      referrer: attr.referrer,
      scrollTarget: () => bodyRef.current,
    });
    const onScroll = () => v.measureScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      v.stop();
    };
  }, [entry, email, kit]);

  // A reader the browser already knew (from another kit or a report) is let in without
  // the form, and recorded once per kit on this browser, so the CRM still learns which
  // kit and which video they came for.
  React.useEffect(() => {
    if (!entry || !email || !reader || reader === 'unknown') return;
    const seenKey = `dfj_kit_lead_${entry.slug}_${lang}`;
    if (readStore(seenKey, 'local')) return;
    writeStore(seenKey, new Date().toISOString(), 'local');
    if (values.email) return; // just submitted through the form, already recorded
    void sendLead({
      page: 'kit',
      path: kitPath(entry.slug, lang),
      lang,
      name: reader.name || reader.email.split('@')[0],
      email: reader.email,
      lines: [...kitLeadLines(entry, ref.parsed, reader), 'entró sin formulario: el navegador ya lo conocía'],
      hp: '',
      notify: 'none',
    });
    pushEvent({ event: 'kit_unlock', kit: entry.word, lang, r: ref.src });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  if (!entry) return <NotFoundPage />;

  const content = kit?.content[lang];
  const title = entry.title[lang] as string;
  const path = kitPath(entry.slug, lang);
  const ctx: Ctx = { slug: entry.slug, lang, t };
  const video = ref.parsed?.video ? kit?.videos.find((v) => v.id === ref.parsed!.video) : undefined;

  const fields: LeadField[] = [
    { key: 'email', label: l.email, type: 'email', required: true, autoComplete: 'email' },
    { key: 'name', label: l.name, autoComplete: 'name' },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateFields(fields, values, l);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`kit-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (hp) return;
    const next: Reader = { email: (values.email ?? '').trim(), name: (values.name ?? '').trim() };
    setBusy(true);
    await sendLead({
      page: 'kit',
      path,
      lang,
      name: next.name || next.email.split('@')[0],
      email: next.email,
      lines: kitLeadLines(entry, ref.parsed, next),
      hp,
      notify: 'none',
    });
    // In whatever the endpoint answered: the kit is the promise of the video.
    rememberReader(next);
    pushEvent({ event: 'kit_unlock', kit: entry.word, lang, r: ref.src });
    setBusy(false);
    setReader(next);
  };

  const onUse = (what: 'copy' | 'download', id: string) =>
    pushEvent({ event: what === 'copy' ? 'kit_copy' : 'kit_download', kit: entry.word, lang, block: id });

  const open = reader && reader !== 'unknown';
  const next = content ? nextHref(content.next.page, lang) : null;

  return (
    <section className={open ? 'aif kit kit--open' : 'aif kit'}>
      <Seo title={`${title} | ${SITE.name}`} description={entry.line[lang] ?? title} path={path} noIndex />
      <div className="aif-panel kit-head">
        <p className="aif-kicker">
          {t.kicker} / {entry.word}
        </p>
        <h1 className="aif-title">{title}</h1>
        <p className="aif-body kit-promise">{content?.promise ?? entry.line[lang]}</p>
        <p className="aif-meta">
          {t.byline}
          {content ? `. ${t.minutes(content.minutes)}` : ''}
        </p>
        {video ? (
          <p className="aif-meta kit-from">
            {t.videoFrom}: <Inline text={video.promise} />
          </p>
        ) : null}

        {content ? (
          <nav className="kit-toc" aria-label={t.contents}>
            <p className="aif-kicker">{t.contents}</p>
            <ol>
              {content.sections.map((s) => (
                <li key={s.id}>
                  {open ? <a href={`#${s.id}`}>{s.title}</a> : <span>{s.title}</span>}
                  <span className="kit-toc__intro">{s.intro}</span>
                </li>
              ))}
            </ol>
          </nav>
        ) : loadFailed ? (
          <p className="aif-meta rpt-status" role="status">
            {t.loadError}
          </p>
        ) : null}

        {reader === null ? (
          <form noValidate onSubmit={submit} className="aif-step kit-gate">
            <hr className="aif-sep" />
            <h2 className="aif-title aif-title--body">{t.gateTitle}</h2>
            <p className="aif-meta">{t.gateBody}</p>
            <LeadFields
              idPrefix="kit"
              fields={fields}
              values={values}
              errors={errors}
              optionalLabel={l.optional}
              onChange={(k, v) => {
                setValues((s) => ({ ...s, [k]: v }));
                if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
              }}
              hp={hp}
              onHp={setHp}
            />
            <div className="aif-actions">
              <button type="submit" className="aif-btn" disabled={busy}>
                {t.submit}
              </button>
            </div>
          </form>
        ) : null}

        {open ? (
          <p className="aif-meta rpt-who kit-who">
            {t.readingAs.replace('{email}', reader.email)}{' '}
            <button
              type="button"
              className="aif-link"
              onClick={() => {
                forgetReader();
                setReader(null);
              }}
            >
              {t.change}
            </button>
            <button type="button" className="aif-link" onClick={() => window.print()}>
              {t.print}
            </button>
          </p>
        ) : null}
      </div>

      {open && content ? (
        <div className="aif-panel kit-body" ref={bodyRef}>
          <div className="kit-howto">
            <p className="aif-kicker">{t.howTo}</p>
            <ul>
              {content.howTo.map((h, i) => (
                <li key={i}>
                  <Inline text={h} />
                </li>
              ))}
            </ul>
          </div>
          {content.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="kit-section">
              <p className="aif-kicker">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="kit-section__title">{s.title}</h2>
              <p className="aif-body kit-section__intro">
                <Inline text={s.intro} />
              </p>
              {s.blocks.map((b, j) => (
                <Block key={j} block={b} ctx={ctx} onUse={onUse} />
              ))}
            </section>
          ))}
          <div className="aif-offer kit-next">
            <p className="aif-kicker">{t.nextTitle}</p>
            <p className="aif-offer__body">
              <Inline text={content.next.text} />
            </p>
            {next?.external ? (
              <a className="aif-btn" href={next.href} target="_blank" rel="noopener">
                {content.next.cta}
              </a>
            ) : next ? (
              <Link className="aif-btn" to={next.href}>
                {content.next.cta}
              </Link>
            ) : null}
          </div>
        </div>
      ) : open && !loadFailed ? (
        <p className="aif-meta rpt-status" role="status">
          {t.loading}
        </p>
      ) : null}
    </section>
  );
};

export default KitPage;
