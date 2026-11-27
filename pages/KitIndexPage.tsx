import React from 'react';
import Seo from '../lib/SeoHead';
import { SITE } from '../data/siteConfig';
import { useLang, type Lang } from '../lib/i18n';
import { pushEvent } from '../lib/ai/context';
import { kitPath, publishedKits, type KitEntry } from '../data/kits';
import { outgoingR } from './LinksPage';

// Every kit the faceless videos promise, in one list (2026-11-27): /kit (Spanish) and
// /en/kit (English). Where a TikTok or YouTube comment is answered with a typed URL,
// and where the bio sends someone who saw the video but did not comment. Each kit
// shows in its own language, the page's language first. The r it was opened with goes
// along as <r>-bio, like /links, so the kit's lead says where it came from.

const UI = {
  es: {
    kicker: 'danielforeroj / kits',
    title: 'Los kits de los videos',
    body: 'Cada video cierra con una palabra. Esta es la lista completa: abra el que le prometió el video.',
    word: 'Palabra',
    open: 'Abrir el kit',
    other: 'In English',
    description: 'Los kits que prometen los videos de Daniel Forero: plantillas, hojas y pasos para usar esta semana.',
  },
  en: {
    kicker: 'danielforeroj / kits',
    title: 'The kits from the videos',
    body: 'Every video closes with a word. This is the full list: open the one the video promised you.',
    word: 'Word',
    open: 'Open the kit',
    other: 'En español',
    description: "The kits Daniel Forero's videos promise: templates, sheets and steps to use this week.",
  },
};

const KitIndexPage: React.FC = () => {
  const lang = useLang();
  const t = UI[lang];
  const [r, setR] = React.useState('kits');
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const o = outgoingR(window.location.search);
      setR(o === 'links' ? 'kits' : o);
    }
  }, []);

  const kits = publishedKits();
  const rows: { k: KitEntry; l: Lang }[] = [
    ...kits.filter((k) => k.title[lang]).map((k) => ({ k, l: lang })),
    ...kits.filter((k) => k.title[lang === 'es' ? 'en' : 'es']).map((k) => ({ k, l: (lang === 'es' ? 'en' : 'es') as Lang })),
  ];

  return (
    <section className="aif kit">
      <Seo title={`${t.title} | ${SITE.name}`} description={t.description} path={lang === 'es' ? '/kit' : '/en/kit'} noIndex />
      <div className="aif-panel">
        <div className="aif-step">
          <p className="aif-kicker">{t.kicker}</p>
          <h1 className="aif-title">{t.title}</h1>
          <p className="aif-body">{t.body}</p>
          <ul className="kit-list">
            {rows.map(({ k, l }, i) => {
              const firstOther = l !== lang && (i === 0 || rows[i - 1].l === lang);
              return (
                <React.Fragment key={`${k.slug}-${l}`}>
                  {firstOther ? <li className="aif-kicker kit-list__sep">{t.other}</li> : null}
                  <li>
                    <a
                      className="kit-list__item"
                      href={`${kitPath(k.slug, l)}?r=${encodeURIComponent(r)}`}
                      onClick={() => pushEvent({ event: 'links_click', entry: `kit-${k.slug}-${l}`, r, lang })}
                    >
                      <span className="kit-list__word">{k.word}</span>
                      <span className="kit-list__title">{k.title[l]}</span>
                      <span className="kit-list__line">{k.line[l]}</span>
                    </a>
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KitIndexPage;
