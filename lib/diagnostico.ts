// The growth diagnostic at /crecer (/en/grow): six multiple-choice questions and
// a three-line readout built from the answers with fixed templates. No model
// call, no server: the same answers always give the same readout, and the
// readout is sent with the lead so Daniel reads what the visitor read.
//
// Copy rules: Spanish addresses the reader as tú, like the rest of the site's
// Spanish. No em dashes, no invented figures, no product or client names.

import type { Lang } from './i18n';

type L = Record<Lang, string>;

export type DxOption = { value: string; label: L };
export type DxQuestion = { key: DxKey; multi?: boolean; title: L; options: DxOption[] };

export type DxKey = 'revenue' | 'team' | 'role' | 'bottleneck' | 'tried' | 'urgency';
export type DxAnswers = Partial<Record<DxKey, string | string[]>>;

export const QUESTIONS: DxQuestion[] = [
  {
    key: 'revenue',
    title: { es: '¿Cuánto factura tu empresa al año?', en: 'What is your annual revenue?' },
    options: [
      { value: 'lt250k', label: { es: 'Menos de US$250 mil', en: 'Under US$250K' } },
      { value: '250k-1m', label: { es: 'De US$250 mil a US$1 millón', en: 'US$250K to US$1M' } },
      { value: '1m-5m', label: { es: 'De US$1 a 5 millones', en: 'US$1M to US$5M' } },
      { value: '5m-20m', label: { es: 'De US$5 a 20 millones', en: 'US$5M to US$20M' } },
      { value: 'gt20m', label: { es: 'Más de US$20 millones', en: 'Over US$20M' } },
    ],
  },
  {
    key: 'team',
    title: { es: '¿Cuántas personas trabajan en la empresa?', en: 'How many people work at the company?' },
    options: [
      { value: '1-10', label: { es: '1 a 10', en: '1 to 10' } },
      { value: '11-50', label: { es: '11 a 50', en: '11 to 50' } },
      { value: '51-200', label: { es: '51 a 200', en: '51 to 200' } },
      { value: '201-1000', label: { es: '201 a 1.000', en: '201 to 1,000' } },
      { value: 'gt1000', label: { es: 'Más de 1.000', en: 'Over 1,000' } },
    ],
  },
  {
    key: 'role',
    title: { es: '¿Cuál es tu rol?', en: 'What is your role?' },
    options: [
      { value: 'owner', label: { es: 'Dueño, fundador o gerente general', en: 'Owner, founder or CEO' } },
      { value: 'growth', label: { es: 'Líder comercial, de marketing o de crecimiento', en: 'Sales, marketing or growth lead' } },
      { value: 'ops', label: { es: 'Líder de operaciones o de tecnología', en: 'Operations or technology lead' } },
      { value: 'other', label: { es: 'Otro', en: 'Other' } },
    ],
  },
  {
    key: 'bottleneck',
    title: { es: '¿Qué frena más el crecimiento hoy?', en: 'What is holding growth back the most right now?' },
    options: [
      { value: 'demand', label: { es: 'Demanda: no llegan suficientes clientes', en: 'Demand: not enough customers coming in' } },
      { value: 'conversion', label: { es: 'Conversión: llegan, pero no compran', en: 'Conversion: they come in, but they do not buy' } },
      { value: 'operations', label: { es: 'Operación: vendemos, pero no damos abasto', en: 'Operations: we sell, but we cannot keep up' } },
      { value: 'expansion', label: { es: 'Expansión: queremos otro país o una línea nueva', en: 'Expansion: a new country or a new line' } },
      { value: 'partnerships', label: { es: 'Alianzas: no tenemos socios ni canales que nos distribuyan', en: 'Partnerships: no partners or channels distributing us' } },
    ],
  },
  {
    key: 'tried',
    multi: true,
    title: { es: '¿Qué has probado ya?', en: 'What have you already tried?' },
    options: [
      { value: 'agency', label: { es: 'Una agencia de marketing', en: 'A marketing agency' } },
      { value: 'ads', label: { es: 'Pauta digital por nuestra cuenta', en: 'Paid ads on our own' } },
      { value: 'sales', label: { es: 'Contratar vendedores', en: 'Hiring salespeople' } },
      { value: 'ai', label: { es: 'Herramientas de IA o automatización', en: 'AI or automation tools' } },
      { value: 'consulting', label: { es: 'Consultoría', en: 'Consultants' } },
      { value: 'nothing', label: { es: 'Nada todavía', en: 'Nothing yet' } },
    ],
  },
  {
    key: 'urgency',
    title: { es: '¿Para cuándo lo necesitas resuelto?', en: 'When do you need this solved?' },
    options: [
      { value: 'month', label: { es: 'Este mes', en: 'This month' } },
      { value: 'quarter', label: { es: 'Este trimestre', en: 'This quarter' } },
      { value: 'year', label: { es: 'Este año', en: 'This year' } },
      { value: 'exploring', label: { es: 'Solo estoy explorando', en: 'Just exploring' } },
    ],
  },
];

