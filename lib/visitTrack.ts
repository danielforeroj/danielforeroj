// One visit, reported to the Unbound app (2026-11-20). The generic tracker under every gated
// page at /d/<slug>: the hub of a report room, the report itself, a slide deck and a video.
//
// No third-party analytics. The visit goes first party to the Unbound app, to one of:
//   unboundoperators.app/d/<linkSlug>/external-track                    (a document link, or a room's own page)
//   unboundoperators.app/d/<roomSlug>/doc/<documentId>/external-track   (one document of a room)
// Both take the body of the app's own document tracker plus the email the gate asked for,
// so the visit shows on the app's analytics exactly like a read of a shared document: who,
// when, device and place, the referring host, seconds per page, and a timeline.
//
// What a "page" is depends on the piece: the report and the hub are one scrolling page
// (mode stack, scroll marks at 25, 50, 75, 100); a deck is one page per slide (mode slide);
// a video is one page per 30 second segment (mode slide), with its playback as `media`
// events (play, pause, seek, ended, each with the second it happened at).
//
// Time is counted only while the tab is visible and the piece says it is active (a video
// counts only while it plays). It is flushed every 15 seconds, when the tab is hidden
// (fetch keepalive) and when the page is left (sendBeacon). Bodies go as text/plain: a
// simple request with no preflight, the only type sendBeacon can send cross-origin.

const APP = 'https://unboundoperators.app/d/';
const FLUSH_MS = 15_000;
const MARKS = [25, 50, 75, 100];

export const linkTrackUrl = (linkSlug: string) => `${APP}${encodeURIComponent(linkSlug)}/external-track`;
export const roomDocTrackUrl = (roomSlug: string, documentId: string) =>
  `${APP}${encodeURIComponent(roomSlug)}/doc/${encodeURIComponent(documentId)}/external-track`;

type EventType = 'open' | 'page' | 'scroll' | 'hidden' | 'visible' | 'media';
type Event = { seq: number; type: EventType; page?: number; seconds?: number | null; payload?: Record<string, unknown>; at_offset_ms: number };

export type MediaAction = 'play' | 'pause' | 'seek' | 'ended';

export type Visit = {
  /** The reader moved to another page (slide, segment). Records the seconds on the one left. */
  page: (n: number) => void;
  /** Count time only while true (a video while it plays). Starts true unless `startActive` is false. */
  setActive: (active: boolean) => void;
  /** The page count, once it is known (a video's length arrives after the player loads). */
  setPagesTotal: (n: number) => void;
  /** A video's playback, at the second it happened. */
  media: (action: MediaAction, at: number) => void;
  /** Scroll depth of a stack page, measured against this element. */
  measureScroll: () => void;
  stop: () => void;
};

