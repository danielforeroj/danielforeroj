// The kits the faceless videos promise (2026-11-27). Each video closes with
// "Comente PALABRA y le mando el kit ..." / "Comment WORD and I'll send you ...";
// the DM carries a link to /kit/<slug> (Spanish) or /en/kit/<slug> (English), with
// ?r=<ig|tk|yt>-fd-<video id without the dash>, e.g. /kit/medir?r=ig-fd-es01.
//
// A kit is data: sections of typed blocks, drawn by pages/KitPage.tsx. Every block
// is something the reader uses (a checklist that keeps its ticks, a template with a
// copy button, a sheet they paste into Sheets or Excel, a calculator), not prose.
//
// Text fields take two inline marks only: **bold** and `code`.

import type { Lang } from '../../lib/i18n';

export type KitBlock =
  /** A paragraph. Keep it short: the kit is a tool, not an article. */
  | { type: 'p'; text: string }
  /** The one rule of the section, drawn as a highlighted line. */
  | { type: 'rule'; text: string }
  /** Numbered steps. */
  | { type: 'steps'; items: { title: string; body?: string }[] }
  /**
   * A checklist. Ticks are kept in the browser (key: kit slug + id), so the reader
   * can come back to it. `id` must be unique inside the kit.
   */
  | { type: 'check'; id: string; title?: string; items: string[] }
  /**
   * Text to copy and use as is: a prompt, a message, a slide outline, a meeting
   * agenda. Shown in monospace with a Copy button. [BRACKETS] mark what the reader fills in.
   */
  | { type: 'template'; title: string; body: string; note?: string }
  /**
   * A sheet: columns and rows (example rows or blank rows to fill). The reader
   * copies it as a table (pastes straight into Google Sheets or Excel, formulas
   * included) or downloads it as CSV. A cell starting with "=" is a formula, written
   * with A1 references (row 1 is the header), plain arithmetic only (+ - * / and
   * parentheses, SUM is fine), so it works in any locale.
   */
  | { type: 'sheet'; id: string; title: string; columns: string[]; rows: string[][]; note?: string }
  /**
   * A calculator that runs on the page. Inputs are numbers, their ids letters, digits
   * and underscores only (hoursBefore, hours_before: a dash is a minus); each output is an
   * arithmetic expression over input ids (+ - * / parentheses, numbers). A verdict,
   * if given, is an expression that passes when > 0.
   */
  | {
      type: 'calc';
      id: string;
      title: string;
      inputs: { id: string; label: string; value: number; unit?: string; hint?: string }[];
      outputs: { label: string; expr: string; format: 'money' | 'number' | 'percent' | 'hours' }[];
      verdict?: { expr: string; pass: string; fail: string };
    }
  /** Two columns compared: what not to do and what to do. */
  | { type: 'compare'; bad: { title: string; items: string[] }; good: { title: string; items: string[] } };

export type KitSection = {
  /** Anchor id, unique inside the kit, lowercase-with-dashes. */
  id: string;
  title: string;
  /** The studio video ids this section answers (es-01, en-04...). */
  videos: string[];
  /** One or two lines: what this section gets the reader. */
  intro: string;
  blocks: KitBlock[];
};

export type KitContent = {
  /** The kit's name as the videos say it, capitalized: "El kit para poner la IA a producir plata". */
  title: string;
  /** One sentence under the title: what the reader leaves with. */
  promise: string;
  /** Minutes it takes to go through it once. */
  minutes: number;
  /** Three or four lines on how to use it, shown before the sections. */
  howTo: string[];
  sections: KitSection[];
  /** The last block: one line, and which page of the site is the next step. */
  next: { text: string; cta: string; page: 'crecer' | 'ai' | 'work' | 'geo' | 'book' };
};

export type Kit = {
  /** The word people comment, upper case: MEDIR. */
  word: string;
  /** URL segment, lower case: medir. */
  slug: string;
  /** One kit can exist in both languages (CONTROL). */
  content: Partial<Record<Lang, KitContent>>;
  /** Every video that promises this kit, with the literal promise of its CTA. */
  videos: { id: string; lang: Lang; promise: string }[];
};
