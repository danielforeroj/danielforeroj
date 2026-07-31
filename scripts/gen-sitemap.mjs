// Generates dist/sitemap.xml and dist/llms.txt from the pages that were
// actually built.
//
// Reading dist/ rather than a hand-maintained list means the sitemap cannot
// drift from the site: a route that failed to prerender never reaches the
// sitemap, and a post added to data/mockData.ts appears without anyone
// remembering to update a second file.

import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const ORIGIN = 'https://danielforeroj.com'
const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

/** Every .html file under dist/, recursively. */
async function htmlFiles(dir) {
  const out = []
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) {
      if (entry.name === 'assets' || entry.name.startsWith('.')) continue
      out.push(...(await htmlFiles(full)))
    } else if (entry.name.endsWith('.html')) {
      out.push(full)
    }
  }
  return out
}

/** llms.txt is plain text, so attribute-escaped characters are turned back. */
function decode(value) {
  return value
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

/** dist/blog.html -> /blog ; dist/index.html -> / ; dist/post/x.html -> /post/x */
function routeFor(file) {
  const rel = relative(DIST, file).split(sep).join('/')
  if (rel === 'index.html') return '/'
  return '/' + rel.replace(/\.html$/, '')
}

const files = await htmlFiles(DIST)

const pages = (
  await Promise.all(
    files.map(async (file) => {
      const html = await readFile(file, 'utf8')
      // 404 is a status page, not a destination. noindex pages are excluded on
      // the same principle: a page we tell engines to skip does not belong in
      // the list of pages we are asking them to crawl.
      // Attribute-order agnostic: the renderer emits data-rh="true" first, so
      // anchoring on <meta name=... would silently match nothing.
      //
      // The value is read to its own closing delimiter via a backreference,
      // not to "the next quote of either kind". The renderer leaves an
      // apostrophe raw inside a double-quoted attribute, so the looser form
      // silently truncated any description containing one — /leads lost
      // everything after "Daniel Forero" in llms.txt.
      const metaContent = (name) =>
        decode(
          html.match(
            new RegExp(
              `<meta[^>]*name=["']${name}["'][^>]*content=(["'])([\\s\\S]*?)\\1`,
              'i',
            ),
          )?.[2] ?? '',
        )

      if (/noindex/i.test(metaContent('robots'))) return null
      const route = routeFor(file)
      if (route === '/404') return null
      const title = decode(
        (html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '').trim(),
      )
      const description = metaContent('description').trim()
      return { route, title, description }
    }),
  )
).filter(Boolean)

// Homepage first, then alphabetical, so the file is stable across builds.
pages.sort((a, b) =>
  a.route === '/' ? -1 : b.route === '/' ? 1 : a.route.localeCompare(b.route),
)

const lastmod = new Date().toISOString().slice(0, 10)

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) =>
      `  <url><loc>${ORIGIN}${p.route === '/' ? '/' : p.route}</loc><lastmod>${lastmod}</lastmod><changefreq>${
        p.route === '/' ? 'weekly' : 'monthly'
      }</changefreq><priority>${p.route === '/' ? '1.0' : '0.7'}</priority></url>`,
  )
  .join('\n')}
</urlset>
`

const llms = `# Daniel Forero

> Daniel Forero is an operator turned angel investor working across AI, Web3,
> quantum, and fintech. He builds businesses, then makes the world hear about
> them. He is Founder and CEO of Unbound Operators, the operating platform that
> On Duty and Selah both run under, a GTM mentor at Outlier Ventures, and an
> advisor to founders, funds, and governments.

This file lists every page on danielforeroj.com with a short description.

## Pages

${pages.map((p) => `- [${p.title}](${ORIGIN}${p.route}): ${p.description}`).join('\n')}
`

await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf8')
await writeFile(join(DIST, 'llms.txt'), llms, 'utf8')

console.log(`[seo] sitemap.xml + llms.txt written for ${pages.length} pages`)
