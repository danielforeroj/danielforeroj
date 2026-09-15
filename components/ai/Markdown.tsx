import { Fragment, type ReactNode } from 'react';

// A deliberately small markdown subset for resource bodies. It builds React
// elements directly, so text is escaped by React and no HTML string ever
// reaches the DOM. Anything outside the subset renders as literal text.

type ListItem = { text: string; children: ListNode | null };
type ListNode = { ordered: boolean; start: number; items: ListItem[] };

const FENCE = /^\s{0,3}(`{3,}|~{3,})/;
const HEADING = /^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
const QUOTE = /^\s{0,3}>\s?/;
const LIST = /^(\s*)([-*+]|\d{1,9}[.)])\s+(.*)$/;
const RULE = /^\s{0,3}([-*_])(\s*\1){2,}\s*$/;

// code | link | **bold** | __bold__ | *italic* | _italic_
const INLINE =
  /`([^`\n]+)`|\[([^\]\n]+)\]\(\s*([^()\s]+)(?:\s+"[^"\n]*")?\s*\)|\*\*([^\s*](?:[^\n]*?[^\s*])?)\*\*|__([^\s_](?:[^\n]*?[^\s_])?)__|\*([^\s*](?:[^*\n]*?[^\s*])?)\*|_([^\s_](?:[^_\n]*?[^\s_])?)_/g;

const WORD = /[A-Za-z0-9À-ɏ]/;

// Only web, mail and in-site links. A leading "//" or "/\" would leave the site.
function safeHref(raw: string): string | null {
  const u = raw.trim();
  if (/^(https?:\/\/|mailto:)/i.test(u)) return u;
  if (u.startsWith('/') && !u.startsWith('//') && !u.startsWith('/\\')) return u;
  return null;
}

function renderInline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = new RegExp(INLINE.source, 'g');
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    const start = m.index;
    const end = start + m[0].length;
    // Underscores inside words (snake_case) are not emphasis. Checked by hand
    // because lookbehind breaks older in-app browsers.
    if (m[7] !== undefined && (WORD.test(text[start - 1] ?? '') || WORD.test(text[end] ?? ''))) {
      re.lastIndex = start + 1;
      continue;
    }
    if (start > last) out.push(text.slice(last, start));
    const k = `${key}.${out.length}`;
    if (m[1] !== undefined) {
      out.push(<code key={k}>{m[1]}</code>);
    } else if (m[2] !== undefined) {
      const href = safeHref(m[3]);
      const children = renderInline(m[2], k);
      out.push(href ? <a key={k} href={href}>{children}</a> : <Fragment key={k}>{children}</Fragment>);
    } else if (m[4] !== undefined || m[5] !== undefined) {
      out.push(<strong key={k}>{renderInline(m[4] ?? m[5], k)}</strong>);
    } else {
      out.push(<em key={k}>{renderInline(m[6] ?? m[7], k)}</em>);
    }
    last = end;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function startsBlock(line: string): boolean {
  return FENCE.test(line) || HEADING.test(line) || QUOTE.test(line) || RULE.test(line) || LIST.test(line);
}

function parseList(lines: string[], from: number): [ListNode, number] {
  const first = LIST.exec(lines[from])!;
  const base = first[1].length;
  const ordered = /\d/.test(first[2]);
  const node: ListNode = { ordered, start: ordered ? parseInt(first[2], 10) : 1, items: [] };
  let i = from;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      // A blank line keeps the list going only when another item follows.
      let j = i + 1;
      while (j < lines.length && !lines[j].trim()) j++;
      const next = j < lines.length ? LIST.exec(lines[j]) : null;
      if (next && next[1].length >= base) {
        i = j;
        continue;
      }
      break;
    }
    const m = RULE.test(line) ? null : LIST.exec(line);
    if (m) {
      const indent = m[1].length;
      if (indent < base - 1) break;
      if (indent <= base + 1) {
        if (/\d/.test(m[2]) !== ordered) break;
        node.items.push({ text: m[3], children: null });
        i++;
        continue;
      }
      if (!node.items.length) break;
      const [child, after] = parseList(lines, i);
      const owner = node.items[node.items.length - 1];
      if (owner.children) owner.children.items.push(...child.items);
      else owner.children = child;
      i = after;
      continue;
    }
    if (!node.items.length || startsBlock(line)) break;
    const owner = node.items[node.items.length - 1];
    owner.text += ' ' + line.trim();
    i++;
  }
  return [node, i];
}

function renderList(node: ListNode, key: string): ReactNode {
  const items = node.items.map((item, n) => (
    <li key={n}>
      {renderInline(item.text, `${key}.${n}`)}
      {item.children && renderList(item.children, `${key}.${n}.c`)}
    </li>
  ));
  return node.ordered ? (
    <ol key={key} start={node.start !== 1 ? node.start : undefined}>
      {items}
    </ol>
  ) : (
    <ul key={key}>{items}</ul>
  );
}

function renderBlocks(md: string, key: string): ReactNode[] {
  const lines = md.split('\n');
  const out: ReactNode[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const k = `${key}.${out.length}`;

    if (!line.trim()) {
      i++;
      continue;
    }

    const fence = FENCE.exec(line);
    if (fence) {
      const marker = fence[1];
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(marker)) body.push(lines[i++]);
      i++;
      out.push(
        <pre key={k}>
          <code>{body.join('\n')}</code>
        </pre>,
      );
      continue;
    }

    const heading = HEADING.exec(line);
    if (heading) {
      // Levels shift down one so the page h1 stays the only h1.
      const level = Math.min(heading[1].length + 1, 5);
      const Tag = `h${level}` as 'h2' | 'h3' | 'h4' | 'h5';
      out.push(<Tag key={k}>{renderInline(heading[2], k)}</Tag>);
      i++;
      continue;
    }

    if (RULE.test(line)) {
      out.push(<hr key={k} />);
      i++;
      continue;
    }

    if (QUOTE.test(line)) {
      const body: string[] = [];
      while (i < lines.length && QUOTE.test(lines[i])) body.push(lines[i++].replace(QUOTE, ''));
      out.push(<blockquote key={k}>{renderBlocks(body.join('\n'), k)}</blockquote>);
      continue;
    }

    if (LIST.test(line)) {
      const [node, after] = parseList(lines, i);
      out.push(renderList(node, k));
      i = after;
      continue;
    }

    const para: string[] = [];
    while (i < lines.length && lines[i].trim() && (para.length === 0 || !startsBlock(lines[i]))) {
      para.push(lines[i++].trim());
    }
    out.push(<p key={k}>{renderInline(para.join(' '), k)}</p>);
  }
  return out;
}

export function Markdown({ md, inline }: { md: string; inline?: boolean }) {
  const source = typeof md === 'string' ? md.replace(/\r\n?/g, '\n') : '';
  if (inline) return <>{renderInline(source.replace(/\s*\n\s*/g, ' ').trim(), 'i')}</>;
  return <div className="air-md">{renderBlocks(source, 'b')}</div>;
}
