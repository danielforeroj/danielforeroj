import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Seo from '../../lib/SeoHead';
import { useHeadSync } from '../../lib/ai/useHeadSync';
import { SITE } from '../../data/siteConfig';
import { aiApi, errorMessage } from '../../lib/ai/api';
import { buildSteps, isAnswered, looksPersonal, evaluate, type Step } from '../../lib/ai/funnel';
import { attribution, detectLang, prefersReducedMotion, pushEvent, rememberLang, sessionId , useHtmlLang } from '../../lib/ai/context';
import { copyFor } from '../../lib/ai/copy';
import { CodeStep, pick } from '../../components/ai/CodeStep';
import type { Answers, Contact, ContactField, FunnelConfig, FunnelQuestion, Lang } from '../../lib/ai/types';

const EMPTY_CONTACT: Contact = {
  name: '',
  email: '',
  company: '',
  website: '',
  phone_whatsapp: '',
  consent_access: false,
};

const isTypingTarget = (el: EventTarget | null) =>
  el instanceof HTMLElement && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);

const AiFunnelPage: React.FC = () => {
  const navigate = useNavigate();
  const [lang, setLang] = React.useState<Lang>('es');
  const [config, setConfig] = React.useState<FunnelConfig | null>(null);
  const [loadError, setLoadError] = React.useState(false);
  const [raw, setRaw] = React.useState<Answers>({});
  const [stepKey, setStepKey] = React.useState<string | null>(null);
  const [trail, setTrail] = React.useState<string[]>([]);
  const [stepError, setStepError] = React.useState('');
  const [contact, setContact] = React.useState<Contact>(EMPTY_CONTACT);
  const [fieldErrors, setFieldErrors] = React.useState<Partial<Record<ContactField['key'], string>>>({});
  const [formError, setFormError] = React.useState('');
  const [hp, setHp] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [signedIn, setSignedIn] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);

  const copy = copyFor(lang);
  useHtmlLang(lang);

  const load = React.useCallback(async () => {
    setLoadError(false);
    const r = await aiApi.funnel();
    if (r.ok) setConfig(r.data);
    else setLoadError(true);
  }, []);

  React.useEffect(() => {
    const l = detectLang();
    setLang(l);
    attribution();
    load();
    aiApi.me(l).then((r) => setSignedIn(r.ok));
  }, [load]);

  const { steps, answers } = React.useMemo(
    () => (config ? buildSteps(config, raw) : { steps: [] as Step[], answers: {} as Answers }),
    [config, raw],
  );

  const current = steps.find((s) => s.key === stepKey) ?? steps[0];
  const index = current ? steps.indexOf(current) : 0;
  // The result screen is a landing, not a step to count.
  const total = Math.max(steps.length - 1, 1);

  // Progress beacon and GTM step event, once per step shown.
  React.useEffect(() => {
    if (!current) return;
    const attr = attribution();
    aiApi.progress({ sessionId: sessionId(), step: current.key, lang, src: attr.src, utm: attr.utm, referrer: attr.referrer });
    pushEvent({ event: 'ai_funnel_step', step: current.key, step_index: index, lang });
    panelRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
    // lang deliberately left out: switching language is not a new step.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current?.key]);

  const goTo = (key: string) => {
    if (!current) return;
    setTrail((t) => [...t, current.key]);
    setStepError('');
    setStepKey(key);
  };

  /** Next step computed from the answers as they will be after this change. */
  const advance = (nextRaw: Answers = raw) => {
    if (!config || !current) return;
    const { steps: next } = buildSteps(config, nextRaw);
    const i = next.findIndex((s) => s.key === current.key);
    const target = next[i + 1];
    if (target) goTo(target.key);
  };

  const back = () => {
    if (!trail.length || current?.key === 'result') return;
    setStepError('');
    setStepKey(trail[trail.length - 1]);
    setTrail((t) => t.slice(0, -1));
  };

  // A double tap on an option must not advance twice.
  const pendingRef = React.useRef(false);

  const chooseSingle = (q: FunnelQuestion, value: string) => {
    if (pendingRef.current) return;
    pendingRef.current = true;
    const nextRaw = { ...raw, [q.key]: value };
    setRaw(nextRaw);
    window.setTimeout(() => {
      pendingRef.current = false;
      advance(nextRaw);
    }, prefersReducedMotion() ? 0 : 160);
  };

  const toggleMulti = (q: FunnelQuestion, value: string) => {
    const prev = Array.isArray(raw[q.key]) ? (raw[q.key] as string[]) : [];
    let next = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
    if (q.max !== undefined && next.length > q.max) next = next.slice(next.length - q.max);
    setRaw({ ...raw, [q.key]: next });
    setStepError('');
  };

  const continueQuestion = (q: FunnelQuestion) => {
    if (!isAnswered(q, raw[q.key])) {
      setStepError(q.type === 'multi' ? copy.pickMultiHint(q.min ?? 1, q.max) : copy.pickHint);
      return;
    }
    advance();
  };

  // Keyboard: number keys pick, Enter advances, Esc goes back.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!current || e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') {
        back();
        return;
      }
      if (isTypingTarget(e.target)) return;
      if (current.kind === 'screen' && e.key === 'Enter') {
        e.preventDefault();
        advance();
        return;
      }
      if (current.kind !== 'question') return;
      const q = current.question;
      if (/^[0-9]$/.test(e.key)) {
        const n = e.key === '0' ? 10 : Number(e.key);
        const option = q.options[n - 1];
        if (!option) return;
        e.preventDefault();
        if (q.type === 'single') chooseSingle(q, option.value);
        else toggleMulti(q, option.value);
      } else if (e.key === 'Enter' && !(e.target instanceof HTMLButtonElement)) {
        e.preventDefault();
        continueQuestion(q);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const switchLang = () => {
    const next: Lang = lang === 'es' ? 'en' : 'es';
    setLang(next);
    rememberLang(next);
  };

  // ---------- contact ----------

  const personal = looksPersonal(contact.email);

  const fieldRequired = (f: ContactField) => {
    if (f.key === 'website' && personal) return true;
    if (!f.required) return false;
    return !(f.optional_if && evaluate(f.optional_if, answers));
  };

  const validateContact = (fields: ContactField[]) => {
    const errs: Partial<Record<ContactField['key'], string>> = {};
    for (const f of fields) {
      const v = contact[f.key];
      if (f.type === 'checkbox') {
        if (fieldRequired(f) && !v) errs[f.key] = copy.consentRequired;
        continue;
      }
      const s = String(v).trim();
      if (!s) {
        if (fieldRequired(f)) errs[f.key] = copy.required;
        continue;
      }
      if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) errs[f.key] = copy.invalidEmail;
      if (f.type === 'url' && !/^(https?:\/\/)?[^\s/]+\.[^\s]{2,}/i.test(s)) errs[f.key] = copy.invalidWebsite;
    }
    return errs;
  };

  const identify = async () => {
    const attr = attribution();
    return aiApi.identify({
      sessionId: sessionId(),
      lang,
      answers,
      contact: { ...contact, email: contact.email.trim(), name: contact.name.trim(), company: contact.company.trim(), website: contact.website.trim() },
      hp,
      src: attr.src,
      utm: attr.utm,
    });
  };

  const submitContact = async (fields: ContactField[]) => {
    const errs = validateContact(fields);
    setFieldErrors(errs);
    setFormError('');
    if (Object.keys(errs).length) {
      document.getElementById(`aif-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    const r = await identify();
    setBusy(false);
    if (r.ok) {
      pushEvent({ event: 'ai_funnel_identify', lang });
      goTo('verify');
      return;
    }
    const msg = errorMessage(r, { generic: copy.errorGeneric, rateLimit: copy.errorRateLimit });
    if (r.field && fields.some((f) => f.key === r.field)) {
      setFieldErrors({ [r.field]: msg });
      document.getElementById(`aif-${r.field}`)?.focus();
    } else if (r.field && steps.some((s) => s.kind === 'question' && s.key === r.field)) {
      // The server rejected an answer: send the visitor back to that question.
      setStepKey(r.field);
      setTrail((t) => t.filter((k) => k !== 'contact'));
      setStepError(msg);
    } else {
      setFormError(msg);
    }
  };

  // ---------- render ----------

  useHeadSync(`${copy.seoTitle} | ${SITE.name}`, copy.seoBody);
  if (!config || !current) {
    return (
      <section className="aif" aria-busy={!loadError}>
        <Seo title={`${copy.seoTitle} | ${SITE.name}`} description={copy.seoBody} path="/ai" htmlLang={lang} />
        <div className="aif-panel">
          <p className="aif-kicker">danielforeroj / ai</p>
          {/* The first paint and what a crawler reads: the flow itself only
              exists once GET /api/ai/funnel answers. */}
          <h1 className="aif-title">{copy.seoTitle}</h1>
          <p className="aif-body">{copy.seoBody}</p>
          {loadError ? (
            <>
              <p className="aif-error" role="alert">
                {copy.errorLoad}
              </p>
              <button type="button" className="aif-btn" onClick={load}>
                {copy.retry}
              </button>
            </>
          ) : (
            <p className="aif-meta">{copy.loading}</p>
          )}
        </div>
      </section>
    );
  }

  const progress = current.kind === 'result' ? 100 : Math.round((index / total) * 100);

  return (
    <section className="aif">
      <Seo title={`${copy.seoTitle} | ${SITE.name}`} description={copy.seoBody} path="/ai" htmlLang={lang} />

      <div className="aif-top">
        <div
          className="aif-progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
          aria-label={copy.step(Math.min(index + 1, total), total)}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="aif-bar">
          {trail.length && current.kind !== 'result' ? (
            <button type="button" className="aif-link" onClick={back}>
              ← {copy.back}
            </button>
          ) : (
            <span />
          )}
          <button type="button" className="aif-link" onClick={switchLang} lang={lang === 'es' ? 'en' : 'es'}>
            {copy.langSwitch}
          </button>
        </div>
      </div>

      <div className="aif-panel" ref={panelRef} tabIndex={-1} key={current.key}>
        {current.kind === 'screen' ? (
          <div className="aif-step">
            {current.key === config.screens.list[0]?.key ? <p className="aif-kicker">danielforeroj / ai</p> : null}
            {current.screen.title ? <h1 className="aif-title">{pick(current.screen.title, lang)}</h1> : null}
            <p className={current.screen.title ? 'aif-body' : 'aif-title aif-title--body'}>{pick(current.screen.body, lang)}</p>
            <div className="aif-actions">
              <button type="button" className="aif-btn" onClick={() => advance()}>
                {current.screen.cta ? pick(current.screen.cta, lang) : copy.next}
              </button>
              <span className="aif-meta aif-hide-touch">{copy.keysHint}</span>
            </div>
            {signedIn && index === 0 ? (
              <p className="aif-meta">
                <NavLink to="/ai/recursos" className="aif-link">
                  {copy.backToLibrary} →
                </NavLink>
              </p>
            ) : null}
          </div>
        ) : null}

        {current.kind === 'question' ? (
          <QuestionStep
            q={current.question}
            lang={lang}
            value={raw[current.question.key]}
            error={stepError}
            copy={copy}
            onSingle={(v) => chooseSingle(current.question, v)}
            onToggle={(v) => toggleMulti(current.question, v)}
            onContinue={() => continueQuestion(current.question)}
          />
        ) : null}

        {current.kind === 'contact' ? (
          <form
            className="aif-step"
            noValidate
            onSubmit={(e) => {
              e.preventDefault();
              submitContact(config.screens.contact.fields);
            }}
          >
            <h1 className="aif-title">{pick(config.screens.contact.title, lang)}</h1>
            <p className="aif-body">{pick(config.screens.contact.body, lang)}</p>

            <div className="aif-fields">
              {config.screens.contact.fields.map((f) => (
                <ContactInput
                  key={f.key}
                  field={f}
                  lang={lang}
                  required={fieldRequired(f)}
                  value={contact[f.key]}
                  error={fieldErrors[f.key]}
                  onChange={(v) => {
                    setContact((c) => ({ ...c, [f.key]: v }));
                    if (fieldErrors[f.key]) setFieldErrors((e) => ({ ...e, [f.key]: undefined }));
                  }}
                />
              ))}
              {personal ? <p className="aif-note">{pick(config.screens.contact.personal_email_note, lang)}</p> : null}

              {/* Honeypot. Off screen rather than display:none, which some bots skip,
                  with no label text so neither page text nor assistive tech exposes it. */}
              <div className="aif-hp" aria-hidden="true">
                <input
                  id="aif-hp"
                  name="company_fax"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                />
              </div>
            </div>

            {formError ? (
              <p className="aif-error" role="alert">
                {formError}
              </p>
            ) : null}
            <div className="aif-actions">
              <button type="submit" className="aif-btn" disabled={busy}>
                {pick(config.screens.contact.cta, lang)}
              </button>
            </div>
          </form>
        ) : null}

        {current.kind === 'verify' ? (
          <CodeStep
            lang={lang}
            copy={copy}
            email={contact.email.trim()}
            title={pick(config.screens.verify.title, lang)}
            body={pick(config.screens.verify.body, lang)}
            cta={pick(config.screens.verify.cta, lang)}
            resendLabel={pick(config.screens.verify.resend, lang)}
            resendAfter={config.screens.verify.resend_after_seconds}
            onResend={async () => {
              const r = await identify();
              return r.ok ? { ok: true } : { ok: false, message: errorMessage(r, { generic: copy.errorGeneric, rateLimit: copy.errorRateLimit }) };
            }}
            onChangeEmail={back}
            onVerified={() => {
              pushEvent({ event: 'ai_funnel_verified', lang });
              goTo('result');
              window.setTimeout(() => navigate(`${config.screens.result.redirect}?lang=${lang}`), prefersReducedMotion() ? 400 : 1200);
            }}
          />
        ) : null}

        {current.kind === 'result' ? (
          <div className="aif-step" role="status">
            <h1 className="aif-title">{pick(config.screens.result.title, lang)}</h1>
            <p className="aif-body">{pick(config.screens.result.body, lang)}</p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

function QuestionStep({
  q,
  lang,
  value,
  error,
  copy,
  onSingle,
  onToggle,
  onContinue,
}: {
  q: FunnelQuestion;
  lang: Lang;
  value: Answers[string] | undefined;
  error: string;
  copy: ReturnType<typeof copyFor>;
  onSingle: (v: string) => void;
  onToggle: (v: string) => void;
  onContinue: () => void;
}) {
  const multi = q.type === 'multi';
  const selected = multi ? (Array.isArray(value) ? value : []) : typeof value === 'string' ? [value] : [];
  const titleId = `aif-q-${q.key}`;

  return (
    <div className="aif-step">
      <h1 className="aif-title" id={titleId}>
        {pick(q.title, lang)}
      </h1>
      <p className="aif-meta">{q.help ? pick(q.help, lang) : multi ? copy.pickMultiHint(q.min ?? 1, q.max) : copy.pickHint}</p>

      <div className="aif-options" role={multi ? 'group' : 'radiogroup'} aria-labelledby={titleId}>
        {q.options.map((o, i) => {
          const on = selected.includes(o.value);
          const keyHint = i < 9 ? String(i + 1) : i === 9 ? '0' : '';
          return (
            <button
              key={o.value}
              type="button"
              className={`aif-option${on ? ' is-on' : ''}`}
              role={multi ? 'checkbox' : 'radio'}
              aria-checked={on}
              onClick={() => (multi ? onToggle(o.value) : onSingle(o.value))}
            >
              {keyHint ? (
                <span className="aif-option__key" aria-hidden="true">
                  {keyHint}
                </span>
              ) : null}
              <span className="aif-option__label">{pick(o.label, lang)}</span>
              {on ? (
                <span className="aif-option__tick" aria-hidden="true">
                  ✓
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="aif-error" role="alert">
          {error}
        </p>
      ) : null}

      {multi || selected.length ? (
        <div className="aif-actions">
          <button type="button" className="aif-btn" onClick={onContinue}>
            {copy.next}
          </button>
          <span className="aif-meta aif-hide-touch">{copy.keysHint}</span>
        </div>
      ) : null}
    </div>
  );
}

function ContactInput({
  field,
  lang,
  required,
  value,
  error,
  onChange,
}: {
  field: ContactField;
  lang: Lang;
  required: boolean;
  value: string | boolean;
  error?: string;
  onChange: (v: string | boolean) => void;
}) {
  const id = `aif-${field.key}`;
  const errId = `${id}-error`;
  const common = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errId : undefined,
    'aria-required': required || undefined,
  };

  if (field.type === 'checkbox') {
    return (
      <div className="aif-field aif-field--check">
        <input {...common} type="checkbox" checked={Boolean(value)} onChange={(e) => onChange(e.target.checked)} />
        <label htmlFor={id}>{pick(field.label, lang)}</label>
        {error ? (
          <p id={errId} className="aif-error">
            {error}
          </p>
        ) : null}
      </div>
    );
  }

  const autoComplete = { name: 'name', email: 'email', company: 'organization', website: 'url', phone_whatsapp: 'tel' }[
    field.key as Exclude<ContactField['key'], 'consent_access'>
  ];

  return (
    <div className="aif-field">
      <label htmlFor={id}>
        {pick(field.label, lang)}
        {required ? <span aria-hidden="true"> *</span> : null}
      </label>
      <input
        {...common}
        type={field.type === 'url' ? 'text' : field.type}
        inputMode={field.type === 'url' ? 'url' : field.type === 'tel' ? 'tel' : field.type === 'email' ? 'email' : undefined}
        autoComplete={autoComplete}
        autoCapitalize={field.type === 'text' ? 'words' : 'none'}
        spellCheck={false}
        placeholder={field.placeholder ? pick(field.placeholder, lang) : undefined}
        value={String(value)}
        onChange={(e) => onChange(e.target.value)}
      />
      {error ? (
        <p id={errId} className="aif-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default AiFunnelPage;
