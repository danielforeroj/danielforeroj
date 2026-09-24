import React from 'react';

// The contact inputs the entry pages share (/crecer, /geo, /work-w-me). Styled
// with the AI funnel's .aif-field classes so every form on the site looks and
// behaves the same, including the off-screen honeypot.

export type LeadField = {
  key: string;
  label: string;
  type?: 'text' | 'email' | 'url' | 'textarea' | 'select';
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  options?: [string, string][];
};

type Props = {
  idPrefix: string;
  fields: LeadField[];
  values: Record<string, string>;
  errors: Record<string, string | undefined>;
  optionalLabel: string;
  onChange: (key: string, value: string) => void;
  hp: string;
  onHp: (v: string) => void;
};

export const LeadFields: React.FC<Props> = ({ idPrefix, fields, values, errors, optionalLabel, onChange, hp, onHp }) => (
  <div className="aif-fields">
    {fields.map((f) => {
      const id = `${idPrefix}-${f.key}`;
      const errId = `${id}-error`;
      const common = {
        id,
        name: f.key,
        value: values[f.key] ?? '',
        'aria-invalid': errors[f.key] ? true : undefined,
        'aria-describedby': errors[f.key] ? errId : undefined,
        'aria-required': f.required || undefined,
      };
      return (
        <div className="aif-field" key={f.key}>
          <label htmlFor={id}>
            {f.label}
            {f.required ? <span aria-hidden="true"> *</span> : <span className="aif-meta"> {optionalLabel}</span>}
          </label>
          {f.type === 'textarea' ? (
            <textarea
              {...common}
              rows={5}
              placeholder={f.placeholder}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          ) : f.type === 'select' ? (
            <select {...common} onChange={(e) => onChange(f.key, e.target.value)}>
              <option value="">{' '}</option>
              {f.options?.map(([v, l]) => (
                <option key={v} value={v}>
                  {l}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...common}
              type={f.type === 'url' ? 'text' : f.type ?? 'text'}
              inputMode={f.type === 'email' ? 'email' : f.type === 'url' ? 'url' : undefined}
              autoComplete={f.autoComplete}
              autoCapitalize={f.type === 'email' || f.type === 'url' ? 'none' : 'words'}
              spellCheck={false}
              placeholder={f.placeholder}
              onChange={(e) => onChange(f.key, e.target.value)}
            />
          )}
          {errors[f.key] ? (
            <p id={errId} className="aif-error">
              {errors[f.key]}
            </p>
          ) : null}
        </div>
      );
    })}
    <div className="aif-hp" aria-hidden="true">
      <input
        id={`${idPrefix}-hp`}
        name="company_fax"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={hp}
        onChange={(e) => onHp(e.target.value)}
      />
    </div>
  </div>
);

/** Required and email checks for a set of fields. Returns an error per failing key. */
export function validateFields(
  fields: LeadField[],
  values: Record<string, string>,
  msg: { required: string; invalidEmail: string },
): Record<string, string> {
  const errs: Record<string, string> = {};
  for (const f of fields) {
    const v = (values[f.key] ?? '').trim();
    if (!v) {
      if (f.required) errs[f.key] = msg.required;
      continue;
    }
    if (f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[f.key] = msg.invalidEmail;
  }
  return errs;
}
