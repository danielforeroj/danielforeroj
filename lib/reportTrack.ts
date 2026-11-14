// Visit tracking for a gated report (/d/<slug>, pages/ReportPage.tsx). 2026-11-14.
//
// No third-party analytics. The visit goes to the Unbound app, to the sales
// document whose share link is the report's trackSlug (data/reports.ts), through
// POST unboundoperators.app/d/<trackSlug>/external-track. That route takes the
// same body as the app's own document tracker plus the email the gate asked for,
// so the visit appears on that document's analytics exactly like a read of a
// shared document: who (the gated email), when, device and place, the referring
// host, visible seconds, and a timeline with open (and its ?r=), scroll marks at
// 25, 50, 75 and 100 percent, hidden and visible.
//
// Called cross-origin and directly, like lib/lead.ts, so the request carries the
// reader's own IP (rate limit, country and city) and an Origin header, which the
// route checks. Bodies go as text/plain: a simple request with no preflight, and
// the only type sendBeacon can send cross-origin without one.
//
// Time is counted only while the tab is visible. It is flushed every 15 seconds,
// when the tab is hidden (fetch keepalive) and when the page is left (sendBeacon).

const BASE = 'https://unboundoperators.app/d/';
const FLUSH_MS = 15_000;
const MARKS = [25, 50, 75, 100];

type Event = { seq: number; type: 'open' | 'page' | 'scroll' | 'hidden' | 'visible'; page?: number; seconds?: number | null; payload?: Record<string, unknown>; at_offset_ms: number };

export type ReportTracking = { stop: () => void; maxDepth: () => number };

export function startReportTracking(opts: {
  trackSlug: string;
  email: string;
  /** The ?r= attribution tag, as lib/ai/context.ts attribution() reads it. */
  src: string;
  referrer: string;
  /** The element the report is drawn in; scroll depth is measured against it. */
  target: () => HTMLElement | null;
}): ReportTracking {
  const url = `${BASE}${encodeURIComponent(opts.trackSlug)}/external-track`;
  const mock = import.meta.env.MODE === 'mock';
  const openedAt = Date.now();
  let sessionId: string | null = null;
  let seq = 0;
  let pending = 0; // visible seconds not yet sent
  let total = 0; // visible seconds this page view
  let visibleSince: number | null = document.visibilityState === 'visible' ? Date.now() : null;
  let queue: Event[] = [];
  const reached = new Set<number>();
  let depth = 0;
  let stopped = false;

  const ev = (e: Omit<Event, 'seq' | 'at_offset_ms'>) => queue.push({ ...e, seq: seq++, at_offset_ms: Date.now() - openedAt });

  const accrue = () => {
    if (visibleSince === null) return;
    const now = Date.now();
    const s = (now - visibleSince) / 1000;
    visibleSince = now;
    pending += s;
    total += s;
  };

  const send = (body: Record<string, unknown>, beacon: boolean): Promise<void> => {
    const json = JSON.stringify({ email: opts.email, pagesTotal: 1, ...body });
    if (mock) {
      console.info('[report-track] mock', json);
      return Promise.resolve();
    }
    if (beacon && typeof navigator.sendBeacon === 'function') {
      try {
        if (navigator.sendBeacon(url, new Blob([json], { type: 'text/plain' }))) return Promise.resolve();
      } catch {
        /* fall through to fetch */
      }
    }
    return fetch(url, { method: 'POST', body: json, headers: { 'Content-Type': 'text/plain' }, keepalive: true, credentials: 'omit' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { sessionId?: string | null } | null) => {
        // An idle gap (over 5 minutes hidden) makes the app open a new visit: carry its id.
        if (d && typeof d.sessionId === 'string' && d.sessionId) sessionId = d.sessionId;
      })
      .catch(() => {
        /* analytics only: a failed flush never touches the reader */
      });
  };

  const flush = (beacon = false) => {
    accrue();
    const seconds = Math.round(pending * 100) / 100;
    // Without a visit id, events alone would open a second visit: they wait for the open.
    const events = sessionId ? queue : [];
    if (seconds < 0.5 && events.length === 0) return;
    const body: Record<string, unknown> = { sessionId, events };
    if (seconds >= 0.5) {
      body.pages = [{ page: 1, seconds }];
      pending = 0;
    }
    if (sessionId) queue = [];
    void send(body, beacon);
  };

  const measure = () => {
    const el = opts.target();
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.height <= 0) return;
    const seen = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / rect.height));
    const pct = Math.round(seen * 100);
    if (pct > depth) depth = pct;
    for (const m of MARKS) {
      if (pct >= m && !reached.has(m)) {
        reached.add(m);
        ev({ type: 'scroll', payload: { percent: m } });
      }
    }
  };

  let raf = 0;
  const onScroll = () => {
    if (raf) return;
    raf = window.requestAnimationFrame(() => {
      raf = 0;
      measure();
    });
  };

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      accrue();
      visibleSince = null;
      ev({ type: 'hidden', page: 1, seconds: Math.round(total * 100) / 100 });
      flush(false);
    } else {
      visibleSince = Date.now();
      ev({ type: 'visible', page: 1 });
    }
  };

  const onPageHide = () => flush(true);

  // The open: the app starts the visit and answers its id.
  const openEvents: Event[] = [
    { seq: seq++, type: 'open', payload: opts.src ? { mode: 'stack', src: opts.src.replace(/[^A-Za-z0-9._-]/g, '').slice(0, 60) } : { mode: 'stack' }, at_offset_ms: 0 },
    { seq: seq++, type: 'page', page: 1, seconds: null, at_offset_ms: 0 },
  ];
  void send({ ref: opts.referrer, events: openEvents }, false).then(() => {
    if (!stopped) measure();
  });

  const timer = window.setInterval(() => {
    if (document.visibilityState === 'visible') flush(false);
  }, FLUSH_MS);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onPageHide);

  return {
    maxDepth: () => depth,
    stop: () => {
      if (stopped) return;
      stopped = true;
      window.clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      if (raf) window.cancelAnimationFrame(raf);
      // Leaving the page inside the app (client-side navigation): send what is left.
      flush(true);
    },
  };
}
