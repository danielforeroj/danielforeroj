// Checks every kit in data/kits before it ships (2026-11-27). Run: npx tsx scripts/check-kits.ts
// (or through `npm run check:kits`). Exits 1 on any failure.
//
// What it checks, per kit and language:
//   - Daniel's writing rules: no em or en dash, no exclamation marks, Spanish in usted (no tú forms).
//   - Ids unique inside the kit (sections, checks, sheets, calcs).
//   - Every calculator expression and verdict computes a finite number with the default inputs.
//   - Every sheet formula points at columns the sheet has and rows that exist.
//   - Every video id listed in a section is one of the kit's videos.

import { readdirSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import { evalExpr } from '../lib/kitCalc';
import type { Kit, KitBlock } from '../data/kits/types';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'data', 'kits');
const files = readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');

// Second person singular forms usted never takes ("escribe" and "mira" are also usted, so they are not here).
const TU = /(?<![\p{L}])(tú|tienes|puedes|quieres|haces|sabes|necesitas|eres|estás|tus|contigo|hazlo|dime|cuéntame)(?![\p{L}])/iu;

let failures = 0;
const fail = (where: string, msg: string) => {
  failures++;
  console.error(`FAIL ${where}: ${msg}`);
};

function texts(b: KitBlock): string[] {
  switch (b.type) {
    case 'p':
    case 'rule':
      return [b.text];
    case 'steps':
      return b.items.flatMap((i) => [i.title, i.body ?? '']);
    case 'check':
      return [b.title ?? '', ...b.items];
    case 'template':
      return [b.title, b.body, b.note ?? ''];
    case 'sheet':
      return [b.title, b.note ?? '', ...b.columns, ...b.rows.flat()];
    case 'calc':
      return [b.title, ...b.inputs.flatMap((i) => [i.label, i.unit ?? '', i.hint ?? '']), ...b.outputs.map((o) => o.label), b.verdict?.pass ?? '', b.verdict?.fail ?? ''];
    case 'compare':
      return [b.bad.title, b.good.title, ...b.bad.items, ...b.good.items];
  }
}

for (const f of files) {
  const kit = (await import(pathToFileURL(path.join(dir, f)).href)).default as Kit;
  const videoIds = new Set(kit.videos.map((v) => v.id));
  for (const [lang, c] of Object.entries(kit.content)) {
    if (!c) continue;
    const at = `${kit.slug}/${lang}`;
    const ids = new Set<string>();
    const all: string[] = [c.title, c.promise, ...c.howTo, c.next.text, c.next.cta];
    for (const s of c.sections) {
      if (ids.has(s.id)) fail(at, `duplicate id ${s.id}`);
      ids.add(s.id);
      for (const v of s.videos) if (!videoIds.has(v)) fail(at, `section ${s.id} lists unknown video ${v}`);
      all.push(s.title, s.intro);
      for (const b of s.blocks) {
        all.push(...texts(b));
        if ('id' in b) {
          if (ids.has(b.id)) fail(at, `duplicate id ${b.id}`);
          ids.add(b.id);
        }
        if (b.type === 'calc') {
          const vars = Object.fromEntries(b.inputs.map((i) => [i.id, i.value]));
          for (const i of b.inputs) if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(i.id)) fail(at, `calc ${b.id} input id "${i.id}" must be letters, digits, underscores`);
          for (const o of b.outputs) if (!Number.isFinite(evalExpr(o.expr, vars))) fail(at, `calc ${b.id} output "${o.label}" does not compute: ${o.expr}`);
          if (b.verdict && !Number.isFinite(evalExpr(b.verdict.expr, vars))) fail(at, `calc ${b.id} verdict does not compute: ${b.verdict.expr}`);
        }
        if (b.type === 'sheet') {
          const maxCol = b.columns.length;
          const maxRow = b.rows.length + 1;
          b.rows.forEach((r, ri) => {
            if (r.length > maxCol) fail(at, `sheet ${b.id} row ${ri + 2} has ${r.length} cells for ${maxCol} columns`);
            r.forEach((cell) => {
              if (!cell.startsWith('=')) return;
              for (const m of cell.matchAll(/\b([A-Z]{1,2})(\d+)\b/g)) {
                const col = m[1].length === 1 ? m[1].charCodeAt(0) - 64 : 99;
                const row = Number(m[2]);
                if (col > maxCol || row < 1 || row > Math.max(maxRow, 200)) fail(at, `sheet ${b.id} formula ${cell} points outside the sheet (${m[0]})`);
              }
              if (/;/.test(cell)) fail(at, `sheet ${b.id} formula ${cell} uses ";" (locale-dependent)`);
            });
          });
        }
      }
    }
    const text = all.join('\n');
    for (const [re, what] of [
      [/[—–]/, 'em or en dash'],
      [/[!¡]/, 'exclamation mark'],
      [/[^\s] - /, '" - " used as a dash'],
    ] as const) {
      const m = text.match(re);
      if (m) {
        const i = text.indexOf(m[0]);
        fail(at, `${what}: ...${text.slice(Math.max(0, i - 40), i + 40).replace(/\n/g, ' ')}...`);
      }
    }
    if (lang === 'es') {
      const m = text.match(TU);
      if (m) {
        const i = text.search(TU);
        fail(at, `tú form "${m[0]}": ...${text.slice(Math.max(0, i - 40), i + 40).replace(/\n/g, ' ')}...`);
      }
    }
    console.log(`ok ${at}: ${c.sections.length} sections`);
  }
}

if (failures) {
  console.error(`\n${failures} failure(s)`);
  process.exit(1);
}
