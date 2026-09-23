# danielforeroj.com

Vite + React, prerendered to static HTML with vite-react-ssg, deployed on Vercel.

```
npm install
npm run dev         # local dev server
npm run typecheck   # tsc, no emit
npm run build       # prerender every route, then write dist/sitemap.xml and dist/llms.txt
```

## Two languages

Every page on the site exists in English and in Spanish. The language is the URL,
and the logic lives in `lib/i18n.ts`.

| Page | English | Spanish |
| --- | --- | --- |
| Home | `/` | `/es` |
| Blog index | `/blog` | `/es/blog` |
| Post | `/post/:slug` | `/es/post/:slug` |
| Work with me | `/work-w-me` | `/es/work-w-me` |
| Virtual Coffee | `/virtual-coffee` | `/es/virtual-coffee` |
| 404 | `/404` | `/es/404` |
| AI guide | `/en/ai` | `/ai` |
| AI library | `/en/ai/recursos` | `/ai/recursos` |
| AI resource | `/en/ai/recursos/:key` | `/ai/recursos/:key` |

Every URL that existed before keeps working and keeps its language: the site was
written in English, so its translation lives under `/es`; the `/ai` guide was
written in Spanish, so its translation lives under `/en`. The unprefixed URL is
also the `x-default` hreflang. Tracking links such as `/ai?r=ig` are untouched,
and the language switcher carries the query string across, so the attribution
survives a switch. Old `?lang=en` links on the guide are redirected to `/en/ai`.

What handles what:

- `lib/i18n.ts`: the URL scheme (`localePath`, `altHref`, `useLang`) and all the
  interface copy (nav, footer, page titles and descriptions, 404, and so on) in
  both languages.
- `data/profile.ts`: the homepage. `PROFILE` is English, `PROFILE_ES` is Spanish
  and reuses every name, URL and figure from `PROFILE`.
- `data/posts/*.ts`: one post per file, both languages in the same file.
- `lib/ai/copy.ts`: the AI guide's own interface copy. Its questions, screens and
  resources come from the API, already in both languages.
- `lib/SeoHead.tsx`: `<html lang>`, canonical, `hreflang` (en, es, x-default) and
  `og:locale` on every page, computed from the page's path.
- `components/Header.tsx`: the EN / ES switcher on every page.
- `routes.tsx`: registers every page once per language.
- `scripts/gen-sitemap.mjs`: lists both languages, each with its alternates.

To translate a new piece of interface text, add the key to both `en` and `es` in
`lib/i18n.ts`; the `es` object must have the same shape as `en` or it will not
typecheck.

## Adding a post

1. Copy `content/post-template.ts` to `data/posts/<slug>.ts`.
2. Fill in the English copy at the top level (`title`, `excerpt`,
   `metaDescription`, `content_md`, `tags`) and the Spanish copy under `es`. `es`
   is required, so a post without its translation fails `npm run typecheck`.
   The translation carries the same claims, figures and links as the English.
   Spanish is Latin American and addresses the reader as "tú".
3. `export default` the post and add it to the array in `data/posts/index.ts`.
4. `npm run typecheck && npm run build`. Both `/post/<slug>` and
   `/es/post/<slug>` are prerendered and added to the sitemap with no other
   wiring.

`metaDescription` is optional and should stay under 158 characters in each
language; without it the excerpt is used. Post bodies are Markdown-like:
headings, lists, quotes, emphasis and `http(s)` links.
