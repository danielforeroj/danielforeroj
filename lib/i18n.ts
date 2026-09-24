// The site in two languages.
//
// URL scheme: every page keeps the URL it already had, in the language it was
// first written in, and its translation lives under a language prefix.
//
//   English first (the whole site)   /blog         ->  Spanish at /es/blog
//                                     /             ->  Spanish at /es
//   Spanish first (the AI funnel)     /ai           ->  English at /en/ai
//                                     /ai/recursos  ->  English at /en/ai/recursos
//
// So no link that is already out there changes: /post/:slug, the /ai?r=ig bio
// links, the canonical of every page. The unprefixed URL is also the x-default
// hreflang, because it is the one that existed first and the one people share.

import React from 'react';
import { useLocation } from 'react-router-dom';

export type Lang = 'en' | 'es';

export const LANGS: Lang[] = ['en', 'es'];

/** BCP 47 for <html lang>, hreflang, and Intl date formatting. */
export const LOCALE: Record<Lang, string> = { en: 'en-US', es: 'es-CO' };

/** Open Graph wants underscores. es_LA is the Latin American Spanish locale Facebook reads. */
export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', es: 'es_LA' };

// Pages written in Spanish first: the AI funnel and the two entry points built
// for the Spanish social feeds (2026-09-24), the growth diagnostic and the GEO
// scan. Their unprefixed URL is Spanish and their translation lives under /en.
const ES_FIRST = ['/ai', '/crecer', '/geo'];
const isEsFirst = (base: string) => ES_FIRST.some((b) => base === b || base.startsWith(`${b}/`));

// A page whose translation has its own slug instead of the same slug under a
// prefix. /crecer reads as nothing to an English speaker, so its twin is
// /en/grow. Keys are the unprefixed (native) path.
const TRANSLATED_SLUG: Record<string, Partial<Record<Lang, string>>> = {
  '/crecer': { en: '/grow' },
};
const FROM_TRANSLATED_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(TRANSLATED_SLUG).flatMap(([base, slugs]) => Object.values(slugs).map((slug) => [slug, base])),
);

/** The language a page's unprefixed URL is in. */
export const nativeLang = (base: string): Lang => (isEsFirst(base) ? 'es' : 'en');

const PREFIX = /^\/(en|es)(?=\/|$)/;

/** The language a pathname is in: its prefix if it has one, otherwise the page's native language. */
export function langOfPath(pathname: string): Lang {
  const m = pathname.match(PREFIX);
  return m ? (m[1] as Lang) : nativeLang(pathname);
}

/** The pathname with any language prefix removed. "/es" -> "/", "/en/ai" -> "/ai". */
export function basePath(pathname: string): string {
  const stripped = pathname.replace(PREFIX, '');
  if (stripped === '') return '/';
  // "/en/grow" -> "/crecer". Only a prefixed path can carry a translated slug.
  return stripped !== pathname ? (FROM_TRANSLATED_SLUG[stripped] ?? stripped) : stripped;
}

/** The URL of a page (given by its unprefixed path) in a language. */
export function localePath(base: string, lang: Lang): string {
  if (lang === nativeLang(base)) return base;
  const slug = TRANSLATED_SLUG[base]?.[lang] ?? base;
  return `/${lang}${slug === '/' ? '' : slug}`;
}

export const otherLang = (lang: Lang): Lang => (lang === 'en' ? 'es' : 'en');

/** The same page in the other language. */
export function altPath(pathname: string): string {
  return localePath(basePath(pathname), otherLang(langOfPath(pathname)));
}

/**
 * The href of this page in the other language, query string and hash kept, so
 * an /ai?r=ig attribution survives a switch. ?lang= is dropped: it is how the
 * funnel used to pick a language, and the URL decides now.
 */
export function altHref(pathname: string, search = '', hash = ''): string {
  const params = new URLSearchParams(search);
  params.delete('lang');
  const query = params.toString();
  return `${altPath(pathname)}${query ? `?${query}` : ''}${hash}`;
}

/** The language of the current route. Works in the prerender, which has a location too. */
export function useLang(): Lang {
  return langOfPath(useLocation().pathname);
}

/** A path builder bound to the current language: lp('/blog') is /blog or /es/blog. */
export function useLocalePath(): (base: string) => string {
  const lang = useLang();
  return React.useCallback((base: string) => localePath(base, lang), [lang]);
}

