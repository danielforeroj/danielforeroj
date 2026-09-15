import React from 'react';
import { aiApi, errorMessage } from '../../lib/ai/api';
import type { Copy } from '../../lib/ai/copy';
import type { Lang, Localized } from '../../lib/ai/types';

type Props = {
  lang: Lang;
  copy: Copy;
  email: string;
  title: string;
  body: string;
  cta: string;
  resendLabel: string;
  resendAfter: number;
  /** Sends the code again. The funnel re-posts /identify, the library re-posts /login. */
  onResend: () => Promise<{ ok: boolean; message?: string }>;
  onVerified: () => void;
  onChangeEmail?: () => void;
};

/**
 * The 6 digit code screen, shared by the funnel and the library login. The code
 * is typed on the same screen it was asked for: in-app browsers make switching
 * apps and coming back unreliable, so there is no magic link to tap.
 */
export function CodeStep({
  lang,
  copy,
  email,
  title,
  body,
  cta,
  resendLabel,
  resendAfter,
  onResend,
  onVerified,
  onChangeEmail,
}: Props) {
  const [code, setCode] = React.useState('');
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState('');
  const [wait, setWait] = React.useState(resendAfter);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  React.useEffect(() => {
    if (wait <= 0) return;
    const t = window.setTimeout(() => setWait((w) => w - 1), 1000);
    return () => window.clearTimeout(t);
  }, [wait]);

  const submit = async (value: string) => {
    if (busy || value.length !== 6) return;
    setBusy(true);
    setError('');
    const r = await aiApi.verify({ email, code: value, lang });
    setBusy(false);
    if (r.ok) {
      onVerified();
      return;
    }
    setError(r.status === 401 || r.status === 400 ? r.error || copy.codeInvalid : errorMessage(r, { generic: copy.errorGeneric, rateLimit: copy.errorRateLimit }));
    setCode('');
    inputRef.current?.focus();
  };

  const resend = async () => {
    if (wait > 0) return;
    setError('');
    setWait(resendAfter);
    const r = await onResend();
    if (!r.ok && r.message) setError(r.message);
  };

  return (
    <form
      className="aif-step"
      onSubmit={(e) => {
        e.preventDefault();
        submit(code);
      }}
    >
      <h1 className="aif-title">{title}</h1>
      <p className="aif-body">{body}</p>
      <p className="aif-meta">{copy.sentTo(email)}</p>

      <label className="aif-label" htmlFor="aif-code">
        {copy.codeLabel}
      </label>
      <input
        id="aif-code"
        ref={inputRef}
        className="aif-code"
        inputMode="numeric"
        autoComplete="one-time-code"
        pattern="[0-9]*"
        maxLength={6}
        value={code}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? 'aif-code-error' : undefined}
        onChange={(e) => {
          const next = e.target.value.replace(/\D/g, '').slice(0, 6);
          setCode(next);
          if (next.length === 6) submit(next);
        }}
      />
      {error ? (
        <p id="aif-code-error" className="aif-error" role="alert">
          {error}
        </p>
      ) : null}

      <div className="aif-actions">
        <button type="submit" className="aif-btn" disabled={busy || code.length !== 6}>
          {cta}
        </button>
        <button type="button" className="aif-link" onClick={resend} disabled={wait > 0}>
          {wait > 0 ? copy.resendIn(wait) : resendLabel}
        </button>
        {onChangeEmail ? (
          <button type="button" className="aif-link" onClick={onChangeEmail}>
            {copy.changeEmail}
          </button>
        ) : null}
      </div>
    </form>
  );
}

export const pick = (l: Localized, lang: Lang) => l[lang] || l.es;
