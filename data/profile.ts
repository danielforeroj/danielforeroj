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

/** The English profile. The Spanish one below shares every name, URL and figure. */
export const PROFILE = {
  name: "Daniel Forero",
  handle: "danielforeroj",
  eyebrow: "Co-founder, Unbound Operators",
  lead: "Operate. Build. Back.",
  leadAccent: "At the frontier.",
  sub: "Co-founder of Unbound Operators. We help businesses grow by implementing AI and AI workflows efficiently, and we ship AI products of our own.",
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
    note: "We help businesses grow by implementing AI and AI workflows efficiently. Not a fund, but we invest. Not an agency, but we operate.",
    url: "https://unboundoperators.com",
  },

  pillars: [
    {
      verb: "Services",
      note: "Service verticals that implement AI and run growth with clients, each with its own subverticals: Unbound for frontier tech, Unbound Growth Partners for established businesses.",
    },
    {
      verb: "Products",
      note: "Product verticals we own and ship, each with its own subverticals: governance for agents, context for business operations, visibility in AI search.",
    },
    {
      verb: "Invest",
      note: "We still invest in companies we believe in and work inside of, like Mostaza.",
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
      kind: "Product vertical",
      note: "The AI brain for a business. It indexes what the company already knows and turns it into context for its AI operations.",
      status: "Live",
      url: "https://alwaysonduty.io",
    },
    {
      name: "unbound geo",
      kind: "Product vertical",
      note: "Are you in the answer? See whether AI answer engines name your brand when a buyer asks about your category.",
      status: "Launching",
      url: "https://unboundgeo.com",
    },
    {
      name: "Unbound platform",
      kind: "Product vertical",
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
      note: "Helps businesses grow by implementing AI and AI workflows, through service verticals, product verticals, and investment.",
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
    "Today that work runs through Unbound Operators, which helps businesses grow by implementing AI and AI workflows efficiently, across service and product verticals. I spend most of my time on how AI actually runs inside a business: what agents are allowed to do, what context they work from, and whether the market can find you in an AI answer. I still angel invest now and then, hands-on, when a founder is a clear fit.",
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
    { name: "TikTok", url: "https://www.tiktok.com/@danielforeroj" },
    { name: "YouTube", url: "https://www.youtube.com/@danielforeroj" },
    { name: "Telegram", url: "https://t.me/danielforeroj/" },
  ],

  email: "hello@danielforeroj.com",
};

export type Profile = typeof PROFILE;

/**
 * The Spanish homepage. A translation of PROFILE, not a second source: names,
 * URLs, figures, socials and email are taken from PROFILE, so the two cannot
 * disagree on a fact, only the prose is written here.
 */
