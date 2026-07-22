export const SITE = {
  name: "Daniel Forero",
  url: "https://www.danielforeroj.com",
  description:
    "Daniel Forero is CEO and co-founder of Unbound Operators, an operating platform with business verticals across growth, AI operations, frontier tech, and governance.",
  defaultOgImage: "https://picsum.photos/1200/630",
  logo: "https://cdn.svgporn.com/logos/openai.svg",
  publisher: {
    name: "Daniel Forero",
    type: "Person" as const,
  },
};

export type SiteConfig = typeof SITE;
