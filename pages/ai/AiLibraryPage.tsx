import React from 'react';
import { NavLink } from 'react-router-dom';
import Seo from '../../lib/SeoHead';
import { SITE } from '../../data/siteConfig';
import { aiApi, errorMessage } from '../../lib/ai/api';
import { detectLang, rememberLang } from '../../lib/ai/context';
import { copyFor, resourceTypeLabel } from '../../lib/ai/copy';
import { CodeStep } from '../../components/ai/CodeStep';
import type { Lang, Me, Offer } from '../../lib/ai/types';

type View =
  | { kind: 'loading' }
  | { kind: 'library'; me: Me }
  | { kind: 'login' }
  | { kind: 'code'; email: string }
  | { kind: 'error' };

const AiLibraryPage: React.FC = () => {
  const [lang, setLang] = React.useState<Lang>('es');
  const [view, setView] = React.useState<View>({ kind: 'loading' });
  const copy = copyFor(lang);

  // The page language is always sent, so offers and resource cards come back in
  // the language the visitor is reading, not the one stored on the lead.
  const load = React.useCallback(async (l: Lang, quiet = false) => {
    if (!quiet) setView({ kind: 'loading' });
    const r = await aiApi.me(l);
    if (r.ok) setView({ kind: 'library', me: r.data });
    else setView(r.status === 401 ? { kind: 'login' } : { kind: 'error' });
  }, []);

  React.useEffect(() => {
    const l = detectLang();
    setLang(l);
    load(l);
  }, [load]);

  const switchLang = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
    rememberLang(next);
    if (view.kind === 'library') load(next, true);
  };

  return (
    <section className="aif aif--page">
      <Seo title={`${copy.libraryKicker} | ${SITE.name}`} description={copy.loginBody} path="/ai/recursos" noIndex />

      <div className="aif-bar aif-bar--page">
        <span className="aif-kicker">{copy.libraryKicker}</span>
        <span className="aif-bar__end">
          <button type="button" className="aif-link" onClick={switchLang} lang={lang === 'es' ? 'en' : 'es'}>
            {copy.langSwitch}
          </button>
          {view.kind === 'library' ? (
            <button
              type="button"
              className="aif-link"
              onClick={async () => {
                await aiApi.logout();
                setView({ kind: 'login' });
              }}
            >
              {copy.signOut}
            </button>
          ) : null}
        </span>
      </div>

      {view.kind === 'loading' ? <p className="aif-meta aif-pad">{copy.loading}</p> : null}

      {view.kind === 'error' ? (
        <div className="aif-panel">
          <p className="aif-error" role="alert">
            {copy.errorGeneric}
          </p>
          <button type="button" className="aif-btn" onClick={() => load(lang)}>
            {copy.retry}
          </button>
        </div>
      ) : null}

      {view.kind === 'login' ? <LoginForm lang={lang} onSent={(email) => setView({ kind: 'code', email })} /> : null}

      {view.kind === 'code' ? (
        <div className="aif-panel">
          <CodeStep
            lang={lang}
            copy={copy}
            email={view.email}
            title={copy.loginTitle}
            body={copy.loginSent}
            cta={copy.confirm}
            resendLabel={copy.resend}
            resendAfter={45}
            onResend={async () => {
              const r = await aiApi.login({ email: view.email, lang });
              return r.ok ? { ok: true } : { ok: false, message: errorMessage(r, { generic: copy.errorGeneric, rateLimit: copy.errorRateLimit }) };
            }}
            onChangeEmail={() => setView({ kind: 'login' })}
            onVerified={() => load(lang)}
          />
        </div>
      ) : null}

      {view.kind === 'library' ? <Library me={view.me} lang={lang} /> : null}
    </section>
  );
};

function LoginForm({ lang, onSent }: { lang: Lang; onSent: (email: string) => void }) {
  const copy = copyFor(lang);
  const [email, setEmail] = React.useState('');
  const [error, setError] = React.useState('');
  const [busy, setBusy] = React.useState(false);

  return (
    <div className="aif-panel">
      <form
        className="aif-step"
        noValidate
        onSubmit={async (e) => {
          e.preventDefault();
          const value = email.trim();
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            setError(copy.invalidEmail);
            return;
          }
          setBusy(true);
          setError('');
          const r = await aiApi.login({ email: value, lang });
          setBusy(false);
          // /login answers ok whether or not the email exists, so this never reveals an account.
          if (r.ok) onSent(value);
          else setError(errorMessage(r, { generic: copy.errorGeneric, rateLimit: copy.errorRateLimit }));
        }}
      >
        <h1 className="aif-title">{copy.loginTitle}</h1>
        <p className="aif-body">{copy.loginBody}</p>
        <div className="aif-fields">
          <div className="aif-field">
            <label htmlFor="aif-login-email">{copy.loginEmail}</label>
            <input
              id="aif-login-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={email}
              aria-invalid={error ? true : undefined}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        {error ? (
          <p className="aif-error" role="alert">
            {error}
          </p>
        ) : null}
        <div className="aif-actions">
          <button type="submit" className="aif-btn" disabled={busy}>
            {copy.loginCta}
          </button>
        </div>
        <p className="aif-meta">
          {copy.noAccessYet}{' '}
          <NavLink to={`/ai?lang=${lang}`} className="aif-link">
            {copy.startFunnel} →
          </NavLink>
        </p>
      </form>
    </div>
  );
}

function OfferCard({ offer }: { offer: Offer }) {
  return (
    <div className={`aif-offer aif-offer--${offer.placement}`}>
      <p className="aif-offer__title">{offer.title}</p>
      {offer.body ? <p className="aif-offer__body">{offer.body}</p> : null}
      {/* Same tab: in-app browsers handle new tabs badly. */}
      <a className={offer.placement === 'primary' ? 'aif-btn' : 'aif-btn aif-btn--o'} href={offer.cta_url}>
        {offer.cta_label}
      </a>
    </div>
  );
}

function Library({ me, lang }: { me: Me; lang: Lang }) {
  const copy = copyFor(lang);
  const primary = me.tier_offers.filter((o) => o.placement === 'primary');
  const secondary = me.tier_offers.filter((o) => o.placement === 'secondary');

  return (
    <div className="aif-library">
      <header className="aif-library__head">
        <h1 className="aif-title">{copy.libraryTitle(me.name)}</h1>
        <p className="aif-body">{copy.librarySub(me.company)}</p>
      </header>

      {primary.length ? (
        <div className="aif-offers">
          {primary.map((o) => (
            <OfferCard key={o.key} offer={o} />
          ))}
        </div>
      ) : null}

      {me.resources.length ? (
        <ul className="aif-resources">
          {me.resources.map((r) => (
            <li key={r.key}>
              <NavLink to={`/ai/recursos/${encodeURIComponent(r.key)}?lang=${lang}`} className="aif-resource">
                <span className="aif-resource__type">{resourceTypeLabel(r.type, lang)}</span>
                <span className="aif-resource__title">
                  {r.title}
                  {r.summary ? <small>{r.summary}</small> : null}
                </span>
                <span className="aif-resource__go">{copy.open} →</span>
              </NavLink>
            </li>
          ))}
        </ul>
      ) : (
        <p className="aif-body">{copy.libraryEmpty}</p>
      )}

      {secondary.length ? (
        <div className="aif-offers aif-offers--secondary">
          {secondary.map((o) => (
            <OfferCard key={o.key} offer={o} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default AiLibraryPage;
