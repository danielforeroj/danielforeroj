// The apex is canonical. www.danielforeroj.com 308s here, so every URL the site
// emits, canonical, og:url, sitemap, JSON-LD, must be bare, not www. Pointing
// a canonical at a redirect makes the two disagree for no gain.
export const SITE = {
  name: "Daniel Forero",
  /** Origin with no trailing slash. Concatenation base: `${SITE.url}/blog`. */
  url: "https://danielforeroj.com",
  /**
   * The homepage as a URL in its own right, with the trailing slash the origin
   * and the sitemap both use. Anywhere the homepage is *referenced* rather than
   * used as a prefix, canonical, breadcrumb root, Person.url, must use this,
   * so the site never emits two spellings of the same page.
   */
  homeUrl: "https://danielforeroj.com/",
  // The descriptor Daniel owns (positioning, 2026-09-24): meta description of
  // the homepage, Person.description, WebSite.description. 120-158 characters.
  // Pre-launch products are never named here.
  description:
    "Daniel Forero, co-founder of Unbound, helps traditional and tech companies grow with AI, marketing and comms, BD and connections, advisory and capital.",
  defaultOgImage: "https://danielforeroj.com/og.jpg",
  // Must be a URL that actually resolves. This pointed at /favicon.ico, which
  // 404s, public/ holds only og.jpg and robots.txt, and a 404 logo is worse
  // than no logo, because logo is what gates knowledge-panel eligibility.
  // public/og.jpg is the only real image the site ships (1200x630, 200 OK).
  logo: "https://danielforeroj.com/og.jpg",
  publisher: {
    name: "Daniel Forero",
    type: "Person" as const,
  },
};

export type SiteConfig = typeof SITE;

/** SITE.description per language. The Spanish is a translation of the English, same claims. */
export const SITE_DESCRIPTION = {
  en: SITE.description,
  es: "Daniel Forero, cofundador de Unbound, ayuda a empresas tradicionales y tech a crecer con IA, marketing y comunicaciones, BD y conexiones, asesoría y capital.",
} as const;

/**
 * Sections that exist in code but are not published yet.
 *
 * Research and Downloads are hidden because neither has any content: every post
 * in data/mockData.ts is typed BLOG, so both pages rendered an empty list and
 * invited crawlers into a dead end.
 *
 * Flipping a value back to true is the only change needed to publish it. The
 * routes and the nav both read this, so they cannot drift, and sitemap.xml and
 * llms.txt are derived from what actually builds, so they follow automatically.
 */
export const SECTIONS = {
  blog: true,
  research: false,
  downloads: false,
  /**
   * The AI funnel (/ai, /ai/recursos, /ai/recursos/:key). Published: unbound-app's
   * /api/ai is live behind the /api/ai rewrite in vercel.json.
   */
  ai: true,
} as const;

/**
 * Linea de cupo semanal en /links: APAGADA PARA SIEMPRE.
 * Daniel, 2026-10-05, textual, cuando se le pregunto el cupo semanal: "las que
 * sean necesarias, cero problema con eso". No hay tope de diagnosticos ni
 * escaneos por semana, asi que "esta semana tenemos N cupos" seria falso. El
 * tipo es null a proposito, para que nadie le ponga un numero. Lo mismo queda
 * en C:\agents\studio\config\marca.json > cta_por_pilar.escasez.
 */
export const CAPACITY: { weeklySpots: null } = {
  weeklySpots: null,
};
