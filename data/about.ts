// data/about.ts
// The about page (/about, /es/sobre-mi): who Daniel Forero is, said plainly and
// in the third person, so a search or answer engine can quote any paragraph on
// its own. Every fact is one data/profile.ts or data/entity.ts already states;
// nothing here is new. The FAQ is also emitted as FAQPage JSON-LD.

import { PROFILE } from "./profile";

export type AboutCopy = {
  title: string;
  description: string;
  kicker: string;
  h1: string;
  lede: string;
  portraitAlt: string;
  sections: { heading: string; paragraphs: string[] }[];
  profilesHeading: string;
  profilesBody: string;
  emailLabel: string;
  companyHeading: string;
  faqHeading: string;
  faq: { q: string; a: string }[];
  cta: string;
  crumbHome: string;
  crumbAbout: string;
};

const EN: AboutCopy = {
  title: "Daniel Forero: who he is | Co-founder of Unbound",
  description:
    "Who Daniel Forero is: co-founder of Unbound (Unbound Operators LLC), helping traditional and tech companies grow with AI, marketing, BD and capital.",
  kicker: "About",
  h1: "Daniel Forero",
  lede:
    "Daniel Forero is the co-founder of Unbound (Unbound Operators LLC). He helps companies, traditional and tech, grow: with technology and AI, marketing and communications that work, business development and the right connections, advisory, and the capital to get there.",
  portraitAlt: "Daniel Forero, co-founder of Unbound",
  sections: [
    {
      heading: "What he does",
      paragraphs: [
        "Unbound works through two divisions. Unbound (withunbound.com) is the growth partner for companies building in AI, fintech and Web3, from pre-seed to Series B: marketing, PR, partnerships, government relations, AI operations and fundraising. Unbound Growth Partners (unboundgrowthpartners.com) does growth and AI operations for established businesses that already sell.",
        "Daniel has supported founders through more than US$600M in raises. Teams he has worked with include Mysten Labs (Sui), Synthetix, Cudis, Nansen and RappiPay.",
        "He is a GTM mentor at Outlier Ventures, working with founders inside the accelerator on go-to-market, positioning and narrative, and he hosts the AI and frontier technology vertical of Anotelo, a Spanish-language podcast.",
      ],
    },
    {
      heading: "Background",
      paragraphs: [
        "Over the past decade his growth work drove mainstream traction for global brands, generated nine-figure TVL, worked on launches for Wormhole and Immutable X, and put emerging technology on the pop-culture stage with drops for Quentin Tarantino and Doja Cat.",
        "He is Colombian, a father and a husband, and works in Spanish and English.",
      ],
    },
    {
      heading: "The name",
      paragraphs: [
        "There is more than one Daniel Forero online. This one is also written Daniel Forero J, his handle on every network is @danielforeroj, and danielforeroj.com is his official site.",
      ],
    },
  ],
  profilesHeading: "Official profiles",
  profilesBody: "These are the only accounts that are his.",
  emailLabel: "Email",
  companyHeading: "Unbound",
  faqHeading: "Questions",
  faq: [
    {
      q: "Who is Daniel Forero?",
      a: "Daniel Forero is the co-founder of Unbound (Unbound Operators LLC). He helps traditional and tech companies grow with technology and AI, marketing and communications, business development and connections, advisory, and capital.",
    },
    {
      q: "What company is Daniel Forero part of?",
      a: "Unbound Operators LLC, known as Unbound (unboundoperators.com). Its divisions are Unbound (withunbound.com), for companies building in AI, fintech and Web3, and Unbound Growth Partners (unboundgrowthpartners.com), for established businesses.",
    },
    {
      q: "What does Daniel Forero help companies with?",
      a: "Growth, using every lever at once: technology, AI and data, marketing and communications, business development and partnerships, advisory, and fundraising. He has supported founders through more than US$600M in raises.",
    },
    {
      q: "Which Daniel Forero is this?",
      a: "The co-founder of Unbound. He is danielforeroj on LinkedIn, Instagram, TikTok, YouTube and X, and his official site is danielforeroj.com.",
    },
    {
      q: "How can I contact Daniel Forero?",
      a: `Write to ${PROFILE.email}, or use the form at danielforeroj.com/work-w-me.`,
    },
  ],
  cta: "Work with me",
  crumbHome: "Home",
  crumbAbout: "About",
};

