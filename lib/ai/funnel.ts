// Flow navigation, derived from the config GET /api/ai/funnel serves. Nothing
// here names a question: the step list is rebuilt from questions, screens and
// answers every time an answer changes. The server re-validates all of it.

import type { Answers, Condition, FunnelConfig, FunnelQuestion, FunnelScreen } from './types';

/** Same semantics as evaluateCondition in unbound-app: an unanswered question never matches. */
export function evaluate(cond: Condition, answers: Answers): boolean {
  if ('any' in cond) return cond.any.some((c) => evaluate(c, answers));
  if ('all' in cond) return cond.all.every((c) => evaluate(c, answers));
  const v = answers[cond.q];
  switch (cond.op) {
    case 'eq':
      return typeof v === 'string' && v === cond.value;
    case 'neq':
      return typeof v === 'string' && v !== cond.value;
    case 'in':
      return typeof v === 'string' && cond.values.includes(v);
    case 'has_any':
      return Array.isArray(v) && v.some((x) => cond.values.includes(x));
  }
}

export type Step =
  | { kind: 'screen'; key: string; screen: FunnelScreen }
  | { kind: 'question'; key: string; question: FunnelQuestion }
  | { kind: 'contact'; key: 'contact' }
  | { kind: 'verify'; key: 'verify' }
  | { kind: 'result'; key: 'result' };

const visible = (item: { show_if?: Condition }, answers: Answers) =>
  !item.show_if || evaluate(item.show_if, answers);

/**
 * The ordered steps for the current answers, plus the answers the server should
 * receive: only visible questions, with a hidden question's `hidden_value` filled
 * in, so a stale answer to a question that is no longer shown is never sent.
 */
export function buildSteps(config: FunnelConfig, raw: Answers): { steps: Step[]; answers: Answers } {
  const answers: Answers = {};
  const steps: Step[] = [];
  const screensAfter = (after: string | null) =>
    config.screens.list.filter((s) => s.after === after);

  for (const s of screensAfter(null)) {
    if (visible(s, answers)) steps.push({ kind: 'screen', key: s.key, screen: s });
  }

  for (const q of config.questions) {
    if (visible(q, answers)) {
      steps.push({ kind: 'question', key: q.key, question: q });
      if (raw[q.key] !== undefined) answers[q.key] = raw[q.key];
    } else if (q.hidden_value !== undefined && isDecidable(q, answers)) {
      answers[q.key] = q.hidden_value;
    }
    for (const s of screensAfter(q.key)) {
      if (visible(s, answers)) steps.push({ kind: 'screen', key: s.key, screen: s });
    }
  }

  steps.push({ kind: 'contact', key: 'contact' }, { kind: 'verify', key: 'verify' }, { kind: 'result', key: 'result' });
  return { steps, answers };
}

/**
 * A hidden_value only applies once the condition that hides the question can be
 * judged. Before role is answered, company_type reads as hidden (neq on a
 * missing answer is false) but it is not hidden yet, it is undecided.
 */
function isDecidable(q: FunnelQuestion, answers: Answers): boolean {
  const refs: string[] = [];
  const walk = (c?: Condition) => {
    if (!c) return;
    if ('any' in c) c.any.forEach(walk);
    else if ('all' in c) c.all.forEach(walk);
    else refs.push(c.q);
  };
  walk(q.show_if);
  return refs.every((k) => answers[k] !== undefined);
}

export function isAnswered(q: FunnelQuestion, value: Answers[string] | undefined): boolean {
  if (q.type === 'single') return typeof value === 'string' && value.length > 0;
  const n = Array.isArray(value) ? value.length : 0;
  return n >= (q.min ?? 1) && (q.max === undefined || n <= q.max);
}

const FREE_MAIL = ['gmail.', 'googlemail.', 'hotmail.', 'outlook.', 'live.', 'yahoo.', 'icloud.', 'me.com', 'proton.', 'protonmail.'];

/** A hint only, so the website field can be asked for before submit. The server decides. */
export function looksPersonal(email: string): boolean {
  const domain = email.split('@')[1]?.toLowerCase() ?? '';
  return FREE_MAIL.some((d) => domain.startsWith(d) || domain === d);
}
