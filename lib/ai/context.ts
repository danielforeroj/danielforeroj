// Browser-side context for the funnel: language, attribution, the anonymous
// session id, and GTM events. Every storage access is guarded, because most
// visitors arrive in Instagram and TikTok in-app browsers where storage can be
// missing or throw, and the flow has to work anyway.

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { basePath, langOfPath, localePath } from '../i18n';
import type { Lang, Utm } from './types';

const isBrowser = typeof window !== 'undefined';

function store(kind: 'session' | 'local') {
  try {
    return kind === 'session' ? window.sessionStorage : window.localStorage;
  } catch {
    return null;
  }
}

export function readStore(key: string, kind: 'session' | 'local' = 'session'): string | null {
  try {
    return store(kind)?.getItem(key) ?? null;
  } catch {
    return null;
  }
}

export function writeStore(key: string, value: string, kind: 'session' | 'local' = 'session') {
  try {
    store(kind)?.setItem(key, value);
  } catch {
    /* storage unavailable, state stays in memory */
  }
}

/**
 * Links posted before the funnel had an English URL carry ?lang=en or ?lang=es.
 * The language is the URL now (/ai is Spanish, /en/ai English), so such a link
 * is moved to the URL it means, with every other parameter (r, utm_*) kept.
 * A ?lang= that already matches the page is left alone.
 */
export function useLegacyLangParam() {
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const wanted = params.get('lang');
    if ((wanted !== 'es' && wanted !== 'en') || wanted === langOfPath(location.pathname)) return;
    params.delete('lang');
    const query = params.toString();
    navigate(`${localePath(basePath(location.pathname), wanted)}${query ? `?${query}` : ''}${location.hash}`, {
      replace: true,
    });
  }, [location, navigate]);
}

const SESSION_KEY = 'dfj_ai_session';

function uuid(): string {
  try {
    if (crypto?.randomUUID) return crypto.randomUUID();
  } catch {
    /* fall through */
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export function sessionId(): string {
  const existing = readStore(SESSION_KEY);
  if (existing) return existing;
  const id = uuid();
  writeStore(SESSION_KEY, id);
  return id;
}

const ATTR_KEY = 'dfj_ai_attr';

export type Attribution = { src: string; utm: Utm; referrer: string };

/**
 * Captured once, on the first page of the visit, so moving from /ai to
 * /ai/recursos does not overwrite where the visitor actually came from.
 */
export function attribution(): Attribution {
  const saved = readStore(ATTR_KEY);
  if (saved) {
    try {
      return JSON.parse(saved) as Attribution;
    } catch {
      /* re-derive */
    }
  }
  if (!isBrowser) return { src: '', utm: {}, referrer: '' };
  const p = new URLSearchParams(window.location.search);
  const utm: Utm = {};
  (['source', 'medium', 'campaign', 'content', 'term'] as const).forEach((k) => {
    const v = p.get(`utm_${k}`);
    if (v) utm[k] = v.slice(0, 200);
  });
  const attr: Attribution = {
    // `r` first, because that is what the links hand out now: the visitor sees this in
    // their address bar, and `r=df` reads like any other parameter while `src=manual-daniel`
    // announces that they are being tracked by name. `src` still works, so every link
    // already posted keeps counting.
    src: (p.get('r') || p.get('src') || utm.source || '').slice(0, 60),
    utm,
    referrer: (document.referrer || '').slice(0, 500),
  };
  writeStore(ATTR_KEY, JSON.stringify(attr));
  return attr;
}

type DataLayerEvent =
  | { event: 'ai_funnel_step'; step: string; step_index: number; lang: Lang }
  | { event: 'ai_funnel_identify'; lang: Lang }
  | { event: 'ai_funnel_verified'; lang: Lang }
  | { event: 'ai_resource_open'; resource_key: string; lang: Lang }
  | { event: 'lead_submit'; page: 'crecer' | 'geo' | 'work'; lang: Lang };

export function pushEvent(e: DataLayerEvent) {
  if (!isBrowser) return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push(e);
}

/**
 * Keeps <html lang> on the language being read. Layout already sets it from the
 * URL on every navigation; this is for the reader, where a resource can be in a
 * different language from the page around it.
 */
export function useHtmlLang(lang: Lang) {
  React.useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
}

export const prefersReducedMotion = () =>
  isBrowser && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
