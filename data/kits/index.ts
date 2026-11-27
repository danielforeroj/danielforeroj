// The kits the faceless videos promise (2026-11-27). See types.ts for what a kit is.
//
// This registry is what the prerender and the /kit index know about a kit: its word,
// its languages, its title and one line. The kit itself (sections and blocks) lives in
// data/kits/<slug>.ts and is a separate chunk, loaded in the browser only on its own
// page, so no other page of the site carries it.
//
// A kit is published when its file exists: getStaticPaths and the index list only the
// slugs whose file is in this folder. So a kit in this list without a file yet is
// simply not online.
//
// URLs: a Spanish kit at /kit/<slug>, an English one at /en/kit/<slug> (/kit is a
// Spanish-first path, like /ai). A kit in one language only redirects its other URL
// to the one it has (vercel.json), so a typed danielforeroj.com/kit/deck still lands.

import type { Lang } from '../../lib/i18n';
import type { Kit } from './types';

export type KitEntry = {
  word: string;
  slug: string;
  /** The kit's name in each language it exists in, as the videos say it, and one line on what it gives. */
  title: Partial<Record<Lang, string>>;
  line: Partial<Record<Lang, string>>;
  /** The day its first video goes out on Instagram (Bogota), for the index order. */
  firstVideo: string;
  /**
   * The app's document link for this kit's visits, if one exists (lib/visitTrack.ts,
   * like /d reports). Without it the kit records the lead on unlock and nothing else.
   */
  trackSlug?: string;
};

export const KITS: KitEntry[] = [
  {
    word: 'MEDIR',
    slug: 'medir',
    title: { es: 'El kit para poner la IA a producir plata' },
    line: { es: 'Para que en 30 días sepa si su IA se paga sola, y qué apagar si no.' },
    firstVideo: '2026-11-27',
  },
  {
    word: 'DECK',
    slug: 'deck',
    title: { en: 'The deck and narrative kit' },
    line: { en: 'So your next deck shows a channel investors can check and a story press can cover.' },
    firstVideo: '2026-11-27',
  },
  {
    word: 'FOCO',
    slug: 'foco',
    title: { es: 'El kit de foco y equipo' },
    line: { es: 'Para que no mate una buena idea por falta de volumen y cada reunión termine en algo medible.' },
    firstVideo: '2026-11-27',
  },
  {
    word: 'RAISE',
    slug: 'raise',
    title: { en: 'The fundraising kit' },
    line: { en: 'So you know demand from interest, spot debt dressed as equity, and tie equity to the work.' },
    firstVideo: '2026-11-28',
  },
  {
    word: 'VENTAS',
    slug: 'ventas',
    title: { es: 'El kit de ventas y seguimiento' },
    line: { es: 'Para que cada evento le deje reuniones y vea hoy dónde se le caen las ventas.' },
    firstVideo: '2026-11-28',
  },
  {
    word: 'CONTROL',
    slug: 'control',
    title: { es: 'El kit de control para su IA', en: 'The AI control kit' },
    line: {
      es: 'Para que cada cosa que haga su IA tenga un responsable y ninguna cifra inventada llegue a un cliente.',
      en: 'So you know how often your system is right, what it may touch, and what each task costs.',
    },
    firstVideo: '2026-11-29',
  },
  {
    word: 'MARCA',
    slug: 'marca',
    title: { es: 'El kit de marca y contenido' },
    line: { es: 'Para que cualquier cliente la entienda en la primera lectura y cada pieza le hable a quien le compra.' },
    firstVideo: '2026-11-29',
  },
  {
    word: 'PIPELINE',
    slug: 'pipeline',
    title: { en: 'The pipeline kit' },
    line: { en: 'So conferences turn into meetings and a first contract turns into the real purchase.' },
    firstVideo: '2026-12-03',
  },
  {
    word: 'FOCUS',
    slug: 'focus',
    title: { en: 'The founder focus kit' },
    line: { en: 'So you prove demand before you burn runway building a platform.' },
    firstVideo: '2026-12-10',
  },
];

// Every kit file in this folder, loaded on demand. The keys are known at build time
// without loading anything, which is how a kit counts as published.
const FILES = import.meta.glob<{ default: Kit }>(['./*.ts', '!./index.ts', '!./types.ts']);

const fileOf = (slug: string) => `./${slug}.ts`;

/** The kits that are online: in the registry and with their file written. */
export const publishedKits = (): KitEntry[] => KITS.filter((k) => fileOf(k.slug) in FILES);

/** The kit entry for a URL slug in a language, if it is online in that language. */
export function kitEntry(slug: string | undefined, lang: Lang): KitEntry | undefined {
  const k = publishedKits().find((x) => x.slug === slug);
  return k && k.title[lang] ? k : undefined;
}

export function loadKit(slug: string): Promise<Kit> | null {
  const f = FILES[fileOf(slug)];
  return f ? f().then((m) => m.default) : null;
}

/** /kit/<slug> for Spanish, /en/kit/<slug> for English. */
export const kitPath = (slug: string, lang: Lang) => (lang === 'es' ? `/kit/${slug}` : `/en/kit/${slug}`);

/**
 * What the link's r says (2026-11-27). unbound-os hands out one link per word, not per
 * video: <net>-fd-<word> (ig-fd-medir, yt-fd-deck), because its comment flows cannot read
 * the post they run under; the app tells the videos apart from the comment thread it
 * answered. A per video form, <net>-fd-<video> (ig-fd-es01), is read too, should a
 * caption or a manual reply carry one. net is ig | tk | yt | fb | li | x.
 */
export function parseKitRef(r: string): { net: string; video: string | null; word: string | null } | null {
  const m = /^(ig|tk|yt|fb|li|x)-fd-([a-z0-9-]+)$/i.exec(r.trim());
  if (!m) return null;
  const net = m[1].toLowerCase();
  const rest = m[2].toLowerCase();
  const v = /^(es|en)-?(\d{1,3})$/.exec(rest);
  if (v) return { net, video: `${v[1]}-${v[2].padStart(2, '0')}`, word: null };
  return { net, video: null, word: rest.toUpperCase() };
}
