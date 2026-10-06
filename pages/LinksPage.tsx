import React from 'react';
import { SITE, CAPACITY } from '../data/siteConfig';
import Seo from '../lib/SeoHead';
import { localePath, useLang, useUi } from '../lib/i18n';
import { pushEvent } from '../lib/ai/context';
import { BOOKING_URL } from '../lib/lead';

// The link in the Instagram and TikTok bio (studio change v2, approved
// 2026-10-05): one page with the four entry pages, so the pillars that are not
// the AI guide (P1, P3, P4, P5, P6) get a clickable link instead of a URL
// written in the caption. Spanish first (/links), English at /en/links.
//
// Each entry is the existing entry page, which already records the lead in the
// Unbound app: /ai through /api/ai (the guide funnel), /geo, /crecer and
// /work-w-me through unboundoperators.app/api/contact (lib/lead.ts). This page
// stores nothing itself.
//
// Attribution. The bio URL is /links?r=ig (or ?r=tk). The page hands each
// entry r=<incoming r>-bio, so a lead shows "r: ig-bio" and is told apart from
// a lead that came from a URL written in a caption ("r: ig-<piece>"). Without
// r it hands out r=links. The page does not call attribution(), because that
// would save the incoming r for the session and the entry page would keep it
// instead of the -bio one. Each click is pushed to the dataLayer as
// links_click with the entry and the r.
//
// noindex: a link hub is a thin page, and the entries are indexed themselves.

type EntryKey = 'guia' | 'geo' | 'crecer' | 'trabajar';

const ENTRIES: EntryKey[] = ['guia', 'geo', 'crecer', 'trabajar'];

const PATH: Record<EntryKey, string> = {
  guia: '/ai',
  geo: '/geo',
  crecer: '/crecer',
  trabajar: '/work-w-me',
};

/** r for the entry pages: the incoming r (sanitized) plus -bio, or "links". */
export function outgoingR(search: string): string {
  let r = '';
  try {
    const p = new URLSearchParams(search);
    r = (p.get('r') || p.get('src') || '').toLowerCase().replace(/[^a-z0-9-]/g, '').slice(0, 50);
  } catch {
    r = '';
  }
  return r ? `${r}-bio` : 'links';
}

const LinksPage: React.FC = () => {
  const lang = useLang();
  const t = useUi().links;
  // Prerendered with r=links; the real r is read after hydration.
  const [r, setR] = React.useState('links');

  React.useEffect(() => {
    if (typeof window !== 'undefined') setR(outgoingR(window.location.search));
  }, []);

  const href = (k: EntryKey) => `${localePath(PATH[k], lang)}?r=${encodeURIComponent(r)}`;
  const bookHref = `${BOOKING_URL}?${new URLSearchParams({ utm_source: 'danielforeroj', utm_medium: 'links', utm_content: r })}`;
  const capacity = typeof CAPACITY.weeklySpots === 'number' && CAPACITY.weeklySpots > 0 ? t.capacity.replace('{n}', String(CAPACITY.weeklySpots)) : '';

  return (
    <section className="aif">
      <Seo title={`${t.title} | ${SITE.name}`} description={t.description} path={localePath('/links', lang)} noIndex />
      <div className="aif-panel">
        <div className="aif-step">
          <p className="aif-kicker">{t.kicker}</p>
          <h1 className="aif-title">{t.heading}</h1>
          <p className="aif-body">{t.standfirst}</p>

          <div className="aif-offers">
            {ENTRIES.map((k, i) => {
              const e = t.entries[k];
              return (
                <div key={k} className={i === 0 ? 'aif-offer' : 'aif-offer aif-offer--secondary'} data-entry={k}>
                  <p className="aif-offer__title">{e.title}</p>
                  <p className="aif-offer__body">{e.body}</p>
                  {capacity && (k === 'crecer' || k === 'geo') ? <p className="aif-meta">{capacity}</p> : null}
                  {/* Same tab: in-app browsers handle new tabs badly. */}
                  <a
                    className={i === 0 ? 'aif-btn' : 'aif-btn aif-btn--o'}
                    href={href(k)}
                    onClick={() => pushEvent({ event: 'links_click', entry: k, r, lang })}
                  >
                    {e.cta}
                  </a>
                  {k === 'trabajar' ? (
                    <a
                      className="aif-link"
                      href={bookHref}
                      onClick={() => pushEvent({ event: 'links_click', entry: 'book', r, lang })}
                    >
                      {t.book}
                    </a>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LinksPage;
