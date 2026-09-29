// data/entity.ts
// Who Daniel Forero is, stated once, for search and answer engines.
//
// Google and the AI assistants have several people named "Daniel Forero" to
// choose from. What makes this one resolvable is saying the same thing, in the
// same words, everywhere: the <title> and description of the home and about
// pages, the Person JSON-LD, llms.txt. All of them read from here.
//
// Every claim below comes from data/profile.ts or from the positioning Daniel
// approved on 2026-09-24. Nothing is added that those do not already say, and
// products that have not launched publicly are never named here.

import { SITE, SITE_DESCRIPTION } from "./siteConfig";

/** The descriptor, one sentence per language. Used as meta description and Person.description. */
export const DESCRIPTOR = SITE_DESCRIPTION;

/** The homepage <title>: the name first, then the descriptor, 60 characters or fewer. */
export const HOME_TITLE = {
  en: "Daniel Forero | Co-founder of Unbound: growth, AI, capital",
  es: "Daniel Forero | Cofundador de Unbound: crecer, IA, capital",
} as const;

/** How people actually write the name. */
export const ALTERNATE_NAMES = ["Daniel Forero J", "danielforeroj", "@danielforeroj"];

/**
 * The profiles that are Daniel's own and official, in the order an engine
 * should trust them. This is the Person's sameAs, kept apart from the social
 * links on the homepage so it only ever lists confirmed identities.
 *
 * LinkedIn is deliberately missing: the main profile's URL is not confirmed
 * yet (linkedin.com/in/danielforeroj is not it, per Daniel, 2026-09-29). Add it
 * here, first in the list, once it is, and to the "Official profiles" list
 * in scripts/gen-sitemap.mjs (llms.txt), which cannot import this file.
 */
export const ENTITY_PROFILES: { name: string; url: string }[] = [
  { name: "X", url: "https://x.com/danielforeroj" },
  { name: "Instagram", url: "https://www.instagram.com/danielforeroj/" },
  { name: "TikTok", url: "https://www.tiktok.com/@danielforeroj" },
  { name: "YouTube", url: "https://www.youtube.com/channel/UCZSBzNzRzGIUl09cYu4AUqw" },
  { name: "Telegram", url: "https://t.me/danielforeroj" },
];

/** YouTube's handle URL resolves to the channel URL above; both are listed in sameAs. */
const SAME_AS_EXTRA = ["https://www.youtube.com/@danielforeroj"];

export const SAME_AS = [...ENTITY_PROFILES.map((p) => p.url), ...SAME_AS_EXTRA];

/** A square portrait at a stable URL (public/daniel-forero.jpg, 900x900). */
export const PORTRAIT_URL = `${SITE.url}/daniel-forero.jpg`;

/**
 * The company. Unbound Operators LLC is the legal entity and unboundoperators.com
 * its entity home; the @id values match the Organization nodes those sites
 * already publish, so the graphs join up instead of describing three companies.
 */
export const COMPANY = {
  "@type": "Organization",
  "@id": "https://unboundoperators.com/#organization",
  name: "Unbound Operators",
  legalName: "Unbound Operators LLC",
  alternateName: "Unbound",
  url: "https://unboundoperators.com/",
  department: [
    {
      "@type": "Organization",
      "@id": "https://withunbound.com/#organization",
      name: "Unbound",
      url: "https://withunbound.com/",
    },
    {
      "@type": "Organization",
      name: "Unbound Growth Partners",
      url: "https://unboundgrowthpartners.com/",
    },
  ],
} as const;

/** What he works on, as Person.knowsAbout. The descriptor's areas plus the sectors on the homepage. */
export const KNOWS_ABOUT = {
  en: [
    "Business growth",
    "Artificial intelligence",
    "Data",
    "Marketing",
    "Communications and PR",
    "Business development",
    "Partnerships",
    "Fundraising",
    "Go-to-market strategy",
    "Web3",
    "Fintech",
  ],
  es: [
    "Crecimiento empresarial",
    "Inteligencia artificial",
    "Datos",
    "Marketing",
    "Comunicaciones y PR",
    "Desarrollo de negocios",
    "Alianzas",
    "Levantamiento de capital",
    "Estrategia de go-to-market",
    "Web3",
    "Fintech",
  ],
} as const;
