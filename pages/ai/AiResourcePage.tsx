import React from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import Seo from '../../lib/SeoHead';
import { SITE } from '../../data/siteConfig';
import { aiApi } from '../../lib/ai/api';
import { detectLang, pushEvent } from '../../lib/ai/context';
import { copyFor } from '../../lib/ai/copy';
import { Blocks } from '../../components/ai/Blocks';
import type { Lang, ResourceView } from '../../lib/ai/types';

/** Placeholder segment the page is prerendered under; vercel.json rewrites every key to it. */
export const RESOURCE_SHELL_KEY = '_';

type State = { kind: 'loading' } | { kind: 'ready'; resource: ResourceView } | { kind: 'missing' } | { kind: 'error' };

const AiResourcePage: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [lang, setLang] = React.useState<Lang>('es');
  const [state, setState] = React.useState<State>({ kind: 'loading' });
  const copy = copyFor(lang);
  const key = params.key && params.key !== RESOURCE_SHELL_KEY ? params.key : '';

  const load = React.useCallback(
    async (l: Lang) => {
      if (!key) return;
      setState({ kind: 'loading' });
      const r = await aiApi.resource(key, l);
      if (r.ok) {
        setState({ kind: 'ready', resource: r.data });
        pushEvent({ event: 'ai_resource_open', resource_key: key, lang: l });
      } else if (r.status === 401) {
        navigate(`/ai/recursos?lang=${l}`, { replace: true });
      } else setState(r.status === 404 ? { kind: 'missing' } : { kind: 'error' });
    },
    [key, navigate],
  );

  React.useEffect(() => {
    const l = detectLang();
    setLang(l);
    load(l);
  }, [load]);

  // Reading time: counted only while the tab is visible, sent when it is hidden
  // or left. keepalive lets the request outlive the page.
  React.useEffect(() => {
    if (state.kind !== 'ready') return;
    let startedAt = document.visibilityState === 'visible' ? Date.now() : 0;
    const flush = () => {
      if (!startedAt) return;
      const seconds = Math.round((Date.now() - startedAt) / 1000);
      startedAt = 0;
      if (seconds >= 1) aiApi.track({ key: state.resource.key, seconds, lang });
    };
    const onVisibility = () => {
      if (document.visibilityState === 'hidden') flush();
      else startedAt = Date.now();
    };
    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flush);
    return () => {
      flush();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
    };
  }, [state, lang]);

  const title = state.kind === 'ready' ? state.resource.title : copy.libraryKicker;

  return (
    <section className="aif aif--page">
      <Seo title={`${title} | ${SITE.name}`} description={copy.readerLoading} path="/ai/recursos" noIndex />

      <div className="aif-bar aif-bar--page">
        <NavLink to={`/ai/recursos?lang=${lang}`} className="aif-link">
          ← {copy.backToLibrary}
        </NavLink>
      </div>

      {state.kind === 'loading' ? <p className="aif-meta aif-pad">{copy.readerLoading}</p> : null}

      {state.kind === 'missing' ? (
        <div className="aif-panel">
          <p className="aif-body">{copy.notAvailable}</p>
        </div>
      ) : null}

      {state.kind === 'error' ? (
        <div className="aif-panel">
          <p className="aif-error" role="alert">
            {copy.errorGeneric}
          </p>
          <button type="button" className="aif-btn" onClick={() => load(lang)}>
            {copy.retry}
          </button>
        </div>
      ) : null}

      {state.kind === 'ready' ? (
        <article className="aif-reader" lang={state.resource.language}>
          <header className="aif-reader__head">
            <h1 className="aif-title">{state.resource.title}</h1>
            {state.resource.summary ? <p className="aif-body">{state.resource.summary}</p> : null}
          </header>
          <Blocks blocks={state.resource.blocks} resourceKey={state.resource.key} copy={copy} lang={state.resource.language} />
        </article>
      ) : null}
    </section>
  );
};

export default AiResourcePage;
