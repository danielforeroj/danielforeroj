// In-memory stand-in for unbound-app's /api/ai, loaded only in `vite --mode mock`.
// funnel.json is funnelConfig() exported from unbound-app, so the flow renders
// the real questions. The code is always 123456. Signed-in state lives in
// sessionStorage so a reload behaves like the cookie would.

import funnel from './funnel.json';
import type { ApiResult } from '../api';
import type { Answers, Block, Lang, Me, ResourceView } from '../types';

const SIGNED_IN = 'dfj_ai_mock_signed_in';
const LEAD = 'dfj_ai_mock_lead';
const CODE = '123456';

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

function get(key: string) {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}
function set(key: string, value: string | null) {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    /* ignore */
  }
}

const TITLES: Record<string, { es: string; en: string }> = {
  workflow_map: { es: 'Mapa de workflows: qué automatizar primero', en: 'Workflow map: what to automate first' },
  workflow_contract: { es: 'Plantilla: el contrato de un workflow de AI', en: 'Template: the contract of an AI workflow' },
  geo_self_audit: { es: 'Autoauditoría de visibilidad en AI en 15 minutos', en: 'AI visibility self audit in 15 minutes' },
  agent_permissions: { es: 'Antes de darle permisos reales a un agente', en: 'Before you give an agent real permissions' },
};

function grantsFor(a: Answers): string[] {
  const pains = Array.isArray(a.pains) ? a.pains : [];
  const out = ['workflow_map', 'workflow_contract', 'geo_self_audit'];
  if (pains.includes('agents')) out.push('agent_permissions');
  return out;
}

function demoBlocks(lang: Lang): Block[] {
  const es = lang === 'es';
  return [
    { id: 'b1', kind: 'text', md: es ? '## Por qué empezar por el mapa\n\nAntes de elegir herramientas, **lista el trabajo**. Un workflow que nadie puede describir no se puede automatizar.\n\n- Qué entra\n- Qué decide una persona\n- Qué sale\n\nMás contexto en [la guía](https://danielforeroj.com/blog).' : '## Why start with the map\n\nBefore picking tools, **list the work**. A workflow nobody can describe cannot be automated.\n\n- What comes in\n- What a person decides\n- What goes out\n\nMore context in [the guide](https://danielforeroj.com/blog).' },
    { id: 'b2', kind: 'keyTakeaway', md: es ? 'Automatiza lo repetitivo y medible primero, no lo más vistoso.' : 'Automate the repetitive, measurable work first, not the flashiest.' },
    { id: 'b3', kind: 'stat', items: [{ value: '12 h', label: es ? 'por semana recuperadas' : 'a week recovered' }, { value: '3', label: es ? 'workflows en producción' : 'workflows in production' }] },
    { id: 'b4', kind: 'table', columns: ['Workflow', es ? 'Horas' : 'Hours', es ? 'Riesgo' : 'Risk'], rows: [['Reportes', '6', es ? 'Bajo' : 'Low'], ['Seguimiento comercial', '4', es ? 'Medio' : 'Medium']], caption: es ? 'Ejemplo' : 'Example' },
    { id: 'b5', kind: 'chart', chartType: 'bar', labels: ['Q1', 'Q2', 'Q3'], series: [{ name: es ? 'Horas' : 'Hours', data: [40, 28, 12] }], numberFormat: { suffix: ' h' } },
    { id: 'b6', kind: 'callout', tone: 'warning', md: es ? 'No le des permisos de escritura a un agente sin un registro de lo que hizo.' : 'Do not give an agent write permissions without a log of what it did.' },
    { id: 'b7', kind: 'checklist', items: [{ text: es ? 'Listar entradas y salidas' : 'List inputs and outputs' }, { text: es ? 'Definir quién aprueba' : 'Define who approves' }] },
    { id: 'b8', kind: 'beforeAfter', label: es ? 'Tiempo de respuesta' : 'Response time', before: { label: es ? 'Antes' : 'Before', value: '6 h' }, after: { label: es ? 'Después' : 'After', value: '8 min' } },
    { id: 'b9', kind: 'accordion', items: [{ title: es ? '¿Y si no tengo datos?' : 'What if I have no data?', md: es ? 'Empieza por registrar una semana a mano.' : 'Start by logging one week by hand.' }] },
    { id: 'b10', kind: 'timeline', items: [{ label: es ? 'Semana 1' : 'Week 1', detail: es ? 'Mapa' : 'Map' }, { label: es ? 'Semana 2' : 'Week 2', stat: '1', detail: es ? 'Primer workflow' : 'First workflow' }] },
    { id: 'b11', kind: 'quote', md: es ? 'Lo que no se mide no se automatiza bien.' : 'What is not measured is not automated well.', author: 'Daniel Forero' },
    { id: 'b12', kind: 'divider', label: es ? 'Fuentes' : 'Sources' },
    { id: 'b13', kind: 'sourceNote', md: es ? 'Datos de ejemplo para el modo mock.' : 'Example data for mock mode.' },
    { id: 'b14', kind: 'cta', heading: es ? 'Hablemos de tu operación' : "Let's talk about your operation", label: es ? 'Agendar llamada' : 'Book a call', url: 'https://unboundoperators.app/book/danielforeroj/intro-call' },
  ];
}

