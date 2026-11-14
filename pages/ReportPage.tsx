import React from 'react';
import { useParams } from 'react-router-dom';
import Seo from '../lib/SeoHead';
import { SITE } from '../data/siteConfig';
import { localePath, useLang, useUi } from '../lib/i18n';
import { attribution, readStore, writeStore } from '../lib/ai/context';
import { sendLead } from '../lib/lead';
import { loadReportHtml, reportBySlug } from '../data/reports';
import { startReportTracking } from '../lib/reportTrack';
import { LeadFields, validateFields, type LeadField } from '../components/LeadFields';
import NotFoundPage from './NotFoundPage';

// A gated report: /d/<slug> (English interface) and /es/d/<slug> (Spanish
// interface). 2026-11-14. The reports and their files are listed in
// data/reports.ts; publishing a new version is replacing content/d/<slug>.html.
//
// Gate. Name optional, email required, no code. The reader is recorded through
// lib/lead.ts like every other form on the site (unboundoperators.app
// /api/contact, site danielforeroj, header "[danielforeroj.com/d/<slug>] report
// gate"). The browser remembers the reader in localStorage (dfj_reader), so a
// returning reader, on this report or another one, is not asked again.
//
// The report file is not in the prerendered HTML: it is a separate chunk loaded
// only after the gate (data/reports.ts). It is drawn in a sandboxed iframe
// (srcdoc, no scripts allowed) so its CSS and the site's never touch, at the
// height of its content, so the page scrolls as one page and the report's own
// wide tables keep scrolling inside their own containers. The report follows the
// reader's light or dark preference through its own prefers-color-scheme.
//
// Visits (visible time, scroll depth, referrer, ?r=) go to the Unbound app
// (lib/reportTrack.ts). noindex here and X-Robots-Tag in vercel.json.

const READER_KEY = 'dfj_reader';

type Reader = { email: string; name: string };

function savedReader(): Reader | null {
  const raw = readStore(READER_KEY, 'local');
  if (!raw) return null;
  try {
    const r = JSON.parse(raw) as Partial<Reader>;
    return typeof r.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email) ? { email: r.email, name: typeof r.name === 'string' ? r.name : '' } : null;
  } catch {
    return null;
  }
}

function forgetReader() {
  try {
    window.localStorage.removeItem(READER_KEY);
  } catch {
    /* storage unavailable */
  }
}

// The site's own fonts (the same Google Fonts link as index.html), made available
// to the report at render time: a report file is written with the site's tokens
// and font family names (IBM Plex Sans, Plex Sans Condensed, Plex Mono) and makes
// no external request itself, so it stays a drop-in file.
const FONTS =
  '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>' +
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Sans+Condensed:wght@600;700&display=swap">';

/** The report HTML with the site's fonts and with links opening outside the frame. */
function prepare(html: string): string {
  const extra = `<base target="_blank">${FONTS}<style>html{overflow-y:hidden}</style>`;
  return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => m + extra) : extra + html;
}

const ReportFrame: React.FC<{ html: string; title: string; onHeight: () => void }> = ({ html, title, onHeight }) => {
  const ref = React.useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = React.useState(800);

  React.useEffect(() => {
    const frame = ref.current;
    if (!frame) return;
    let ro: ResizeObserver | null = null;
    let timer = 0;
    const fit = () => {
      const doc = frame.contentDocument;
      if (!doc?.documentElement) return;
      const h = Math.ceil(Math.max(doc.documentElement.offsetHeight, doc.body?.offsetHeight ?? 0));
      if (h > 0) {
        setHeight((prev) => (Math.abs(prev - h) > 1 ? h : prev));
        onHeight();
      }
    };
    const onLoad = () => {
      fit();
      const doc = frame.contentDocument;
      if (doc?.body && typeof ResizeObserver === 'function') {
        ro = new ResizeObserver(fit);
        ro.observe(doc.body);
      }
      // Fonts and late layout: a few re-measures, then the observer carries it.
      let n = 0;
      timer = window.setInterval(() => {
        fit();
        if (++n >= 6) window.clearInterval(timer);
      }, 500);
    };
    frame.addEventListener('load', onLoad);
    window.addEventListener('resize', fit);
    return () => {
      frame.removeEventListener('load', onLoad);
      window.removeEventListener('resize', fit);
      ro?.disconnect();
      window.clearInterval(timer);
    };
  }, [html, onHeight]);

  return (
    <iframe
      ref={ref}
      className="rpt-frame"
      title={title}
      srcDoc={prepare(html)}
      // No allow-scripts: nothing in the report can run. allow-same-origin only
      // lets this page read the report's height; links open in a new tab.
      sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
      referrerPolicy="no-referrer"
      scrolling="no"
      style={{ height }}
    />
  );
};

