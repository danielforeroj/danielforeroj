// data/profile.ts
// Single source of truth for the homepage.
// Personal-first: this site is about Daniel, co-founder of Unbound Operators.
// What he operates and builds leads; investing is one line inside that story,
// not the headline. He is not actively deploying capital.

export type Engagement = {
  role: string;
  org: string;
  note: string;
  url?: string;
  status: string;
};

export type Platform = {
  name: string;
  /** Daniel's or Unbound's relationship to it, shown as the card eyebrow. */
  kind: string;
  note: string;
  status: string;
  /** Omit while a domain is not live; a card with no url renders unlinked. */
  url?: string;
};

export type Pillar = {
  verb: string;
  note: string;
};

export const PROFILE = {
  name: "Daniel Forero",
  handle: "danielforeroj",
  eyebrow: "Co-founder, Unbound Operators",
  lead: "Operate. Build. Back.",
  leadAccent: "At the frontier.",
  sub: "Co-founder of Unbound Operators. We run growth for companies building in AI, Web3, quantum, and fintech, and we ship AI products of our own.",
  tags: ["Father", "Husband", "Operator", "Builder", "AI nerd", "Web3 degen", "Gamer"],
  sectors: ["AI", "Web3", "Quantum", "Fintech"],

  // Left status rail
  rail: [
    { label: "Co-founder", value: "Unbound Operators" },
    { label: "Building", value: "Selah · On Duty · unbound geo" },
    { label: "Hosting", value: "AI & frontier tech on Anotelo" },
    { label: "Sectors", value: "AI / Web3 / Quantum / Fintech" },
    { label: "Supported raises", value: "$600M+" },
    { label: "Off the clock", value: "Father, husband, gamer" },
  ],

  now: {
    label: "Co-founder",
    org: "Unbound Operators",
    note: "A holding company and operator collective. Not a fund, but we invest. Not an agency, but we operate.",
    url: "https://unboundoperators.com",
  },

  pillars: [
    {
      verb: "Operate",
      note: "Brands we run for clients: Unbound for companies at the frontier, Unbound Growth Partners for established businesses.",
    },
    {
      verb: "Build",
      note: "Products we own and ship, mostly AI: governance for agents, context for business operations, visibility in AI search.",
    },
    {
      verb: "Back",
      note: "A few companies we take a stake in and work inside of, like Mostaza.",
    },
  ] as Pillar[],

  platforms: [
    {
      name: "Selah",
      kind: "Co-founder & CEO",
      note: "Pre-execution governance for AI agents. It decides what any agent may do and say before it acts, not after.",
      status: "Live",
      url: "https://selahcore.com",
    },
    {
      name: "On Duty",
      kind: "Unbound product",
      note: "The AI brain for a business. It indexes what the company already knows and turns it into context for its AI operations.",
      status: "Live",
      url: "https://alwaysonduty.io",
    },
    {
      name: "unbound geo",
      kind: "Unbound product",
      note: "Are you in the answer? See whether AI answer engines name your brand when a buyer asks about your category.",
      status: "Launching",
      url: "https://unboundgeo.com",
    },
    {
      name: "Unbound platform",
      kind: "Unbound product",
      note: "The operating system our brands run their clients on: deliverables, approvals, spend, and results in one place, open to AI agents.",
      status: "Private",
    },
    {
      name: "Mostaza",
      kind: "Client & minority partner",
      note: "Digital dollars for Colombia. Top up with pesos and spend anywhere with a free Mastercard.",
      status: "Live",
      url: "https://mostaza.co",
    },
    {
      name: "Anotelo",
      kind: "Host",
      note: "A Spanish-language podcast. I host its vertical on AI and frontier technology.",
      status: "Launching",
    },
  ] as Platform[],

  operate: [
    {
      name: "Unbound",
      note: "Growth for companies building at the frontier: marketing, PR, partnerships, government relations, AI operations, fundraising.",
      url: "https://withunbound.com",
    },
    {
      name: "Unbound Growth Partners",
      note: "Modern growth and AI operations for established businesses. Done for you, not explained to you.",
      url: "https://unboundgrowthpartners.com",
    },
  ],

  engagements: [
    {
      role: "Co-founder",
      org: "Unbound Operators",
      note: "Operator collective behind Unbound, Unbound Growth Partners, On Duty, and unbound geo.",
      url: "https://unboundoperators.com",
      status: "Live",
    },
    {
      role: "Co-founder & CEO",
      org: "Selah",
      note: "Governance for AI agents and agentic operations.",
      url: "https://selahcore.com",
      status: "Live",
    },
    {
      role: "Host",
      org: "Anotelo",
      note: "The AI and frontier technology vertical of a Spanish-language podcast.",
      status: "Launching",
    },
    {
      role: "GTM Mentor",
      org: "Outlier Ventures",
      note: "Go-to-market, positioning, and narrative for founders inside the accelerator.",
      url: "https://outlierventures.io",
      status: "Active",
    },
    {
      role: "Post-quantum security",
      org: "Governments",
      note: "Cybersecurity for post-quantum technologies, across projects under NDA.",
      status: "NDA",
    },
  ] as Engagement[],

  who: [
    "Over the past decade I've supported founders through more than $600M in raises, moved millions in stablecoin flows across borders, and opened new revenue models for everyday users. My growth playbook drove mainstream traction for global brands, generated nine-figure TVL, and put emerging tech on the pop-culture stage with drops for Quentin Tarantino and Doja Cat.",
    "Today that work runs through Unbound Operators, and the same team now builds AI products of its own. I spend most of my time on how AI actually runs inside a business: what agents are allowed to do, what context they work from, and whether the market can find you in an AI answer. I still angel invest now and then, hands-on, when a founder is a clear fit.",
  ],

  record: [
    { figure: "$600M+", label: "Raises supported" },
    { figure: "9 figures", label: "TVL generated" },
    { figure: "Tarantino · Doja Cat", label: "Culture drops" },
    { figure: "Wormhole · Immutable X", label: "Launches" },
  ],

  actions: {
    primary: { label: "Work with me", to: "/work-w-me" },
    secondary: { label: "Unbound Operators", href: "https://unboundoperators.com" },
  },

  socials: [
    { name: "X", url: "https://www.x.com/danielforeroj/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/danielforeroj/" },
    { name: "Instagram", url: "https://www.instagram.com/danielforeroj/" },
    { name: "Telegram", url: "https://t.me/danielforeroj/" },
  ],

  email: "hello@danielforeroj.com",
};

export type Profile = typeof PROFILE;