export function startVisit(opts: {
  url: string;
  email: string;
  mode: 'stack' | 'slide';
  pagesTotal?: number;
  /** The ?r= attribution tag, as lib/ai/context.ts attribution() reads it. */
  src: string;
  referrer: string;
  /** Stack pages: the element the page is drawn in, for the scroll marks. */
  scrollTarget?: () => HTMLElement | null;
  startActive?: boolean;
}): Visit {
  const mock = import.meta.env.MODE === 'mock';
  const openedAt = Date.now();
  let sessionId: string | null = null;
  let seq = 0;
  let current = 1;
  let pagesTotal = opts.pagesTotal && opts.pagesTotal > 0 ? opts.pagesTotal : 0;
  const pending = new Map<number, number>(); // visible seconds per page, not yet sent
  let onCurrent = 0; // seconds on the current page since the reader arrived on it
  let active = opts.startActive !== false;
  let since: number | null = document.visibilityState === 'visible' && active ? Date.now() : null;
  let queue: Event[] = [];
  const reached = new Set<number>();
  let stopped = false;

  const ev = (e: Omit<Event, 'seq' | 'at_offset_ms'>) => queue.push({ ...e, seq: seq++, at_offset_ms: Date.now() - openedAt });

  const counting = () => !stopped && active && document.visibilityState === 'visible';

  const accrue = () => {
    if (since === null) return;
    const now = Date.now();
    const s = (now - since) / 1000;
    since = counting() ? now : null;
    pending.set(current, (pending.get(current) ?? 0) + s);
    onCurrent += s;
  };

  const restart = () => {
    accrue();
    since = counting() ? Date.now() : null;
  };

  const send = (body: Record<string, unknown>, beacon: boolean): Promise<void> => {
    const json = JSON.stringify({ email: opts.email, mode: opts.mode, ...(pagesTotal ? { pagesTotal } : {}), ...body });
    if (mock) {
      console.info('[visit-track] mock', opts.url, json);
      return Promise.resolve();
    }
    if (beacon && typeof navigator.sendBeacon === 'function') {
      try {
        if (navigator.sendBeacon(opts.url, new Blob([json], { type: 'text/plain' }))) return Promise.resolve();
      } catch {
        /* fall through to fetch */
      }
    }
    return fetch(opts.url, { method: 'POST', body: json, headers: { 'Content-Type': 'text/plain' }, keepalive: true, credentials: 'omit' })
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
    const pages: { page: number; seconds: number }[] = [];
    for (const [page, s] of pending) {
      const seconds = Math.round(s * 100) / 100;
      if (seconds >= 0.5) pages.push({ page, seconds });
    }
    // Without a visit id, events alone would open a second visit: they wait for the open.
    const events = sessionId ? queue : [];
    if (pages.length === 0 && events.length === 0) return;
    const body: Record<string, unknown> = { sessionId, events };
    if (pages.length) {
      body.pages = pages;
      for (const p of pages) pending.delete(p.page);
    }
    if (sessionId) queue = [];
    void send(body, beacon);
  };

  const measureScroll = () => {
    const el = opts.scrollTarget?.();
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.height <= 0) return;
    const pct = Math.round(Math.min(1, Math.max(0, (window.innerHeight - rect.top) / rect.height)) * 100);
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
      measureScroll();
    });
  };

  const onVisibility = () => {
    if (document.visibilityState === 'hidden') {
      accrue();
      since = null;
      ev({ type: 'hidden', page: current, seconds: Math.round(onCurrent * 100) / 100 });
      flush(false);
    } else {
      since = counting() ? Date.now() : null;
      ev({ type: 'visible', page: current });
    }
  };

  const onPageHide = () => flush(true);

  // The open: the app starts the visit and answers its id.
  const openEvents: Event[] = [
    {
      seq: seq++,
      type: 'open',
      payload: opts.src ? { mode: opts.mode, src: opts.src.replace(/[^A-Za-z0-9._-]/g, '').slice(0, 60) } : { mode: opts.mode },
      at_offset_ms: 0,
    },
    { seq: seq++, type: 'page', page: 1, seconds: null, at_offset_ms: 0 },
  ];
  void send({ ref: opts.referrer, events: openEvents }, false).then(() => {
    if (!stopped && opts.scrollTarget) measureScroll();
  });

  const timer = window.setInterval(() => {
    if (document.visibilityState === 'visible') flush(false);
  }, FLUSH_MS);
  if (opts.scrollTarget) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
  }
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('pagehide', onPageHide);

  return {
    page: (n: number) => {
      if (stopped || !Number.isInteger(n) || n < 1 || n === current) return;
      accrue();
      const from = current;
      const seconds = Math.round(onCurrent * 100) / 100;
      current = n;
      onCurrent = 0;
      since = counting() ? Date.now() : null;
      ev({ type: 'page', page: n, seconds, payload: { from } });
    },
    setActive: (next: boolean) => {
      if (stopped || next === active) return;
      accrue();
      active = next;
      since = counting() ? Date.now() : null;
    },
    setPagesTotal: (n: number) => {
      if (Number.isInteger(n) && n > 0) pagesTotal = n;
    },
    media: (action: MediaAction, at: number) => {
      if (stopped) return;
      restart();
      ev({ type: 'media', page: current, payload: { action, at: Math.max(0, Math.round(at)) } });
    },
    measureScroll,
    stop: () => {
      if (stopped) return;
      // Leaving the page inside the site (client-side navigation): send what is left.
      flush(true);
      stopped = true;
      since = null;
      window.clearInterval(timer);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', onPageHide);
      if (raf) window.cancelAnimationFrame(raf);
    },
  };
}
