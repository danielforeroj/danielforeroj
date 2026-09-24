import React from 'react';
import Seo from '../lib/SeoHead';
import { SITE } from '../data/siteConfig';
import { localePath, useLang, useUi } from '../lib/i18n';
import { attribution, prefersReducedMotion } from '../lib/ai/context';
import { QUESTIONS, answerLines, isComplete, readout, type DxAnswers, type DxQuestion } from '../lib/diagnostico';
import { BOOKING_URL, sendLead } from '../lib/lead';
import { LeadFields, validateFields, type LeadField } from '../components/LeadFields';

// The growth diagnostic: the entry point for the growth, strategy, sales and
// partnerships pieces (pillars P1 and P4). /crecer in Spanish, /en/grow in
// English. Six questions, a contact step that records the lead, and a readout
// built from the answers with fixed templates (lib/diagnostico.ts), ending on
// the booking link.

type Step = 'intro' | DxQuestion['key'] | 'contact' | 'result';

const GrowPage: React.FC = () => {
  const lang = useLang();
  const t = useUi().grow;
  const l = useUi().lead;
  const [step, setStep] = React.useState<Step>('intro');
  const [answers, setAnswers] = React.useState<DxAnswers>({});
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({});
  const [formError, setFormError] = React.useState('');
  const [hint, setHint] = React.useState('');
  const [hp, setHp] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const pending = React.useRef(false);

  // Read ?r= on arrival, the same way /ai does, so it survives the steps.
  React.useEffect(() => {
    attribution();
  }, []);

  React.useEffect(() => {
    if (step === 'intro') return;
    panelRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0 });
  }, [step]);

  const order: Step[] = ['intro', ...QUESTIONS.map((q) => q.key), 'contact', 'result'];
  const idx = order.indexOf(step);
  const qIndex = QUESTIONS.findIndex((q) => q.key === step);
  const progress = step === 'intro' ? 0 : step === 'result' ? 100 : Math.round((idx / (order.length - 1)) * 100);

  const go = (s: Step) => {
    setHint('');
    setStep(s);
  };
  const next = () => go(order[Math.min(idx + 1, order.length - 1)]);
  const back = () => go(order[Math.max(idx - 1, 0)]);

  const pick = (q: DxQuestion, value: string) => {
    if (q.multi) {
      const prev = Array.isArray(answers[q.key]) ? (answers[q.key] as string[]) : [];
      let nextVals = prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      // "Nothing yet" excludes everything else, and the other way around.
      if (value === 'nothing' && nextVals.includes('nothing')) nextVals = ['nothing'];
      else nextVals = nextVals.filter((v) => v !== 'nothing' || value === 'nothing');
      setAnswers({ ...answers, [q.key]: nextVals });
      setHint('');
      return;
    }
    if (pending.current) return;
    pending.current = true;
    setAnswers({ ...answers, [q.key]: value });
    window.setTimeout(() => {
      pending.current = false;
      next();
    }, prefersReducedMotion() ? 0 : 160);
  };

  const fields: LeadField[] = [
    { key: 'name', label: l.name, required: true, autoComplete: 'name' },
    { key: 'email', label: l.email, type: 'email', required: true, autoComplete: 'email' },
    { key: 'company', label: l.company, autoComplete: 'organization' },
    { key: 'website', label: l.website, type: 'url', autoComplete: 'url' },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateFields(fields, values, l);
    setErrors(errs);
    setFormError('');
    if (Object.keys(errs).length) {
      document.getElementById(`dx-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    if (!isComplete(answers)) {
      go(QUESTIONS.find((q) => !answers[q.key] || (Array.isArray(answers[q.key]) && !(answers[q.key] as string[]).length))!.key);
      return;
    }
    setBusy(true);
    const lines = readout(answers, lang);
    const r = await sendLead({
      page: 'crecer',
      path: localePath('/crecer', lang),
      lang,
      name: values.name ?? '',
      email: values.email ?? '',
      company: values.company,
      website: values.website,
      lines: ['Respuestas:', ...answerLines(answers).map((x) => `- ${x}`), '', 'Lectura que vio:', ...lines.map((x) => `- ${x}`)],
      hp,
    });
    setBusy(false);
    if (r.ok) go('result');
    else setFormError(r.status === 429 ? l.errorRateLimit : l.errorGeneric);
  };

  const q = qIndex >= 0 ? QUESTIONS[qIndex] : null;
  const selected = q ? (q.multi ? ((answers[q.key] as string[]) ?? []) : answers[q.key] ? [answers[q.key] as string] : []) : [];

  return (
    <section className="aif">
      <Seo title={`${t.seoTitle} | ${SITE.name}`} description={t.description} path={localePath('/crecer', lang)} />

      <div className="aif-top">
        <div className="aif-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} aria-label={t.title}>
          <span style={{ width: `${progress}%` }} />
        </div>
        <div className="aif-bar">
          {step !== 'intro' && step !== 'result' ? (
            <button type="button" className="aif-link" onClick={back}>
              ← {t.back}
            </button>
          ) : (
            <span />
          )}
          <span className="aif-bar__end">{q ? <span className="aif-meta">{t.step(qIndex + 1, QUESTIONS.length)}</span> : null}</span>
        </div>
      </div>

      <div className="aif-panel" ref={panelRef} tabIndex={-1} key={step}>
        {step === 'intro' ? (
          <div className="aif-step">
            <p className="aif-kicker">{t.kicker}</p>
            <h1 className="aif-title">{t.introTitle}</h1>
            <p className="aif-body">{t.introBody}</p>
            <ul className="aif-points">
              {t.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
            <div className="aif-actions">
              <button type="button" className="aif-btn" onClick={next}>
                {t.start}
              </button>
            </div>
          </div>
        ) : null}

        {q ? (
          <div className="aif-step">
            <h1 className="aif-title" id={`dx-q-${q.key}`}>
              {q.title[lang]}
            </h1>
            <p className="aif-meta">{q.multi ? t.pickMany : t.pickOne}</p>
            <div className="aif-options" role={q.multi ? 'group' : 'radiogroup'} aria-labelledby={`dx-q-${q.key}`}>
              {q.options.map((o, i) => {
                const on = selected.includes(o.value);
                return (
                  <button
                    key={o.value}
                    type="button"
                    className={`aif-option${on ? ' is-on' : ''}`}
                    role={q.multi ? 'checkbox' : 'radio'}
                    aria-checked={on}
                    onClick={() => pick(q, o.value)}
                  >
                    <span className="aif-option__key" aria-hidden="true">
                      {i + 1}
                    </span>
                    <span className="aif-option__label">{o.label[lang]}</span>
                    {on ? (
                      <span className="aif-option__tick" aria-hidden="true">
                        ✓
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
            {hint ? (
              <p className="aif-error" role="alert">
                {hint}
              </p>
            ) : null}
            {q.multi || selected.length ? (
              <div className="aif-actions">
                <button
                  type="button"
                  className="aif-btn"
                  onClick={() => (selected.length ? next() : setHint(q.multi ? t.pickMany : t.pickOne))}
                >
                  {t.next}
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 'contact' ? (
          <form className="aif-step" noValidate onSubmit={submit}>
            <h1 className="aif-title">{t.contactTitle}</h1>
            <p className="aif-body">{t.contactBody}</p>
            <LeadFields
              idPrefix="dx"
              fields={fields}
              values={values}
              errors={errors}
              optionalLabel={l.optional}
              onChange={(k, v) => {
                setValues((s) => ({ ...s, [k]: v }));
                if (errors[k]) setErrors((e) => ({ ...e, [k]: undefined }));
              }}
              hp={hp}
              onHp={setHp}
            />
            {formError ? (
              <p className="aif-error" role="alert">
                {formError}
              </p>
            ) : null}
            <div className="aif-actions">
              <button type="submit" className="aif-btn" disabled={busy}>
                {t.submit}
              </button>
            </div>
          </form>
        ) : null}

        {step === 'result' ? (
          <div className="aif-step" role="status">
            <p className="aif-kicker">{t.resultKicker}</p>
            <h1 className="aif-title">{t.resultTitle}</h1>
            <ol className="aif-readout">
              {readout(answers, lang).map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ol>
            <div className="aif-actions">
              <a className="aif-btn" href={BOOKING_URL} target="_blank" rel="noopener">
                {t.book}
              </a>
              <span className="aif-meta">{t.bookNote}</span>
            </div>
            <p className="aif-meta">
              <button
                type="button"
                className="aif-link"
                onClick={() => {
                  setAnswers({});
                  go('intro');
                }}
              >
                {t.restart}
              </button>
            </p>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default GrowPage;
