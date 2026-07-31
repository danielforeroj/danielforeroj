// The apex is canonical. www.danielforeroj.com 308s here, so every URL the site
// emits — canonical, og:url, sitemap, JSON-LD — must be bare, not www. Pointing
// a canonical at a redirect makes the two disagree for no gain.
export const SITE = {
  name: "Daniel Forero",
  url: "https://danielforeroj.com",
  description:
    "Daniel Forero is an operator turned angel investor working across AI, Web3, quantum, and fintech. He builds businesses, then makes the world hear about them.",
  defaultOgImage: "https://danielforeroj.com/og.jpg",
  logo: "https://danielforeroj.com/favicon.ico",
  publisher: {
    name: "Daniel Forero",
    type: "Person" as const,
  },
};

export type SiteConfig = typeof SITE;
