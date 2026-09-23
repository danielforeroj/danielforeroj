import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE } from '../data/siteConfig';
import { LANGS, LOCALE, OG_LOCALE, basePath, langOfPath, localePath, nativeLang } from './i18n';

type JsonLd = Record<string, unknown>;

type SeoProps = {
  /** Full <title> text, already including any site-name suffix. */
  title: string;
  description: string;
  /**
   * Route path beginning with "/", as it appears in this language ("/es/blog",
   * "/en/ai"). Drives canonical, og:url, <html lang> and the hreflang pair.
   */
  path: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
  jsonLd?: JsonLd[];
  /** Overrides <html lang>, which otherwise follows the language of `path`. */
  htmlLang?: string;
};

/**
 * Per-route head, rendered through vite-react-ssg's Head so the title,
 * description, canonical and JSON-LD land in the prerendered HTML.
 *
 * This replaces lib/seo.ts's applyPageSEO, which mutated document.head from a
 * useEffect. That only ever ran in a browser, so a crawler that does not
 * execute JavaScript saw the one hardcoded title from index.html on all eight
 * pages, and no canonical or structured data anywhere.
 */
export const Seo: React.FC<SeoProps> = ({
  title,
  description,
  path,
  ogType = 'website',
  ogImage,
  keywords,
  noIndex,
  jsonLd,
  htmlLang,
}) => {
  // The path is appended verbatim, so "/" yields "https://danielforeroj.com/".
  // It used to be stripped, which made the homepage canonical disagree with the
  // sitemap entry byte-for-byte. Both now emit the trailing-slash form, which is
  // also what the origin serves.
  const url = `${SITE.url}${path}`;
  const image = ogImage ?? SITE.defaultOgImage;

  // Every page exists in both languages, so every page names both, plus the
  // unprefixed URL as x-default: it is the one that existed first. The pair is
  // reciprocal because both pages compute it from the same base path.
  const lang = langOfPath(path);
  const base = basePath(path);
  const alternates = LANGS.map((l) => ({ hreflang: LOCALE[l].slice(0, 2), href: `${SITE.url}${localePath(base, l)}` }));
  const xDefault = `${SITE.url}${localePath(base, nativeLang(base))}`;

  // Head writes the title into the prerendered HTML, but on a client-side
  // navigation the new page's Head mounts while the old one unmounts and the
  // document keeps the previous title: every route change left the tab, and the
  // title GTM reports, showing whichever page was loaded first. Setting it here
  // is what the visitor actually sees, and it costs one assignment.
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  React.useEffect(() => {
    const el = document.querySelector('meta[name="description"]');
    if (el) el.setAttribute('content', description);
  }, [description]);

  return (
    <Head>
      <html lang={htmlLang ?? lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {alternates.map((a) => (
        <link key={a.hreflang} rel="alternate" hrefLang={a.hreflang} href={a.href} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={xDefault} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.filter(Boolean).join(', ')} />
      )}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={url} />
      <meta property="og:locale" content={OG_LOCALE[lang]} />
      {LANGS.filter((l) => l !== lang).map((l) => (
        <meta key={l} property="og:locale:alternate" content={OG_LOCALE[l]} />
      ))}
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd?.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Head>
  );
};

export default Seo;
