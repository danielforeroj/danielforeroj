// Client for /api/ai/*. In production the path is proxied to unboundoperators.app
// by vercel.json, so every call and the dfj_ai cookie stay first-party. The site
// never reads the cookie; GET /me is the only way it learns who is signed in.
//
// `vite --mode mock` (npm run dev:mock) swaps in an in-memory backend shaped
// exactly like the spec, for building before the real API is deployed.

import type { Answers, Contact, FunnelConfig, Lang, Me, ResourceView, Utm } from './types';

export type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; error: string; field?: string };

const MOCK = import.meta.env.MODE === 'mock';

async function call<T>(method: 'GET' | 'POST', path: string, body?: unknown, keepalive = false): Promise<ApiResult<T>> {
  if (MOCK) {
    const { mockApi } = await import('./mock');
    return mockApi<T>(method, path, body);
  }
  try {
    const res = await fetch(`/api/ai${path}`, {
      method,
      credentials: 'same-origin',
      keepalive,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    let json: Record<string, unknown> = {};
    try {
      json = await res.json();
    } catch {
      /* empty or non JSON body */
    }
    if (!res.ok || typeof json.error === 'string') {
      return {
        ok: false,
        status: res.ok ? 400 : res.status,
        error: typeof json.error === 'string' ? json.error : '',
        field: typeof json.field === 'string' ? json.field : undefined,
      };
    }
    return { ok: true, data: json as T };
  } catch {
    return { ok: false, status: 0, error: 'network' };
  }
}

/**
 * What to show for a failed call. The API's `error` is already a localized,
 * ready-to-show sentence in the language that was sent, so it wins; the site's
 * own copy only covers a network failure or an empty body.
 */
export function errorMessage(r: { status: number; error: string }, fallback: { generic: string; rateLimit: string }) {
  if (r.error && r.error !== 'network') return r.error;
  return r.status === 429 ? fallback.rateLimit : fallback.generic;
}

type Attr = { src: string; utm: Utm };

export const aiApi = {
  funnel: () => call<FunnelConfig>('GET', '/funnel'),

  progress: (p: Attr & { sessionId: string; step: string; lang: Lang; referrer: string }) =>
    call<{ ok: true }>('POST', '/progress', p, true),

  identify: (p: Attr & { sessionId: string; lang: Lang; answers: Answers; contact: Contact; hp: string }) =>
    call<{ ok: true }>('POST', '/identify', p),

  verify: (p: { email: string; code: string; lang: Lang }) => call<{ ok: true }>('POST', '/verify', p),

  login: (p: { email: string; lang: Lang }) => call<{ ok: true }>('POST', '/login', p),

  /** lang picks the language of offers and resource cards; without it the server uses the lead's stored one. */
  me: (lang: Lang) => call<Me>('GET', `/me?lang=${lang}`),

  resource: (key: string, lang: Lang) =>
    call<ResourceView>('GET', `/resources/${encodeURIComponent(key)}?lang=${lang}`),

  track: (p: { key: string; seconds: number; lang: Lang }) => call<{ ok: true }>('POST', '/track', p, true),

  logout: () => call<{ ok: true }>('POST', '/logout'),
};
