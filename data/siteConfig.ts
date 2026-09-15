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
  description:
    "Daniel Forero is co-founder of Unbound Operators, which helps businesses grow by implementing AI and AI workflows, and builds Selah, On Duty, and unbound geo.",
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
