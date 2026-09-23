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

const isAiPath = (base: string) => base === '/ai' || base.startsWith('/ai/');

/** The language a page's unprefixed URL is in. */
export const nativeLang = (base: string): Lang => (isAiPath(base) ? 'es' : 'en');

const PREFIX = /^\/(en|es)(?=\/|$)/;

/** The language a pathname is in: its prefix if it has one, otherwise the page's native language. */
export function langOfPath(pathname: string): Lang {
  const m = pathname.match(PREFIX);
  return m ? (m[1] as Lang) : nativeLang(pathname);
}

/** The pathname with any language prefix removed. "/es" -> "/", "/en/ai" -> "/ai". */
export function basePath(pathname: string): string {
  const stripped = pathname.replace(PREFIX, '');
  return stripped === '' ? '/' : stripped;
}

/** The URL of a page (given by its unprefixed path) in a language. */
export function localePath(base: string, lang: Lang): string {
  if (lang === nativeLang(base)) return base;
  return `/${lang}${base === '/' ? '' : base}`;
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
        'Write to Daniel Forero about AI operations, growth, positioning, partnerships, or the operating plan behind a company at the frontier.',
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
        'Escríbele a Daniel Forero sobre operaciones con AI, crecimiento, posicionamiento, alianzas o el plan operativo de una empresa en la frontera.',
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
    },
  },
};

export type Ui = (typeof UI)['en'];

export const ui = (lang: Lang): Ui => UI[lang] as Ui;

export const useUi = (): Ui => ui(useLang());
