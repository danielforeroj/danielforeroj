// Lead capture for the entry pages that are not the AI guide: /crecer (growth
// diagnostic), /geo (free GEO scan) and /work-w-me (founders).
//
// Why not /api/ai/identify: that endpoint validates the answers against the AI
// guide's own questionnaire (an unknown key is rejected), requires a business
// link and consent, and emails an access code for the resource library. None of
// that fits a lead that answered different questions or wants a GEO scan.
//
// So these pages post to the same backend's multi-site contact endpoint,
// unboundoperators.app/api/contact, with site "danielforeroj". It is the one
// that already lands site forms in the CRM: it stores the full submission
// (inbound_submissions), creates or reuses the contact and the lead relation
// (source_site danielforeroj, deduped by email), pings Telegram and emails the
// site's recipients. That endpoint has no field for attribution or for which
// page sent the lead, so both travel as a tagged header at the top of
// `message`, which the relation page shows under "What they sent":
//
//   [danielforeroj.com/crecer] diagnostico de crecimiento
//   r: ig-123
//   ...
//
// The attribution is read exactly as /ai reads it (lib/ai/context.ts
// attribution(): ?r=, then ?src=, then utm_source, kept for the visit).
//
// It is called cross-origin rather than through the /api/ai rewrite: the
// endpoint already allows https://danielforeroj.com by CORS, and a direct call
// keeps the visitor's own IP on the request, which is what its per-IP rate
// limit counts.

import { attribution, pushEvent } from './ai/context';
import type { Lang } from './i18n';

const ENDPOINT = 'https://unboundoperators.app/api/contact';

/** Daniel's intro call, the same booking page /virtual-coffee embeds. */
export const BOOKING_URL = 'https://unboundoperators.app/book/danielforeroj/intro-call';

/**
 * The free GEO scan: unboundgeo.com/intro is the page whose only action is the
 * scan dialog. unboundgeo.com does not read ?r=, so the attribution goes along
 * as utm_* (utm_content carries our r) for its analytics, and the lead itself
 * is recorded here before the visitor leaves.
 */
export function geoScanUrl(src: string): string {
  const q = new URLSearchParams({ utm_source: 'danielforeroj', utm_medium: 'referral', utm_campaign: 'geo-scan' });
  if (src) q.set('utm_content', src);
  return `https://unboundgeo.com/intro?${q.toString()}`;
}

/** Which entry page sent the lead. Also the tag at the top of the message. */
export type LeadPage = 'crecer' | 'geo' | 'work';

const TAG: Record<LeadPage, string> = {
  crecer: 'diagnostico de crecimiento',
  geo: 'escaneo GEO gratis',
  work: 'work with me',
};

export type LeadInput = {
  page: LeadPage;
  /** The path the visitor was on, e.g. /crecer or /en/grow. */
  path: string;
  lang: Lang;
  name: string;
  email: string;
  company?: string;
  website?: string;
  phone?: string;
  /** Body lines under the header: answers, the readout shown, a free-text message. */
  lines: string[];
  /** Honeypot. Must stay empty. */
  hp: string;
};

export type LeadResult = { ok: true } | { ok: false; status: number };

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function leadMessage(p: Pick<LeadInput, 'page' | 'path' | 'lang' | 'lines'>): string {
  const attr = attribution();
  const utm = Object.entries(attr.utm)
    .map(([k, v]) => `${k}=${v}`)
    .join(' ');
  const head = [
    `[danielforeroj.com${p.path}] ${TAG[p.page]}`,
    `r: ${attr.src || '(directo)'}`,
    `idioma: ${p.lang}`,
    utm ? `utm: ${utm}` : '',
    attr.referrer ? `referrer: ${attr.referrer}` : '',
  ].filter(Boolean);
  return [...head, '', ...p.lines].join('\n').slice(0, 5000);
}

export async function sendLead(p: LeadInput): Promise<LeadResult> {
  const body = {
    site: 'danielforeroj',
    name: p.name.trim(),
    email: p.email.trim(),
    company: p.company?.trim() || undefined,
    website: p.website?.trim() || undefined,
    phone: p.phone?.trim() || undefined,
    message: leadMessage(p),
    hp: p.hp,
  };
  if (import.meta.env.MODE === 'mock') {
    console.info('[lead] mock submit', body);
    return { ok: true };
  }
  try {
    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) return { ok: false, status: res.status };
    pushEvent({ event: 'lead_submit', page: p.page, lang: p.lang });
    return { ok: true };
  } catch {
    return { ok: false, status: 0 };
  }
}
