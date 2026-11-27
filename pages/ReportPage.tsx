import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Seo from '../lib/SeoHead';
import { SITE } from '../data/siteConfig';
import { localePath, useLang, useUi } from '../lib/i18n';
import { attribution } from '../lib/ai/context';
import { forgetReader, rememberReader, savedReader, type Reader } from '../lib/reader';
import { sendLead } from '../lib/lead';
import { loadReportHtml, reportBySlug, roomItem, roomItems, type Report, type RoomItem } from '../data/reports';
import { linkTrackUrl, roomDocTrackUrl, startVisit, type Visit } from '../lib/visitTrack';
import { LeadFields, validateFields, type LeadField } from '../components/LeadFields';
import DeckView from '../components/report/DeckView';
import VideoView from '../components/report/VideoView';
import NotFoundPage from './NotFoundPage';

// A gated report: /d/<slug> (English interface) and /es/d/<slug> (Spanish
// interface). 2026-11-14. The reports and their files are listed in
// data/reports.ts; publishing a new version is replacing content/d/<slug>.html.
//
// Gate. Name optional, email required, no code. The reader is recorded through
// lib/lead.ts like every other form on the site (unboundoperators.app
// /api/contact, site danielforeroj, header "[danielforeroj.com/d/<slug>] report
// gate"), with notify none (2026-11-20): the gate pings no one, because the app's
// tracker tells Daniel, by DM only, when someone opens the page. The browser
// remembers the reader for 96 hours (dfj_reader in localStorage and a cookie, see
// READER_TTL_MS), so a returning reader, on this report or another one, is not
// asked again in that time.
//
// The report file is not in the prerendered HTML: it is a separate chunk loaded
// only after the gate (data/reports.ts). It is drawn in a sandboxed iframe
// (srcdoc, no scripts allowed) so its CSS and the site's never touch, at the
// height of its content, so the page scrolls as one page and the report's own
// wide tables keep scrolling inside their own containers. The frame carries
// color-scheme: dark (ai.css .rpt-frame), so the report's own prefers-color-scheme
// resolves to dark like the rest of the site, whatever the reader's OS says.
//
// A report room (2026-11-20, data/reports.ts `room`): after the same gate, /d/<slug>
// is a hub with a button per piece (the report, a deck, a video) and each piece has
// its own page at /d/<slug>/<key>. Every page is its own visit in the app's data
// room: the hub on the room's link, each piece on its document in the room, so the
// app shows who opened what, in what order, for how long, slide by slide for the
// deck and segment by segment for the video (lib/visitTrack.ts).
//
// noindex here and X-Robots-Tag in vercel.json.

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

/** Where a page's visit is reported, and as what. */
function visitTarget(
  report: Report,
  item: RoomItem | undefined,
): { url: string; mode: 'stack' | 'slide'; pagesTotal?: number; startActive?: boolean } | null {
  if (report.room) {
    // The hub: the room's own link, its time is the time on the hub.
    if (!item) return { url: linkTrackUrl(report.room.slug), mode: 'stack', pagesTotal: 1 };
    const url = roomDocTrackUrl(report.room.slug, item.documentId);
    if (item.kind === 'deck') return { url, mode: 'slide', pagesTotal: item.slides };
    // A video counts only while it plays, one page per 30 second segment.
    if (item.kind === 'video') return { url, mode: 'slide', startActive: false };
    return { url, mode: 'stack', pagesTotal: 1 };
  }
  return report.trackSlug ? { url: linkTrackUrl(report.trackSlug), mode: 'stack', pagesTotal: 1 } : null;
}

