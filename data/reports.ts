// Gated reports, read at /d/<slug> (English) and /es/d/<slug> (Spanish interface,
// the report itself stays in the language it was written in). 2026-11-14.
//
// A report is one self-contained HTML file in content/d/<slug>.html (inline CSS
// and SVG, no scripts). Publishing a new version of a report is a file drop:
// replace content/d/<slug>.html and deploy. A new report is that file plus one
// entry below.
//
// The page asks for an email before it loads the file (pages/ReportPage.tsx),
// records the reader through lib/lead.ts (unboundoperators.app/api/contact,
// site danielforeroj) and reports the visit (visible time, scroll depth,
// referrer, ?r=) to the sales document named by `trackSlug` in the Unbound app
// (lib/reportTrack.ts). That document is only the place the visits are stored;
// it must be an HTML document whose share link is in email mode, created once
// per report with the app's create_html_document and create_document_link.
// Without trackSlug the report is still gated and recorded, but its visits are
// not tracked.

export type Report = {
  slug: string;
  /** The language the report file is written in. */
  lang: 'en' | 'es';
  title: { en: string; es: string };
  /** Shown in link previews when the URL is shared. */
  description: { en: string; es: string };
  /** The slug of the Unbound app document link (unboundoperators.app/d/<trackSlug>) that stores the visits. */
  trackSlug?: string;
};

export const REPORTS: Report[] = [
  {
    slug: 'viva',
    lang: 'en',
    title: {
      en: 'Viva: AI and search visibility',
      es: 'Viva: visibilidad en IA y en búsqueda',
    },
    description: {
      en: 'How ChatGPT, Gemini and Google present Viva (execviva.com) to US buyers of executive assistant services, and what to do first.',
      es: 'Cómo ChatGPT, Gemini y Google presentan a Viva (execviva.com) ante compradores de servicios de asistentes ejecutivos en EE. UU., y qué hacer primero.',
    },
    trackSlug: 'bB09bBKi1NfG',
  },
];

export const reportBySlug = (slug: string | undefined): Report | undefined => REPORTS.find((r) => r.slug === slug);

// Each report file becomes its own lazily loaded chunk: it is not in the
// prerendered HTML and not in the page's main bundle, and it is fetched only
// after the gate. There is no link to it anywhere.
const FILES = import.meta.glob('../content/d/*.html', { query: '?raw', import: 'default' }) as Record<
  string,
  () => Promise<string>
>;

export function loadReportHtml(slug: string): Promise<string> | null {
  const load = FILES[`../content/d/${slug}.html`];
  return load ? load() : null;
}
