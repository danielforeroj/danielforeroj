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

/**
 * One piece of a report room (2026-11-20). The hub at /d/<slug> shows a button per piece and
 * each piece has its own page at /d/<slug>/<key>. `documentId` is the document of the
 * Unbound app data room that stores the piece's visits.
 */
export type RoomItem = {
  key: string;
  title: { en: string; es: string };
  body: { en: string; es: string };
  /** The action on its button. */
  cta: { en: string; es: string };
  documentId: string;
} & (
  | { kind: 'report'; file?: string } // content/d/<file ?? slug>.html, a written report
  | { kind: 'deck'; file: string; slides: number } // content/d/<file>.html, slides in .slide sections
  | { kind: 'video'; youtubeId: string } // an unlisted YouTube video, embedded
);

export type Report = {
  slug: string;
  /** The language the report file is written in. */
  lang: 'en' | 'es';
  title: { en: string; es: string };
  /** Shown in link previews when the URL is shared. */
  description: { en: string; es: string };
  /** The slug of the Unbound app document link (unboundoperators.app/d/<trackSlug>) that stores the visits. */
  trackSlug?: string;
  /**
   * A room of pieces behind the one gate (2026-11-20). With it, /d/<slug> is a hub with a
   * button per piece, and the visits go to the Unbound app data room whose email-mode link
   * is `slug`: the hub to the room's own link, each piece to its document in the room.
   */
  room?: { slug: string; intro: { en: string; es: string }; items: RoomItem[] };
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
    // The room (2026-11-20): Viva at danielforeroj.com/d/viva, data room bad038cf in the app.
    // trackSlug stays for the visits recorded before it; the pages report to the room now.
    trackSlug: 'bB09bBKi1NfG',
    room: {
      slug: 'k4CKoUxYMNaf',
      intro: {
        en: 'Four pieces, in the order I would read them. Start wherever you like.',
        es: 'Cuatro piezas, en el orden en que yo las leería. Empieza por donde quieras.',
      },
      items: [
        {
          key: 'report',
          kind: 'report',
          documentId: '124ec525-d88f-458a-be33-223b7b104168',
          title: { en: 'The initial report', es: 'El informe inicial' },
          body: {
            en: 'How ChatGPT, Gemini and Google present Viva to US buyers, and what to do first.',
            es: 'Cómo ChatGPT, Gemini y Google presentan a Viva ante compradores en EE. UU., y qué hacer primero.',
          },
          cta: { en: 'Read the report', es: 'Leer el informe' },
        },
        {
          // The full analysis the deck was built from (2026-11-20, written with viva-mktg).
          key: 'analysis',
          kind: 'report',
          file: 'viva-analysis',
          documentId: 'f98d2b35-abf9-4b8c-a982-beb0b976c563',
          title: { en: 'The full analysis', es: 'El análisis completo' },
          body: {
            en: 'The competitive analysis behind the presentation: the market, the competitors and the plan, in depth.',
            es: 'El análisis competitivo detrás de la presentación: el mercado, la competencia y el plan, a fondo.',
          },
          cta: { en: 'Read the analysis', es: 'Leer el análisis' },
        },
        {
          key: 'deck',
          kind: 'deck',
          file: 'viva-deck',
          slides: 30,
          documentId: 'e82e82eb-621c-4c71-8f09-b6529b22a399',
          title: { en: 'The presentation', es: 'La presentación' },
          body: {
            en: 'The deck you asked for, slide by slide.',
            es: 'La presentación que me pidieron, slide por slide.',
          },
          cta: { en: 'Open the presentation', es: 'Abrir la presentación' },
        },
        {
          key: 'video',
          kind: 'video',
          youtubeId: '',
          documentId: '2c20e238-1c74-4e62-81cc-9ea02af7e4fa',
          title: { en: 'The video', es: 'El video' },
          body: {
            en: 'Me walking through the presentation.',
            es: 'Yo presentando la presentación.',
          },
          cta: { en: 'Watch the video', es: 'Ver el video' },
        },
      ],
    },
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

/** The report file content/d/<file>.html (a report, or a deck of a room). */
export function loadReportHtml(file: string): Promise<string> | null {
  const load = FILES[`../content/d/${file}.html`];
  return load ? load() : null;
}

/** The pieces of a room. A video without its id yet still has its button and page, which
 * says it is on its way (Daniel, 2026-11-20: the button first, the link later). */
export const roomItems = (r: Report | undefined): RoomItem[] => r?.room?.items ?? [];

export const roomItem = (r: Report | undefined, key: string | undefined): RoomItem | undefined =>
  roomItems(r).find((i) => i.key === key);
