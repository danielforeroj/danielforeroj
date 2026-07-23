// data/profile.ts
// Single source of truth for the homepage.
// Personal-first: this site is about Daniel, the operator turned angel investor.

export type Engagement = {
  role: string;
  org: string;
  note: string;
  url?: string;
  status: string;
};

export type Venture = {
  name: string;
  note: string;
  url?: string;
};

export const PROFILE = {
  name: "Daniel Forero",
  handle: "danielforeroj",
  eyebrow: "Operator ➜ Angel investor",
  lead: "Operator turned",
  leadAccent: "angel investor",
  sub: "I turn ideas into real-world businesses, then make sure the world hears about them.",
  tags: [
    "Father",
    "Husband",
    "Marketer",
    "Web3 degen",
    "AI nerd",
    "Angel investor",
    "Gamer",
  ],
  sectors: ["Web3", "AI", "Quantum"],

  // Left status rail
  rail: [
    { label: "Now building", value: "Unbound Operators" },
    { label: "Under the umbrella", value: "On Duty · Selah" },
    { label: "Sectors", value: "Web3 / AI / Quantum" },
    { label: "Advising", value: "Founders, funds, governments" },
    { label: "Raised for founders", value: "$600M" },
    { label: "Off the clock", value: "Father, husband, gamer" },
  ],

  now: {
    label: "Now building",
    org: "Unbound Operators",
    note: "My operating platform. Everything I build runs under it.",
    url: "https://unboundoperators.com",
  },

  ventures: [
    {
      name: "On Duty",
      note: "Vertical AI for business operations in emerging markets.",
      url: "https://alwaysonduty.io",
    },
    {
      name: "Selah",
      note: "Governance for AI agents and agentic operations.",
      url: "https://selahcore.com",
    },
  ] as Venture[],

  engagements: [
    {
      role: "Founder & CEO",
      org: "Unbound Operators",
      note: "Operating platform across growth, AI, and go-to-market. On Duty and Selah both live under it.",
      url: "https://unboundoperators.com",
      status: "Live",
    },
    {
      role: "Advisor",
      org: "Web3, AI & Quantum projects",
      note: "Hands-on advisory for teams building across blockchain, artificial intelligence, and quantum.",
      status: "Active",
    },
    {
      role: "Post-quantum security",
      org: "Governments",
      note: "Cybersecurity for post-quantum technologies, alongside Tectonic and other projects under NDA.",
      status: "NDA",
    },
    {
      role: "GTM Mentor",
      org: "Outlier Ventures",
      note: "Go-to-market, positioning, and narrative for founders inside the accelerator.",
      url: "https://outlierventures.io",
      status: "Active",
    },
    {
      role: "Advisor",
      org: "Comet Cash",
      note: "Payments infrastructure built on Bitcoin and Lightning.",
      url: "https://www.cometcash.com/",
      status: "Active",
    },
  ] as Engagement[],

  who: [
    "Over the past decade I've helped founders raise $600M in total, moved millions in stablecoin flows across borders, and opened new revenue models for everyday users.",
    "My growth playbook has driven mainstream traction for global brands, generated nine-figure TVL, and put emerging tech on the pop-culture stage with headline drops for Quentin Tarantino and Doja Cat. Today that work runs through Unbound Operators and spans Web3, AI, and quantum, for founders, funds, and governments.",
  ],

  record: [
    { figure: "$600M", label: "Raised for founders" },
    { figure: "9 figures", label: "TVL generated" },
    { figure: "Tarantino · Doja Cat", label: "Culture drops" },
    { figure: "Wormhole · Immutable X", label: "Launches" },
  ],

  back: {
    thesis:
      "I back founders reinventing finance, identity, ownership, and intelligence, then jump in hands-on to turn theory into traction. If you're raising and that's you, pitch me.",
    looking: "I'm looking for relentless founders with a clear vision and the grit to execute.",
  },

  actions: {
    primary: { label: "Work with me", to: "/work-w-me" },
    secondary: {
      label: "Pitch me",
      href: "mailto:hello@danielforeroj.com?subject=Pitch%20%E2%80%94%20I'm%20raising",
    },
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