const ReportPage: React.FC = () => {
  const { slug, item: itemKey } = useParams();
  const report = reportBySlug(slug);
  const item = itemKey ? roomItem(report, itemKey) : undefined;
  const isHub = Boolean(report?.room) && !item;
  // The file this page draws: a deck, or the report itself (a report with no room, or the
  // room's report piece). The hub and the video draw none.
  const file =
    item?.kind === 'deck' ? item.file : item?.kind === 'report' ? (item.file ?? report?.slug ?? null) : report && !report.room ? report.slug : null;
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
  const visit = React.useRef<Visit | null>(null);

  React.useEffect(() => {
    attribution();
    setReader(savedReader());
  }, []);

  const email = reader && reader !== 'unknown' ? reader.email : '';

  // Load the file only once there is a reader.
  React.useEffect(() => {
    setHtml(null);
    setLoadFailed(false);
    if (!email || !file) return;
    let alive = true;
    const p = loadReportHtml(file);
    if (!p) {
      setLoadFailed(true);
      return;
    }
    p.then((h) => alive && setHtml(h)).catch(() => alive && setLoadFailed(true));
    return () => {
      alive = false;
    };
  }, [email, file]);

  // Track the visit once the page is on screen: the hub and the video right away, a file
  // once it has loaded.
  const ready = Boolean(email) && (file ? Boolean(html) : true);
  React.useEffect(() => {
    if (!report || !email || !ready) return;
    const target = visitTarget(report, item);
    if (!target) return;
    const attr = attribution();
    const v = startVisit({
      ...target,
      email,
      src: attr.src,
      referrer: attr.referrer,
      scrollTarget: target.mode === 'stack' ? () => frameWrap.current : undefined,
    });
    visit.current = v;
    remeasure.current = () => v.measureScroll();
    return () => {
      remeasure.current = () => {};
      visit.current = null;
      v.stop();
    };
  }, [report, item, email, ready]);

  const onHeight = React.useCallback(() => remeasure.current(), []);

  if (!report || (itemKey && !item)) return <NotFoundPage />;

  const title = report.title[lang];
  const pageTitle = item ? `${item.title[lang]}: ${title}` : title;
  const hubPath = localePath(`/d/${report.slug}`, lang);
  const path = item ? localePath(`/d/${report.slug}/${item.key}`, lang) : hubPath;

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
      notify: 'none',
    });
    // The reader gets in whatever the endpoint answered: the visit itself carries the
    // email to the app, so a failed capture is still recorded there.
    rememberReader(next);
    setBusy(false);
    setReader(next);
  };

  const showReport = reader && reader !== 'unknown';

  return (
    <section className={showReport ? 'aif rpt rpt--open' : 'aif rpt'}>
      <Seo title={`${pageTitle} | ${SITE.name}`} description={report.description[lang]} path={path} noIndex />
      <div className="aif-panel rpt-head">
        {item && showReport ? (
          <Link className="aif-link rpt-back" to={hubPath}>
            ← {t.back}
          </Link>
        ) : null}
        <p className="aif-kicker">{t.kicker}</p>
        <h1 className="aif-title">{item ? item.title[lang] : title}</h1>
        <p className="aif-meta">
          {item ? title : t.byline}
          {(!item || item.kind === 'report') && report.lang !== lang && t.inLanguage ? `. ${t.inLanguage}` : ''}
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
                {report.room ? t.submitRoom : t.submit}
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

        {showReport && isHub && report.room ? (
          <div className="aif-step rpt-hub" ref={frameWrap}>
            <p className="aif-body">{report.room.intro[lang]}</p>
            <div className="aif-offers">
              {roomItems(report).map((it, i) => (
                <div key={it.key} className={i === 0 ? 'aif-offer' : 'aif-offer aif-offer--secondary'} data-piece={it.key}>
                  <p className="aif-kicker">{String(i + 1).padStart(2, '0')}</p>
                  <p className="aif-offer__title">{it.title[lang]}</p>
                  <p className="aif-offer__body">{it.body[lang]}</p>
                  <Link className={i === 0 ? 'aif-btn' : 'aif-btn aif-btn--o'} to={localePath(`/d/${report.slug}/${it.key}`, lang)}>
                    {it.cta[lang]}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {showReport && item?.kind === 'video' ? (
        <div className="rpt-body">
          {item.youtubeId ? (
            <VideoView youtubeId={item.youtubeId} title={item.title[lang]} visit={visit} t={t.video} />
          ) : (
            <p className="aif-meta rpt-status" role="status">
              {t.video.soon}
            </p>
          )}
        </div>
      ) : null}

      {showReport && file ? (
        <div ref={item?.kind === 'deck' ? undefined : frameWrap} className="rpt-body">
          {html && item?.kind === 'deck' ? (
            <DeckView html={html} slides={item.slides} visit={visit} t={t.deck} />
          ) : html ? (
            <ReportFrame html={html} title={`${t.frameTitle}: ${title}`} onHeight={onHeight} />
          ) : (
            <p className="aif-meta rpt-status" role="status">
              {loadFailed ? (item ? t.loadErrorPiece : t.loadError) : item ? t.loadingPiece : t.loading}
            </p>
          )}
        </div>
      ) : null}
    </section>
  );
};

export default ReportPage;