export const formatDate = (iso: string, lang: Lang, month: 'short' | 'long' = 'short') =>
  new Date(iso).toLocaleDateString(LOCALE[lang], { year: 'numeric', month, day: 'numeric' });

// ---------------------------------------------------------------------------
// Site chrome and page copy. Post bodies live with each post (data/posts), the
// homepage with the profile (data/profile.ts), the AI funnel in lib/ai/copy.ts.
// ---------------------------------------------------------------------------

const UI = {
  en: {
    skipToContent: 'Skip to main content',
    homeAria: 'Daniel Forero home',
    primaryNav: 'Primary navigation',
    openMenu: 'Open main menu',
    menu: 'Menu',
    close: 'Close',
    nav: { index: 'Index', writing: 'Writing', research: 'Research', downloads: 'Downloads', work: 'Work with me' },
    langSwitchLabel: 'Language',
    langSwitchTo: 'Leer en español',
    footerLine: 'Operate · Build · Back',

    home: {
      introAria: 'Introduction',
      statusAria: 'Status',
      portraitAlt: 'Daniel Forero, co-founder of Unbound Operators',
      live: 'Operating',
      tagsAria: 'Also',
      serviceVertical: 'Service vertical',
      launchingTitle: "What we're launching",
      launchingKicker: 'Product verticals, partners, and media',
      open: 'Open',
      activeTitle: "Where I'm active",
      activeKicker: 'Roles right now',
      whoTitle: "Who's this guy",
      whoKicker: 'Background',
      writingTitle: 'Writing',
      allWriting: 'All writing →',
      read: 'Read ↗',
      contactAria: 'Get in touch',
      contactKicker: 'Get in touch',
      // Status keys stay in English in data/profile.ts because console.css
      // styles them by value ([data-s="Live"]); only the label is translated.
      status: { Live: 'Live', Launching: 'Launching', Private: 'Private', Active: 'Active', NDA: 'NDA' } as Record<string, string>,
    },

    list: {
      kicker: 'Library',
      titles: { blog: 'Blog', research: 'Research', lead_magnet: 'Downloads' },
      // On-page standfirsts. Rendered under the h1; not used as meta.
      standfirst: {
        blog: 'Narrative, operating notes, and field-tested GTM thinking for AI and Web3 teams.',
        research: 'Frameworks, experiments, and market notes for teams building in emerging categories.',
        lead_magnet: 'Templates, checklists, and practical artifacts built to move work forward.',
      },
      // Search-surface descriptions, 120-158 characters. Each is the standfirst
      // plus one clause naming the author and the sectors, both of which the
      // page and data/profile.ts already state.
      meta: {
        blog: 'Narrative, operating notes, and field-tested GTM thinking for AI and Web3 teams. Every blog post by Daniel Forero, newest first.',
        research:
          'Frameworks, experiments, and market notes for teams building in emerging categories. Daniel Forero on AI, Web3, quantum, and fintech.',
        lead_magnet:
          "Templates, checklists, and practical artifacts built to move work forward. Downloads from Daniel Forero's operator and GTM library.",
      },
      download: 'Download',
      read: 'Read',
      empty: 'No posts found in this category.',
      collectionIndex: (section: string) => `${section} index`,
    },

    post: {
      back: 'Back to library',
      published: 'Published',
      download: 'Download',
      notFoundTitle: 'Post not found',
      notFoundKicker: 'Missing',
      notFoundBody: 'The post you are looking for does not exist.',
    },

    crumbs: { home: 'Home', blog: 'Blog' },

    notFound: {
      title: 'Page not found',
      kicker: 'Error 404',
      heading: 'Page not found',
      body: 'That page does not exist. It may have moved, or the link that brought you here may be wrong.',
      home: 'Go back home',
    },

    coffee: {
      title: 'Virtual Coffee',
      description:
        'Book a virtual coffee with Daniel Forero: a focused conversation for ideas, intros, operator notes, or where AI and Web3 are headed next.',
      kicker: 'Conversation',
      standfirst: 'A focused conversation for ideas, intros, operator notes, or where AI and Web3 are headed next.',
      open: 'Open',
      iframeTitle: 'Book a virtual coffee with Daniel Forero',
    },

    work: {
      title: 'Work with me',
      description:
        'Founders between pre-seed and Series B with a real product and no traction: write to Daniel Forero. +US$600M raised for clients.',
      kicker: 'Advisory and execution',
      standfirst: 'Write to me. I read every email myself, and I answer the ones with enough in them to answer.',
      helpsKicker: 'What helps',
      helps: [
        'What the company does, and where it operates.',
        'What is actually stuck: growth, AI operations, positioning, partnerships, fundraising.',
        'What you have already tried.',
        'The timeline you are working against.',
      ],
      mailSubject: 'Work with me',
      phrase: "If you're between pre-seed and Series B with a real product and no traction, write me.",
      credential: '+US$600M raised for clients. Teams I have worked with include Mysten Labs (Sui), Synthetix, Cudis, Nansen and RappiPay.',
      formTitle: 'Tell me about the company',
      stageLabel: 'Stage',
      stages: [
        ['pre-seed', 'Pre-seed'],
        ['seed', 'Seed'],
        ['series-a', 'Series A'],
        ['series-b', 'Series B'],
        ['bootstrapped', 'Bootstrapped, with revenue'],
        ['established', 'Established business'],
        ['other', 'Other'],
      ] as [string, string][],
      messageLabel: 'What is stuck, and what have you tried?',
      messagePlaceholder: 'The product, the market, where traction stalls, the timeline.',
      submit: 'Send',
      sentTitle: 'Got it.',
      sentBody: 'I read every message myself and answer the ones with enough in them to answer. If it is urgent, book a call.',
      book: 'Book a call',
      orEmail: 'Prefer email?',
    },

    lead: {
      name: 'Name',
      email: 'Email',
      company: 'Company',
      website: 'Company website',
      optional: '(optional)',
      required: 'This field is required',
      invalidEmail: 'Check the email',
      errorGeneric: 'Something went wrong. Try again in a moment.',
      errorRateLimit: 'Too many attempts in a row. Wait a few minutes and try again.',
    },

    grow: {
      title: 'Growth diagnostic',
      seoTitle: 'Free growth diagnostic for your company',
      description:
        'Six questions, two minutes: tell me what is holding your company back and get a three-point readout written from your answers, plus the next step.',
      kicker: 'danielforeroj / grow',
      introTitle: 'What is holding your company back?',
      introBody:
        'Six multiple-choice questions, two minutes. At the end you get a three-point readout written from your answers, and the next step.',
      points: [
        'For owners and leaders of companies that already sell.',
        '+US$600M raised for clients.',
        'Free, no strings attached.',
      ],
      start: 'Start',
      next: 'Next',
      back: 'Back',
      step: (n: number, total: number) => `Question ${n} of ${total}`,
      pickOne: 'Pick one',
      pickMany: 'Pick one or more',
      contactTitle: 'Who is the readout for?',
      contactBody: 'Your readout is on the next screen. With your email I can write to you if I see something else in your answers.',
      submit: 'See my readout',
      resultKicker: 'Your readout',
      resultTitle: 'What I see in your answers',
      book: 'Book a call',
      bookNote: 'A call with me, with your answers already read.',
      restart: 'Start over',
    },

    geo: {
      title: 'Free GEO scan',
      seoTitle: 'Free GEO scan: does AI recommend you?',
      description:
        'I asked AI who the best is in your category: are you in the answer? A free 5-question scan, no account and no card, report in under ten minutes.',
      kicker: 'danielforeroj / geo',
      introTitle: 'I asked AI who the best is in your category. Are you in the answer?',
      introBody:
        'More and more buyers ask an AI assistant who to buy from, and the answer names three or four companies. This free scan shows you whether you are one of them.',
      points: [
        'Five real buyer questions from your category, each asked ten times to an AI with web search on.',
        'The report shows which companies it names and which sources it reads, at a link you can share.',
        'No account and no card. It lands in under ten minutes.',
      ],
      formTitle: 'Leave your details and I will take you to the scan',
      formBody: 'The scan runs on unboundgeo.com, the tool we use with clients. You pick the market and the language of the questions there.',
      submit: 'Go to the free scan',
      sentTitle: 'Done. Taking you to the scan.',
      manual: 'If it does not open, go here',
    },
  },

  es: {
    skipToContent: 'Saltar al contenido principal',
    homeAria: 'Inicio de Daniel Forero',
    primaryNav: 'Navegación principal',
    openMenu: 'Abrir el menú principal',
    menu: 'Menú',
    close: 'Cerrar',
    nav: { index: 'Inicio', writing: 'Escritos', research: 'Investigación', downloads: 'Descargas', work: 'Trabaja conmigo' },
    langSwitchLabel: 'Idioma',
    langSwitchTo: 'Read in English',
    footerLine: 'Operar · Construir · Invertir',

    home: {
      introAria: 'Introducción',
      statusAria: 'Estado',
      portraitAlt: 'Daniel Forero, cofundador de Unbound Operators',
      live: 'Operando',
      tagsAria: 'También',
      serviceVertical: 'Vertical de servicios',
      launchingTitle: 'Lo que estamos lanzando',
      launchingKicker: 'Verticales de producto, socios y medios',
      open: 'Abrir',
      activeTitle: 'Dónde estoy activo',
      activeKicker: 'Roles actuales',
      whoTitle: '¿Quién es este tipo?',
      whoKicker: 'Trayectoria',
      writingTitle: 'Escritos',
      allWriting: 'Todos los escritos →',
      read: 'Leer ↗',
      contactAria: 'Contacto',
      contactKicker: 'Escríbeme',
      status: { Live: 'Activo', Launching: 'Lanzando', Private: 'Privado', Active: 'Activo', NDA: 'NDA' } as Record<string, string>,
    },

    list: {
      kicker: 'Biblioteca',
      titles: { blog: 'Blog', research: 'Investigación', lead_magnet: 'Descargas' },
      standfirst: {
        blog: 'Narrativa, notas de operación y pensamiento de GTM probado en campo para equipos de AI y Web3.',
        research: 'Marcos, experimentos y notas de mercado para equipos que construyen en categorías emergentes.',
        lead_magnet: 'Plantillas, checklists y material práctico hecho para que el trabajo avance.',
      },
      meta: {
        blog: 'Narrativa, notas de operación y pensamiento de GTM probado en campo para equipos de AI y Web3. Todo el blog de Daniel Forero.',
        research:
          'Marcos, experimentos y notas de mercado para equipos en categorías emergentes. Daniel Forero sobre AI, Web3, cuántica y fintech.',
        lead_magnet:
          'Plantillas, checklists y material práctico hecho para que el trabajo avance. Descargas de la biblioteca de GTM de Daniel Forero.',
      },
      download: 'Descarga',
      read: 'Leer',
      empty: 'No hay publicaciones en esta categoría.',
      collectionIndex: (section: string) => `Índice de ${section}`,
    },

    post: {
      back: 'Volver a la biblioteca',
      published: 'Publicado el',
      download: 'Descargar',
      notFoundTitle: 'Publicación no encontrada',
      notFoundKicker: 'No existe',
      notFoundBody: 'La publicación que buscas no existe.',
    },

    crumbs: { home: 'Inicio', blog: 'Blog' },

    notFound: {
      title: 'Página no encontrada',
      kicker: 'Error 404',
      heading: 'Página no encontrada',
      body: 'Esa página no existe. Puede que se haya movido, o que el enlace que te trajo aquí esté mal.',
      home: 'Volver al inicio',
    },

    coffee: {
      title: 'Virtual Coffee',
      description:
        'Agenda un virtual coffee con Daniel Forero: una conversación enfocada para ideas, intros, notas de operación o hacia dónde van AI y Web3.',
      kicker: 'Conversación',
      standfirst: 'Una conversación enfocada para ideas, intros, notas de operación o hacia dónde van AI y Web3.',
      open: 'Abrir',
      iframeTitle: 'Agenda un virtual coffee con Daniel Forero',
    },

    work: {
      title: 'Trabaja conmigo',
      description:
        'Founders entre pre-seed y Serie B, con producto real y sin tracción: escríbele a Daniel Forero. +US$600M levantados para clientes.',
      kicker: 'Asesoría y ejecución',
      standfirst: 'Escríbeme. Leo cada email yo mismo, y respondo los que traen suficiente información para responder.',
      helpsKicker: 'Lo que ayuda',
      helps: [
        'Qué hace la empresa y dónde opera.',
        'Qué está realmente trabado: crecimiento, operaciones con AI, posicionamiento, alianzas, levantamiento de capital.',
        'Qué has intentado ya.',
        'El plazo con el que estás trabajando.',
      ],
      mailSubject: 'Trabajar contigo',
      phrase: 'Si estás entre pre-seed y Serie B, con un producto real y sin tracción, escríbeme.',
      credential: '+US$600M levantados para clientes. Entre los equipos con los que he trabajado están Mysten Labs (Sui), Synthetix, Cudis, Nansen y RappiPay.',
      formTitle: 'Cuéntame de la empresa',
      stageLabel: 'Etapa',
      stages: [
        ['pre-seed', 'Pre-seed'],
        ['seed', 'Seed'],
        ['series-a', 'Serie A'],
        ['series-b', 'Serie B'],
        ['bootstrapped', 'Sin inversión, con ingresos'],
        ['established', 'Empresa establecida'],
        ['other', 'Otra'],
      ] as [string, string][],
      messageLabel: '¿Qué está trabado y qué has intentado?',
      messagePlaceholder: 'El producto, el mercado, dónde se frena la tracción, el plazo.',
      submit: 'Enviar',
      sentTitle: 'Recibido.',
      sentBody: 'Leo cada mensaje yo mismo y respondo los que traen suficiente información para responder. Si es urgente, agenda una llamada.',
      book: 'Agenda una llamada',
      orEmail: '¿Prefieres escribir por email?',
    },

    lead: {
      name: 'Nombre',
      email: 'Email',
      company: 'Empresa',
      website: 'Sitio web de la empresa',
      optional: '(opcional)',
      required: 'Este campo es obligatorio',
      invalidEmail: 'Revisa el email',
      errorGeneric: 'Algo no salió bien. Inténtalo de nuevo en un momento.',
      errorRateLimit: 'Demasiados intentos seguidos. Espera unos minutos y vuelve a intentarlo.',
    },

    grow: {
      title: 'Diagnóstico de crecimiento',
      seoTitle: 'Diagnóstico de crecimiento gratis para tu empresa',
      description:
        'Seis preguntas, dos minutos: dime qué frena el crecimiento de tu empresa y recibe una lectura de tres puntos con tus respuestas y el siguiente paso.',
      kicker: 'danielforeroj / crecer',
      introTitle: '¿Qué frena el crecimiento de tu empresa?',
      introBody:
        'Seis preguntas de opción múltiple, dos minutos. Al final recibes una lectura de tres puntos escrita con tus respuestas, y el siguiente paso.',
      points: [
        'Para dueños y líderes de empresas que ya venden.',
        '+US$600M levantados para clientes.',
        'Gratis y sin compromiso.',
      ],
      start: 'Empezar',
      next: 'Siguiente',
      back: 'Atrás',
      step: (n: number, total: number) => `Pregunta ${n} de ${total}`,
      pickOne: 'Elige una opción',
      pickMany: 'Elige una o más',
      contactTitle: '¿A nombre de quién va la lectura?',
      contactBody: 'Tu lectura sale en la siguiente pantalla. Con tu email te puedo escribir si veo algo más en tus respuestas.',
      submit: 'Ver mi lectura',
      resultKicker: 'Tu lectura',
      resultTitle: 'Lo que veo en tus respuestas',
      book: 'Agenda una llamada',
      bookNote: 'Una llamada conmigo, con tus respuestas ya leídas.',
      restart: 'Volver a empezar',
    },

    geo: {
      title: 'Escaneo GEO gratis',
      seoTitle: 'Escaneo GEO gratis: ¿te recomienda la IA?',
      description:
        'Le pregunté a la IA quién es el mejor en tu categoría: ¿sales tú? Escaneo gratis de 5 preguntas, sin cuenta ni tarjeta, informe en menos de 10 minutos.',
      kicker: 'danielforeroj / geo',
      introTitle: 'Le pregunté a la IA quién es el mejor en tu categoría. ¿Sales tú?',
      introBody:
        'Cada vez más compradores le piden a una IA que les recomiende a quién comprarle, y la respuesta nombra a tres o cuatro empresas. Este escaneo gratis te muestra si tú estás entre ellas.',
      points: [
        'Cinco preguntas reales de compradores de tu categoría, cada una hecha 10 veces a una IA con búsqueda web.',
        'El informe muestra qué empresas nombra y qué fuentes consulta, en un enlace que puedes compartir.',
        'Sin cuenta y sin tarjeta. Llega en menos de 10 minutos.',
      ],
      formTitle: 'Déjame tus datos y te llevo al escaneo',
      formBody:
        'El escaneo corre en unboundgeo.com, la herramienta que usamos con clientes. El sitio está en inglés, pero ahí eliges tu país y las preguntas pueden ir en español.',
      submit: 'Ir al escaneo gratis',
      sentTitle: 'Listo. Te llevo al escaneo.',
      manual: 'Si no se abre, entra aquí',
    },
  },
};

export type Ui = (typeof UI)['en'];

export const ui = (lang: Lang): Ui => UI[lang] as Ui;

export const useUi = (): Ui => ui(useLang());
