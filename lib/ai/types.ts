// Shapes of the /api/ai contract (unbound-app docs/ai-funnel/SPEC.md). They
// mirror lib/ai-funnel/config.ts, grants.ts and resource-blocks.ts in
// unbound-app; the site only reads them, so nothing here decides anything.

export type Lang = 'es' | 'en';
export type Localized = { es: string; en: string };

export type Condition =
  | { q: string; op: 'eq'; value: string }
  | { q: string; op: 'neq'; value: string }
  | { q: string; op: 'in'; values: string[] }
  | { q: string; op: 'has_any'; values: string[] }
  | { any: Condition[] }
  | { all: Condition[] };

export type FunnelOption = { value: string; label: Localized };

export type FunnelQuestion = {
  key: string;
  type: 'single' | 'multi';
  title: Localized;
  help?: Localized;
  options: FunnelOption[];
  min?: number;
  max?: number;
  show_if?: Condition;
  hidden_value?: string;
};

export type FunnelScreen = {
  key: string;
  after: string | null;
  title?: Localized;
  body: Localized;
  cta?: Localized;
  show_if?: Condition;
};

export type ContactField = {
  key: 'name' | 'email' | 'company' | 'website' | 'phone_whatsapp' | 'consent_access';
  type: 'text' | 'email' | 'url' | 'tel' | 'checkbox';
  label: Localized;
  placeholder?: Localized;
  required: boolean;
  optional_if?: Condition;
};

export type FunnelConfig = {
  version: number;
  langs: Lang[];
  questions: FunnelQuestion[];
  screens: {
    list: FunnelScreen[];
    contact: {
      title: Localized;
      body: Localized;
      personal_email_note: Localized;
      cta: Localized;
      fields: ContactField[];
    };
    verify: {
      title: Localized;
      body: Localized;
      resend: Localized;
      resend_after_seconds: number;
      cta: Localized;
    };
    result: { title: Localized; body: Localized; redirect: string };
  };
};

export type Answers = Record<string, string | string[]>;

export type Contact = {
  name: string;
  email: string;
  company: string;
  website: string;
  phone_whatsapp: string;
  consent_access: boolean;
};

export type Utm = {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
};

export type Offer = {
  key: 'intro_call' | 'selah_design_partner' | 'app_service' | 'on_duty' | 'geo';
  placement: 'primary' | 'secondary';
  title: string;
  body: string | null;
  cta_label: string;
  cta_url: string;
};

export type ResourceCard = {
  key: string;
  title: string;
  summary: string | null;
  type: string;
  language: Lang;
};

export type Me = {
  name: string;
  company: string;
  lang: Lang;
  tier_offers: Offer[];
  resources: ResourceCard[];
};

// ---- resource blocks (the viewer allowlist) ----

export type CalloutTone = 'info' | 'positive' | 'warning' | 'accent';

export type ChartNumberFormat = {
  style?: 'plain' | 'currency' | 'percent';
  currency?: string;
  decimals?: number;
  compact?: boolean;
  prefix?: string;
  suffix?: string;
};

export type Block =
  | { id: string; kind: 'text'; md: string }
  | { id: string; kind: 'table'; columns: string[]; rows: string[][]; caption?: string }
  | {
      id: string;
      kind: 'chart';
      chartType: 'bar' | 'line' | 'pie' | 'area';
      labels: string[];
      series: { name: string; data: number[] }[];
      caption?: string;
      numberFormat?: ChartNumberFormat;
      stacked?: boolean;
      donut?: boolean;
    }
  | { id: string; kind: 'image'; url: string; alt?: string; caption?: string }
  | { id: string; kind: 'callout'; tone: CalloutTone; md: string }
  | { id: string; kind: 'stat'; items: { value: string; label: string }[]; caption?: string; animate?: boolean }
  | { id: string; kind: 'accordion'; items: { title: string; md: string }[] }
  | {
      id: string;
      kind: 'beforeAfter';
      label?: string;
      before: { label: string; value: string };
      after: { label: string; value: string };
      caption?: string;
    }
  | { id: string; kind: 'timeline'; items: { label: string; detail?: string; stat?: string }[]; caption?: string }
  | { id: string; kind: 'quote'; md: string; author?: string; role?: string }
  | { id: string; kind: 'divider'; label?: string }
  | { id: string; kind: 'checklist'; items: { text: string; checked?: boolean }[]; caption?: string }
  | { id: string; kind: 'sourceNote'; md: string }
  | { id: string; kind: 'keyTakeaway'; md: string; label?: string }
  | { id: string; kind: 'gallery'; items: { url: string; alt?: string; caption?: string }[]; caption?: string }
  | { id: string; kind: 'logos'; items: { url: string; alt?: string }[]; caption?: string }
  | { id: string; kind: 'video'; url: string; title?: string; caption?: string }
  | { id: string; kind: 'cta'; heading: string; body?: string; label: string; url: string };

export type ResourceView = {
  key: string;
  title: string;
  summary: string | null;
  language: Lang;
  blocks: Block[];
};
