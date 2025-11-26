export const SITE = {
  name: "Daniel Forero",
  url: "https://www.danielforeroj.com",
  description:
    "Daniel Forero is a Web3/AI marketer, operator, and investor sharing playbooks, research, and downloads for founders.",
  defaultOgImage: "https://picsum.photos/1200/630",
  logo: "https://cdn.svgporn.com/logos/openai.svg",
  publisher: {
    name: "Daniel Forero",
    type: "Person" as const,
  },
};

export type SiteConfig = typeof SITE;
