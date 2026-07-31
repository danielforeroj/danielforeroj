// Push this site's URLs to IndexNow (Bing, Yandex, Seznam, Naver).
//
// Reads the live sitemap rather than a local list, so it can only ever submit
// URLs that are actually being served. Run AFTER a deploy is live, never
// before, or the engines fetch the old page and cache it.
//
//   npm run seo:ping

const HOST = 'danielforeroj.com'
const KEY = '2bc7b94bde5d41ddf0e9480e622c6126'
const ORIGIN = `https://${HOST}`

const sitemapUrl = `${ORIGIN}/sitemap.xml`
const res = await fetch(sitemapUrl)
if (!res.ok) {
  console.error(`[indexnow] cannot read ${sitemapUrl}: HTTP ${res.status}`)
  process.exit(1)
}
const xml = await res.text()
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])

if (!urlList.length) {
  console.error('[indexnow] sitemap contained no URLs, refusing to submit')
  process.exit(1)
}

// Confirm the key file is actually reachable before submitting. IndexNow
// rejects the whole batch if it cannot fetch the key, and a silent rejection
// is indistinguishable from success in the response body.
const keyRes = await fetch(`${ORIGIN}/${KEY}.txt`)
const keyBody = keyRes.ok ? (await keyRes.text()).trim() : ''
if (keyBody !== KEY) {
  console.error(`[indexnow] key file at /${KEY}.txt is missing or wrong (HTTP ${keyRes.status}). Deploy first.`)
  process.exit(1)
}

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `${ORIGIN}/${KEY}.txt`,
  urlList,
}

const submit = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
})

// 200 and 202 both mean accepted.
if (submit.ok) {
  console.log(`[indexnow] submitted ${urlList.length} URLs for ${HOST} (HTTP ${submit.status})`)
} else {
  console.error(`[indexnow] rejected: HTTP ${submit.status} ${await submit.text()}`)
  process.exit(1)
}