const ES: AboutCopy = {
  title: "Daniel Forero: quién es | Cofundador de Unbound",
  description:
    "Quién es Daniel Forero: cofundador de Unbound (Unbound Operators LLC). Ayuda a empresas tradicionales y tech a crecer con IA, marketing, BD y capital.",
  kicker: "Sobre mí",
  h1: "Daniel Forero",
  lede:
    "Daniel Forero es cofundador de Unbound (Unbound Operators LLC). Ayuda a empresas, tradicionales y de tecnología, a crecer: con tecnología e IA, marketing y comunicaciones que funcionan, desarrollo de negocios y las conexiones correctas, asesoría y el capital para hacerlo.",
  portraitAlt: "Daniel Forero, cofundador de Unbound",
  sections: [
    {
      heading: "Qué hace",
      paragraphs: [
        "Unbound trabaja con dos divisiones. Unbound (withunbound.com) es el socio de crecimiento de empresas que construyen en IA, fintech y Web3, de pre-seed a Serie B: marketing, PR, alianzas, relaciones con gobierno, operaciones con IA y levantamiento de capital. Unbound Growth Partners (unboundgrowthpartners.com) hace crecimiento y operaciones con IA para empresas establecidas que ya venden.",
        "Daniel ha acompañado a founders en rondas por más de US$600M. Entre los equipos con los que ha trabajado están Mysten Labs (Sui), Synthetix, Cudis, Nansen y RappiPay.",
        "Es mentor de GTM en Outlier Ventures, donde trabaja con founders de la aceleradora en go-to-market, posicionamiento y narrativa, y presenta la vertical de IA y tecnología de frontera de Anotelo, un podcast en español.",
      ],
    },
    {
      heading: "Trayectoria",
      paragraphs: [
        "En la última década su trabajo de crecimiento llevó a marcas globales a una tracción masiva, generó un TVL de nueve cifras, trabajó en lanzamientos para Wormhole e Immutable X y puso a la tecnología emergente en el escenario de la cultura pop con drops para Quentin Tarantino y Doja Cat.",
        "Es colombiano, papá y esposo, y trabaja en español y en inglés.",
      ],
    },
    {
      heading: "El nombre",
      paragraphs: [
        "Hay más de un Daniel Forero en internet. Este también se escribe Daniel Forero J, su usuario en todas las redes es @danielforeroj y danielforeroj.com es su sitio oficial.",
      ],
    },
  ],
  profilesHeading: "Perfiles oficiales",
  profilesBody: "Estas son las únicas cuentas que son suyas.",
  emailLabel: "Email",
  companyHeading: "Unbound",
  faqHeading: "Preguntas",
  faq: [
    {
      q: "¿Quién es Daniel Forero?",
      a: "Daniel Forero es cofundador de Unbound (Unbound Operators LLC). Ayuda a empresas tradicionales y de tecnología a crecer con tecnología e IA, marketing y comunicaciones, desarrollo de negocios y conexiones, asesoría y capital.",
    },
    {
      q: "¿De qué empresa es Daniel Forero?",
      a: "De Unbound Operators LLC, conocida como Unbound (unboundoperators.com). Sus divisiones son Unbound (withunbound.com), para empresas que construyen en IA, fintech y Web3, y Unbound Growth Partners (unboundgrowthpartners.com), para empresas establecidas.",
    },
    {
      q: "¿En qué ayuda Daniel Forero a las empresas?",
      a: "A crecer, con todas las palancas a la vez: tecnología, IA y datos, marketing y comunicaciones, desarrollo de negocios y alianzas, asesoría y levantamiento de capital. Ha acompañado a founders en rondas por más de US$600M.",
    },
    {
      q: "¿Cuál Daniel Forero es este?",
      a: "El cofundador de Unbound. Es danielforeroj en LinkedIn, Instagram, TikTok, YouTube y X, y su sitio oficial es danielforeroj.com.",
    },
    {
      q: "¿Cómo contacto a Daniel Forero?",
      a: `Escríbele a ${PROFILE.email}, o usa el formulario en danielforeroj.com/es/work-w-me.`,
    },
  ],
  cta: "Trabaja conmigo",
  crumbHome: "Inicio",
  crumbAbout: "Sobre mí",
};

export const ABOUT = { en: EN, es: ES } as const;
