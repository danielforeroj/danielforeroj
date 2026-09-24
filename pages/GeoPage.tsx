import React from 'react';
import Seo from '../lib/SeoHead';
import { SITE } from '../data/siteConfig';
import { localePath, useLang, useUi } from '../lib/i18n';
import { attribution } from '../lib/ai/context';
import { geoScanUrl, sendLead } from '../lib/lead';
import { LeadFields, validateFields, type LeadField } from '../components/LeadFields';

// The free GEO scan: the entry point for the marketing, brand and comms pieces
// (pillar P3). /geo in Spanish, /en/geo in English. The scan itself runs on
// unboundgeo.com, which cannot be embedded with attribution and does not read
// ?r=, so this page records the lead first and then sends the visitor to the
// scan with the attribution as utm_*.

const GeoPage: React.FC = () => {
  const lang = useLang();
  const t = useUi().geo;
  const l = useUi().lead;
  const [values, setValues] = React.useState<Record<string, string>>({});
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>({});
  const [formError, setFormError] = React.useState('');
  const [hp, setHp] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [sent, setSent] = React.useState('');

  React.useEffect(() => {
    attribution();
  }, []);

  const fields: LeadField[] = [
    { key: 'name', label: l.name, required: true, autoComplete: 'name' },
    { key: 'email', label: l.email, type: 'email', required: true, autoComplete: 'email' },
    { key: 'company', label: l.company, required: true, autoComplete: 'organization' },
    { key: 'website', label: l.website, type: 'url', autoComplete: 'url', placeholder: lang === 'es' ? 'empresa.com' : 'company.com' },
  ];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateFields(fields, values, l);
    setErrors(errs);
    setFormError('');
    if (Object.keys(errs).length) {
      document.getElementById(`geo-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setBusy(true);
    const target = geoScanUrl(attribution().src);
    const r = await sendLead({
      page: 'geo',
      path: localePath('/geo', lang),
      lang,
      name: values.name ?? '',
      email: values.email ?? '',
      company: values.company,
      website: values.website,
      lines: ['Pidió el escaneo GEO gratis y salió hacia:', target],
      hp,
    });
    setBusy(false);
    if (!r.ok) {
      setFormError(r.status === 429 ? l.errorRateLimit : l.errorGeneric);
      return;
    }
    setSent(target);
    window.setTimeout(() => window.location.assign(target), 900);
  };

  return (
    <section className="aif">
      <Seo title={`${t.seoTitle} | ${SITE.name}`} description={t.description} path={localePath('/geo', lang)} />
      <div className="aif-panel">
        <div className="aif-step">
          <p className="aif-kicker">{t.kicker}</p>
          <h1 className="aif-title">{t.introTitle}</h1>
          <p className="aif-body">{t.introBody}</p>
          <ul className="aif-points">
            {t.points.map((pt) => (
              <li key={pt}>{pt}</li>
            ))}
          </ul>

          <hr className="aif-sep" />

          {sent ? (
            <div role="status">
              <h2 className="aif-title">{t.sentTitle}</h2>
              <p className="aif-meta">
                <a className="aif-link" href={sent}>
                  {t.manual} →
                </a>
              </p>
            </div>
          ) : (
            <form noValidate onSubmit={submit} className="aif-step">
              <h2 className="aif-title aif-title--body">{t.formTitle}</h2>
              <p className="aif-meta">{t.formBody}</p>
              <LeadFields
                idPrefix="geo"
                fields={fields}
                values={values}
                errors={errors}
                optionalLabel={l.optional}
                onChange={(k, v) => {
                  setValues((s) => ({ ...s, [k]: v }));
                  if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
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
          )}
        </div>
      </div>
    </section>
  );
};

export default GeoPage;