export const PROFILE_ES: Profile = {
  ...PROFILE,
  eyebrow: "Cofundador, Unbound Operators",
  lead: "Operar. Construir. Invertir.",
  leadAccent: "En la frontera.",
  sub: "Cofundador de Unbound Operators. Ayudamos a las empresas a crecer implementando AI y flujos de trabajo con AI de forma eficiente, y lanzamos productos de AI propios.",
  tags: ["Papá", "Esposo", "Operador", "Constructor", "Nerd de AI", "Degen de Web3", "Gamer"],
  sectors: ["AI", "Web3", "Cuántica", "Fintech"],

  rail: [
    { label: "Cofundador", value: "Unbound Operators" },
    { label: "Construyendo", value: "Selah · On Duty · unbound geo" },
    { label: "Presentando", value: "AI y tecnología de frontera en Anotelo" },
    { label: "Sectores", value: "AI / Web3 / Cuántica / Fintech" },
    { label: "Rondas apoyadas", value: "$600M+" },
    { label: "Fuera del trabajo", value: "Papá, esposo, gamer" },
  ],

  now: {
    ...PROFILE.now,
    label: "Cofundador",
    note: "Ayudamos a las empresas a crecer implementando AI y flujos de trabajo con AI de forma eficiente. No somos un fondo, pero invertimos. No somos una agencia, pero operamos.",
  },

  pillars: [
    {
      verb: "Servicios",
      note: "Verticales de servicios que implementan AI y manejan el crecimiento con clientes, cada una con sus propias subverticales: Unbound para tecnología de frontera, Unbound Growth Partners para empresas establecidas.",
    },
    {
      verb: "Productos",
      note: "Verticales de producto propias que lanzamos, cada una con sus propias subverticales: gobernanza para agentes, contexto para las operaciones del negocio, visibilidad en la búsqueda con AI.",
    },
    {
      verb: "Inversión",
      note: "Seguimos invirtiendo en empresas en las que creemos y en las que trabajamos desde adentro, como Mostaza.",
    },
  ],

  platforms: [
    {
      ...PROFILE.platforms[0],
      kind: "Cofundador y CEO",
      note: "Gobernanza previa a la ejecución para agentes de AI. Decide qué puede hacer y decir cualquier agente antes de que actúe, no después.",
    },
    {
      ...PROFILE.platforms[1],
      kind: "Vertical de producto",
      note: "El cerebro de AI de una empresa. Indexa lo que la empresa ya sabe y lo convierte en contexto para sus operaciones con AI.",
    },
    {
      ...PROFILE.platforms[2],
      kind: "Vertical de producto",
      note: "¿Apareces en la respuesta? Mira si los motores de respuesta con AI nombran tu marca cuando un comprador pregunta por tu categoría.",
    },
    {
      ...PROFILE.platforms[3],
      name: "Plataforma Unbound",
      kind: "Vertical de producto",
      note: "El sistema operativo con el que nuestras marcas atienden a sus clientes: entregables, aprobaciones, gasto y resultados en un solo lugar, abierto a agentes de AI.",
    },
    {
      ...PROFILE.platforms[4],
      kind: "Cliente y socio minoritario",
      note: "Dólares digitales para Colombia. Recarga con pesos y paga donde sea con una Mastercard gratis.",
    },
    {
      ...PROFILE.platforms[5],
      kind: "Presentador",
      note: "Un podcast en español. Presento su vertical de AI y tecnología de frontera.",
    },
  ],

  operate: [
    {
      ...PROFILE.operate[0],
      note: "Crecimiento para empresas que construyen en la frontera: marketing, PR, alianzas, relaciones con gobierno, operaciones con AI, levantamiento de capital.",
    },
    {
      ...PROFILE.operate[1],
      note: "Crecimiento moderno y operaciones con AI para empresas establecidas. Lo hacemos por ti, no te lo explicamos.",
    },
  ],

  engagements: [
    {
      ...PROFILE.engagements[0],
      role: "Cofundador",
      note: "Ayuda a las empresas a crecer implementando AI y flujos de trabajo con AI, a través de verticales de servicios, verticales de producto e inversión.",
    },
    {
      ...PROFILE.engagements[1],
      role: "Cofundador y CEO",
      note: "Gobernanza para agentes de AI y operaciones agénticas.",
    },
    {
      ...PROFILE.engagements[2],
      role: "Presentador",
      note: "La vertical de AI y tecnología de frontera de un podcast en español.",
    },
    {
      ...PROFILE.engagements[3],
      role: "Mentor de GTM",
      note: "Go-to-market, posicionamiento y narrativa para founders dentro de la aceleradora.",
    },
    {
      ...PROFILE.engagements[4],
      role: "Seguridad poscuántica",
      org: "Gobiernos",
      note: "Ciberseguridad para tecnologías poscuánticas, en proyectos bajo NDA.",
    },
  ],

  who: [
    "En la última década he acompañado a founders en rondas por más de $600M, he movido millones en flujos de stablecoins entre países y he abierto nuevos modelos de ingresos para usuarios comunes. Mi playbook de crecimiento llevó a marcas globales a una tracción masiva, generó un TVL de nueve cifras y puso a la tecnología emergente en el escenario de la cultura pop con drops para Quentin Tarantino y Doja Cat.",
    "Hoy ese trabajo pasa por Unbound Operators, que ayuda a las empresas a crecer implementando AI y flujos de trabajo con AI de forma eficiente, con verticales de servicios y de producto. Paso la mayor parte de mi tiempo en cómo funciona de verdad la AI dentro de una empresa: qué pueden hacer los agentes, con qué contexto trabajan y si el mercado te encuentra en una respuesta de AI. De vez en cuando sigo haciendo inversiones ángel, con las manos en el trabajo, cuando un founder encaja claramente.",
  ],

  record: [
    { figure: "$600M+", label: "Rondas apoyadas" },
    { figure: "9 cifras", label: "TVL generado" },
    { figure: "Tarantino · Doja Cat", label: "Drops culturales" },
    { figure: "Wormhole · Immutable X", label: "Lanzamientos" },
  ],

  actions: {
    primary: { label: "Trabaja conmigo", to: "/work-w-me" },
    secondary: PROFILE.actions.secondary,
  },
};

export const PROFILES = { en: PROFILE, es: PROFILE_ES } as const;