const ReportPage: React.FC = () => {
  const { slug } = useParams();
  const report = reportBySlug(slug);
  const lang = useLang();
  const ui = useUi();
  const t = ui.report;
  const l = ui.lead;

  // 'unknown' in the prerender and until the browser storage has been read, so a
  // returning reader never sees the form flash.
  const [reader, setReader] = React.useState<Reader | null | 'unknown'>('unknown');
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({});
  const [hp, setHp] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [html, setHtml] = React.useState<string | null>(null);
  const [loadFailed, setLoadFailed] = React.useState(false);
  const frameWrap = React.useRef<HTMLDivElement>(null);
  const remeasure = React.useRef<() => void>(() => {});

  React.useEffect(() => {
    attribution();
    setReader(savedReader());
  }, []);

  const email = reader && reader !== 'unknown' ? reader.email : '';

  // Load the report only once there is a reader.
  React.useEffect(() => {
    if (!report || !email) return;
    let alive = true;
    const p = loadReportHtml(report.slug);
    if (!p) {
      setLoadFailed(true);
      return;
    }
    p.then((h) => alive && setHtml(h)).catch(() => alive && setLoadFailed(true));
    return () => {
      alive = false;
    };
  }, [report, email]);

  // Track the visit once the report is on screen.
  React.useEffect(() => {
    if (!report?.trackSlug || !email || !html) return;
    const attr = attribution();
    const tracking = startReportTracking({
      trackSlug: report.trackSlug,
      email,
      src: attr.src,
      referrer: attr.referrer,
      target: () => frameWrap.current,
    });
    remeasure.current = () => window.dispatchEvent(new Event('scroll'));
    return () => {
      remeasure.current = () => {};
      tracking.stop();
    };
  }, [report, email, html]);

  const onHeight = React.useCallback(() => remeasure.current(), []);

  if (!report) return <NotFoundPage />;

  const title = report.title[lang];
  const path = localePath(`/d/${report.slug}`, lang);

  const fields: LeadField[] = [
    { key: 'email', label: l.email, type: 'email', required: true, autoComplete: 'email' },
    { key: 'name', label: l.name, autoComplete: 'name' },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateFields(fields, values, l);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`rpt-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (hp) return;
    const next: Reader = { email: (values.email ?? '').trim(), name: (values.name ?? '').trim() };
    setBusy(true);
    // The contact endpoint requires a name; without one, the email's local part stands in
    // and the message says so.
    await sendLead({
      page: 'report',
      path,
      lang,
      name: next.name || next.email.split('@')[0],
      email: next.email,
      lines: [`Abrió el informe: ${report.title.es}`, `nombre: ${next.name || '(no lo dio)'}`],
      hp,
    });
    // The reader gets in whatever the endpoint answered: the visit itself carries the
    // email to the app, so a failed capture is still recorded there.
    writeStore(READER_KEY, JSON.stringify({ ...next, at: new Date().toISOString() }), 'local');
    setBusy(false);
    setReader(next);
  };

  const showReport = reader && reader !== 'unknown';

  return (
    <section className={showReport ? 'aif rpt rpt--open' : 'aif rpt'}>
      <Seo title={`${title} | ${SITE.name}`} description={report.description[lang]} path={path} noIndex />
      <div className="aif-panel rpt-head">
        <p className="aif-kicker">{t.kicker}</p>
        <h1 className="aif-title">{title}</h1>
        <p className="aif-meta">
          {t.byline}
          {report.lang !== lang && t.inLanguage ? `. ${t.inLanguage}` : ''}
        </p>

        {reader === null ? (
          <form noValidate onSubmit={submit} className="aif-step">
            <hr className="aif-sep" />
            <h2 className="aif-title aif-title--body">{t.gateTitle}</h2>
            <p className="aif-meta">{t.gateBody}</p>
            <LeadFields
              idPrefix="rpt"
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

        {showReport ? (
          <p className="aif-meta rpt-who">
            {t.readingAs.replace('{email}', reader.email)}{' '}
            <button
              type="button"
              className="aif-link"
              onClick={() => {
                forgetReader();
                setHtml(null);
                setLoadFailed(false);
                setReader(null);
              }}
            >
              {t.change}
            </button>
          </p>
        ) : null}
      </div>

      {showReport ? (
        <div ref={frameWrap} className="rpt-body">
          {html ? (
            <ReportFrame html={html} title={`${t.frameTitle}: ${title}`} onHeight={onHeight} />
          ) : (
            <p className="aif-meta rpt-status" role="status">
              {loadFailed ? t.loadError : t.loading}
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default ReportPage;
