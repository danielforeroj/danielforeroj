import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { SITE } from '../data/siteConfig';
import { localePath, useLang, useUi } from '../lib/i18n';
import Seo from '../lib/SeoHead';

type NotFoundPageProps = {
  /** Full <title>. Defaults to the site-wide not-found title. */
  title?: string;
  kicker?: string;
  heading?: string;
  body?: string;
  /** Route this stands in for. Drives canonical; the page is noindex either way. */
  path?: string;
};

/**
 * The catch-all. Registered in routes.tsx with getStaticPaths returning /404
 * and /es/404 so the generator emits dist/404.html (the file Vercel serves for
 * an unmatched path) and a Spanish twin. Without it the host falls back to its
 * own generic page, and a visitor who mistypes a URL lands somewhere that looks
 * like a different site.
 *
 * The copy follows the language of the URL, so a dead /es/... link reads in
 * Spanish once the page hydrates.
 *
 * noindex, so gen-sitemap.mjs drops it twice over: once on the /404 route name
 * and once on the robots meta.
 *
 * The markup is the "Post not found" branch that already lived in
 * PostDetailPage, lifted so both render identically instead of drifting.
 */
const NotFoundPage: React.FC<NotFoundPageProps> = (props) => {
  const lang = useLang();
  const t = useUi().notFound;
  const { pathname } = useLocation();
  const {
    title = `${t.title} | ${SITE.name}`,
    kicker = t.kicker,
    heading = t.heading,
    body = t.body,
    path = pathname.endsWith('/404') ? pathname : localePath('/404', lang),
  } = props;

  return (
    <div className="page">
      <Seo title={title} description={body} path={path} noIndex />
      <header className="page-header">
        <p className="section-kicker">{kicker}</p>
        <h1 className="page-title">{heading}</h1>
        <p className="article-excerpt">{body}</p>
      </header>
      <Button as={NavLink} to={localePath('/', lang)} variant="cta2">
        {t.home}
      </Button>
    </div>
  );
};

export default NotFoundPage;
