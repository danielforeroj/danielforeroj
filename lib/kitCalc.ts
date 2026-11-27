// The arithmetic of a kit's calculator (data/kits/types.ts, block "calc"). Expressions
// are written in the kit files: numbers, input ids, + - * / and parentheses, nothing
// else. Parsed here by hand so no kit text is ever evaluated as code.

type Tok = { k: 'num'; v: number } | { k: 'id'; v: string } | { k: 'op'; v: string };

function tokenize(src: string): Tok[] {
  const out: Tok[] = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) {
      i++;
    } else if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < src.length && /[0-9.]/.test(src[j])) j++;
      out.push({ k: 'num', v: Number(src.slice(i, j)) });
      i = j;
    } else if (/[A-Za-z_]/.test(c)) {
      // Ids are letters, digits and underscores: a dash is always a minus.
      let j = i;
      while (j < src.length && /[A-Za-z0-9_]/.test(src[j])) j++;
      out.push({ k: 'id', v: src.slice(i, j) });
      i = j;
    } else if ('+-*/()'.includes(c)) {
      out.push({ k: 'op', v: c });
      i++;
    } else {
      throw new Error(`bad char ${c}`);
    }
  }
  return out;
}

/** The value of `expr` with `vars`. NaN when it does not parse or divides by zero. */
export function evalExpr(expr: string, vars: Record<string, number>): number {
  let toks: Tok[];
  try {
    toks = tokenize(expr);
  } catch {
    return NaN;
  }
  let p = 0;
  const peek = () => toks[p];
  const isOp = (v: string) => peek()?.k === 'op' && peek()!.v === v;

  const primary = (): number => {
    const t = toks[p++];
    if (!t) return NaN;
    if (t.k === 'num') return t.v;
    if (t.k === 'id') return t.v in vars ? vars[t.v] : NaN;
    if (t.v === '(') {
      const v = sum();
      if (!isOp(')')) return NaN;
      p++;
      return v;
    }
    if (t.v === '-') return -primary();
    if (t.v === '+') return primary();
    return NaN;
  };
  const product = (): number => {
    let v = primary();
    while (isOp('*') || isOp('/')) {
      const op = toks[p++].v;
      const r = primary();
      v = op === '*' ? v * r : r === 0 ? NaN : v / r;
    }
    return v;
  };
  const sum = (): number => {
    let v = product();
    while (isOp('+') || isOp('-')) {
      const op = toks[p++].v;
      const r = product();
      v = op === '+' ? v + r : v - r;
    }
    return v;
  };
  const v = sum();
  return p === toks.length ? v : NaN;
}

/** A sheet as text: tab separated (pastes as a table in Sheets and Excel) or CSV. */
export function sheetText(columns: string[], rows: string[][], sep: '\t' | ','): string {
  const cell = (c: string) => {
    if (sep === '\t') return c.replace(/[\t\n]/g, ' ');
    return /[",\n]/.test(c) ? `"${c.replace(/"/g, '""')}"` : c;
  };
  return [columns, ...rows].map((r) => r.map(cell).join(sep)).join(sep === ',' ? '\r\n' : '\n');
}