const one = (a: DxAnswers, k: DxKey) => (typeof a[k] === 'string' ? (a[k] as string) : '');
const many = (a: DxAnswers, k: DxKey) => (Array.isArray(a[k]) ? (a[k] as string[]) : []);

export function isComplete(a: DxAnswers): boolean {
  return QUESTIONS.every((q) => (q.multi ? many(a, q.key).length > 0 : one(a, q.key) !== ''));
}

const BOTTLENECK: Record<string, L> = {
  demand: {
    es: 'Tu cuello de botella es la demanda: no es que no cierres, es que no llegan suficientes conversaciones buenas. Antes de subir el presupuesto, define un solo cliente ideal y un solo canal que puedas medir de punta a punta.',
    en: 'Your bottleneck is demand: you can close, but not enough good conversations start. Before raising the budget, pick one ideal customer and one channel you can measure end to end.',
  },
  conversion: {
    es: 'Tu cuello de botella es la conversión: la gente llega y se pierde entre el primer contacto y la compra. Mide cuánto tardas en responder un lead y cuántos reciben seguimiento; casi siempre la plata está ahí.',
    en: 'Your bottleneck is conversion: people arrive and get lost between first contact and purchase. Measure how long you take to answer a lead and how many get a follow-up; that is usually where the money is.',
  },
  operations: {
    es: 'Tu cuello de botella es la operación: vender más hoy rompería la entrega. Primero saca del equipo el trabajo que se repite (cotizaciones, reportes, respuestas) y después empuja más demanda.',
    en: 'Your bottleneck is operations: selling more today would break delivery. First take the repeated work off the team (quotes, reports, replies), then push for more demand.',
  },
  expansion: {
    es: 'Tu cuello de botella es la expansión, y la decisión que más pesa es dónde jugar. Elige un solo mercado o una sola línea, valida precio y canal ahí con poco dinero, y solo después abre el siguiente.',
    en: 'Your bottleneck is expansion, and the decision that matters most is where to play. Pick one market or one line, validate price and channel there with little money, and only then open the next one.',
  },
  partnerships: {
    es: 'Tu cuello de botella son los canales: dependes del boca a boca. Una alianza con alguien que ya le vende a tu cliente distribuye más rápido que otro mes de pauta.',
    en: 'Your bottleneck is distribution: you depend on word of mouth. A partnership with someone who already sells to your customer distributes faster than another month of ads.',
  },
};