function me(): Me {
  const lead = JSON.parse(get(LEAD) || '{}') as { name?: string; company?: string; lang?: Lang; answers?: Answers };
  const lang = lead.lang ?? 'es';
  const es = lang === 'es';
  return {
    name: lead.name ?? 'Daniel',
    company: lead.company ?? 'Unbound',
    lang,
    tier_offers: [
      {
        key: 'intro_call',
        placement: 'primary',
        title: es ? 'Hablemos de tu operación' : "Let's talk about your operation",
        body: es ? 'Una llamada corta para ver qué tiene sentido automatizar primero en tu empresa.' : 'A short call to see what makes sense to automate first in your company.',
        cta_label: es ? 'Agendar llamada' : 'Book a call',
        cta_url: 'https://unboundoperators.app/book/danielforeroj/intro-call',
      },
      {
        key: 'geo',
        placement: 'secondary',
        title: es ? 'Unbound GEO para tu visibilidad en AI' : 'Unbound GEO for your AI visibility',
        body: es ? 'Si quieres aparecer cuando preguntan a ChatGPT o Perplexity, lo vemos en la llamada.' : 'If you want to show up when people ask ChatGPT or Perplexity, we can cover it on the call.',
        cta_label: es ? 'Agendar llamada' : 'Book a call',
        cta_url: 'https://unboundoperators.app/book/danielforeroj/intro-call',
      },
    ],
    resources: grantsFor(lead.answers ?? {}).map((key) => ({
      key,
      title: TITLES[key][lang],
      summary: es ? 'Un recurso práctico para tu equipo.' : 'A practical resource for your team.',
      type: 'guide',
      language: lang,
    })),
  };
}

export async function mockApi<T>(method: string, path: string, body?: unknown): Promise<ApiResult<T>> {
  await wait(250);
  const b = (body ?? {}) as Record<string, any>;
  const ok = (data: unknown) => ({ ok: true, data: data as T }) as const;
  const signedIn = get(SIGNED_IN) === '1';

  if (method === 'GET' && path === '/funnel') return ok(funnel);
  if (path === '/progress' || path === '/track') return ok({ ok: true });
  if (path === '/identify') {
    if (b.hp) return ok({ ok: true });
    if (!b.contact?.email?.includes('@'))
      return { ok: false, status: 400, error: b.lang === 'en' ? 'Check the email.' : 'Revisa el email.', field: 'email' };
    set(LEAD, JSON.stringify({ name: b.contact.name, company: b.contact.company, lang: b.lang, answers: b.answers }));
    return ok({ ok: true });
  }
  if (path === '/login') return ok({ ok: true });
  // The real endpoint runs the grant rules; the mock only has to grow with the answers,
  // which is what the counter in the flow is showing.
  if (path === '/preview') {
    const answers = (b.answers ?? {}) as Record<string, unknown>;
    const pains = Array.isArray(answers.pains) ? answers.pains.length : 0;
    const count = Math.min(6, Object.keys(answers).length > 0 ? 2 + pains : 0);
    return ok({ count, titles: me().resources.slice(0, 2).map((r) => r.title) });
  }
  if (path === '/verify') {
    if (b.code !== CODE)
      return {
        ok: false,
        status: 401,
        error: b.lang === 'en' ? 'That code is wrong or expired.' : 'Ese código no es correcto o ya venció.',
      };
    set(SIGNED_IN, '1');
    return ok({ ok: true });
  }
  if (path === '/logout') {
    set(SIGNED_IN, null);
    return ok({ ok: true });
  }
  if (path.split('?')[0] === '/me') return signedIn ? ok(me()) : { ok: false, status: 401, error: '' };
  if (path.startsWith('/resources/')) {
    if (!signedIn) return { ok: false, status: 401, error: '' };
    const [rawKey, qs] = path.slice('/resources/'.length).split('?');
    const key = decodeURIComponent(rawKey);
    const lang = (new URLSearchParams(qs).get('lang') as Lang) || 'es';
    const card = me().resources.find((r) => r.key === key);
    if (!card) return { ok: false, status: 404, error: '' };
    const view: ResourceView = { key, title: card.title, summary: card.summary, language: lang, blocks: demoBlocks(lang) };
    return ok(view);
  }
  return { ok: false, status: 404, error: '' };
}
