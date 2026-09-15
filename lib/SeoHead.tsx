import React from 'react';
import { Head } from 'vite-react-ssg';
import { SITE } from '../data/siteConfig';

type JsonLd = Record<string, unknown>;

type SeoProps = {
  /** Full <title> text, already including any site-name suffix. */
  title: string;
  description: string;
  /** Route path beginning with "/". Drives canonical and og:url. */
  path: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
  jsonLd?: JsonLd[];
  /** Overrides <html lang> for a page whose content is not in the site's default language. */
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
      {htmlLang ? <html lang={htmlLang} /> : null}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
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
