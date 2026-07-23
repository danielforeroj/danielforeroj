export const SITE = {
  name: "Daniel Forero",
  url: "https://www.danielforeroj.com",
  description:
    "Daniel Forero is an operator turned angel investor working across Web3, AI, and quantum. He builds businesses, then makes the world hear about them.",
  defaultOgImage: "https://www.danielforeroj.com/og.jpg",
  logo: "https://www.danielforeroj.com/favicon.ico",
  publisher: {
    name: "Daniel Forero",
    type: "Person" as const,
  },
};

export type SiteConfig = typeof SITE;
