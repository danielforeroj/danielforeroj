// The reader a gate let in (2026-11-14, shared since 2026-11-27): the /d reports and the
// /kit pages ask for the same email and remember it the same way, so a reader who gave it on
// one is not asked again on the other within the 96 hours.

import { readStore, writeStore } from './ai/context';

const READER_KEY = 'dfj_reader';

// A reader who passed the gate is let back in without the form for 96 hours (Daniel,
// 2026-11-20), on every browser they used, with no limit on how many. The key is kept twice:
// in localStorage, and in a first-party cookie for the browsers that clear or block storage
// (in-app browsers, some private modes). Whichever is still there and in time lets them in.
// The 96 hours run from the moment they gave the email, never extended by a return visit.
const READER_TTL_MS = 96 * 60 * 60 * 1000;

export type Reader = { email: string; name: string };
type SavedReader = Reader & { at: string };

function parseReader(raw: string | null): SavedReader | null {
  if (!raw) return null;
  try {
    const r = JSON.parse(raw) as Partial<SavedReader>;
    if (typeof r.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(r.email)) return null;
    const at = typeof r.at === 'string' ? Date.parse(r.at) : NaN;
    if (!Number.isFinite(at) || Date.now() - at > READER_TTL_MS || at - Date.now() > 60_000) return null;
    return { email: r.email, name: typeof r.name === 'string' ? r.name : '', at: r.at as string };
  } catch {
    return null;
  }
}

function readCookie(): string | null {
  try {
    const m = document.cookie.match(new RegExp(`(?:^|; )${READER_KEY}=([^;]*)`));
    return m ? decodeURIComponent(m[1]) : null;
  } catch {
    return null;
  }
}

function writeCookie(value: string | null, maxAgeSeconds: number) {
  try {
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    document.cookie = `${READER_KEY}=${value === null ? '' : encodeURIComponent(value)}; Max-Age=${maxAgeSeconds}; Path=/; SameSite=Lax${secure}`;
  } catch {
    /* cookies unavailable */
  }
}

export function savedReader(): Reader | null {
  const r = parseReader(readStore(READER_KEY, 'local')) ?? parseReader(readCookie());
  if (!r) {
    forgetReader();
    return null;
  }
  return { email: r.email, name: r.name };
}

export function rememberReader(r: Reader) {
  const value = JSON.stringify({ ...r, at: new Date().toISOString() });
  writeStore(READER_KEY, value, 'local');
  writeCookie(value, READER_TTL_MS / 1000);
}

export function forgetReader() {
  try {
    window.localStorage.removeItem(READER_KEY);
  } catch {
    /* storage unavailable */
  }
  writeCookie(null, 0);
}