// The first match in this order wins: the most telling thing they tried.
const TRIED: [string, L][] = [
  [
    'agency',
    {
      es: 'Ya probaste una agencia. Si no quedó claro qué vendió qué, el problema no era la agencia sino la medición: sin atribución, cualquier proveedor se ve igual.',
      en: 'You already tried an agency. If it never became clear what sold what, the problem was measurement, not the agency: without attribution every vendor looks the same.',
    },
  ],
  [
    'ads',
    {
      es: 'Ya probaste pauta por tu cuenta. La pauta amplifica lo que ya funciona; si la oferta y el mensaje no convierten sin pauta, la pauta solo lo hace más caro.',
      en: 'You already ran ads yourself. Ads amplify what already works; if the offer and the message do not convert without ads, ads only make it more expensive.',
    },
  ],
  [
    'sales',
    {
      es: 'Ya contrataste vendedores. Un vendedor sin proceso, sin guion y sin seguimiento medido depende solo de su talento; con proceso, el siguiente arranca más rápido.',
      en: 'You already hired salespeople. A rep without a process, a script and measured follow-up depends on talent alone; with a process, the next hire ramps faster.',
    },
  ],
  [
    'ai',
    {
      es: 'Ya probaste herramientas de IA. La IA rinde cuando entra en un proceso que ya existe y se mide contra plata, no como herramienta suelta.',
      en: 'You already tried AI tools. AI pays off when it goes into a process that already exists and is measured against money, not as a standalone tool.',
    },
  ],
  [
    'consulting',
    {
      es: 'Ya pasaste por consultoría. Lo que suele faltar no es el diagnóstico sino alguien que lo ejecute con tu equipo.',
      en: 'You already worked with consultants. What is usually missing is not the diagnosis but someone who executes it with your team.',
    },
  ],
  [
    'nothing',
    {
      es: 'Todavía no has probado nada, y eso es una ventaja: puedes empezar midiendo, y así cada peso que pongas después te dice algo.',
      en: 'You have not tried anything yet, and that is an advantage: you can start by measuring, so every dollar you spend afterwards tells you something.',
    },
  ],
];

const NEXT: Record<'urgent' | 'later' | 'small', L> = {
  urgent: {
    es: 'Siguiente paso: con la urgencia que marcas, vale la pena hablarlo esta semana. Agenda una llamada y llego con tus respuestas ya leídas.',
    en: 'Next step: with the urgency you marked, it is worth talking this week. Book a call and I will come in with your answers already read.',
  },
  later: {
    es: 'Siguiente paso: no hay afán, así que empieza por medir lo del primer punto durante 30 días. Si quieres una segunda opinión antes de mover plata, agenda una llamada.',
    en: 'Next step: there is no rush, so start by measuring the first point for 30 days. If you want a second opinion before moving money, book a call.',
  },
  small: {
    es: 'Siguiente paso: con el tamaño de tu empresa, un trabajo de alcance fijo rinde más que un contrato mensual. En una llamada te digo cuál aplica a tu caso.',
    en: 'Next step: at your size, a fixed-scope project pays off more than a monthly retainer. On a call I will tell you which one fits your case.',
  },
};

/** The three lines of the readout, in order: the bottleneck, what they tried, the next step. */
export function readout(a: DxAnswers, lang: Lang): string[] {
  const b = BOTTLENECK[one(a, 'bottleneck')] ?? BOTTLENECK.demand;
  const tried = many(a, 'tried');
  const t = (TRIED.find(([k]) => tried.includes(k)) ?? TRIED[TRIED.length - 1])[1];
  const small = one(a, 'revenue') === 'lt250k' || one(a, 'team') === '1-10';
  const urgent = one(a, 'urgency') === 'month' || one(a, 'urgency') === 'quarter';
  const n = small ? NEXT.small : urgent ? NEXT.urgent : NEXT.later;
  return [b[lang], t[lang], n[lang]];
}

/** The answers as readable lines for the lead message, in Spanish, with the raw values. */
export function answerLines(a: DxAnswers): string[] {
  return QUESTIONS.map((q) => {
    const vals = q.multi ? many(a, q.key) : [one(a, q.key)];
    const labels = vals.map((v) => q.options.find((o) => o.value === v)?.label.es ?? v);
    return `${q.title.es} ${labels.join(', ')} [${q.key}=${vals.join(',')}]`;
  });
}
