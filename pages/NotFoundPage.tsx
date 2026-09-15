import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../components/Button';
import { SITE } from '../data/siteConfig';
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
 * The catch-all. Registered in routes.tsx with getStaticPaths returning /404 so
 * the generator emits dist/404.html, which is the file Vercel serves for an
 * unmatched path, without it the host falls back to its own generic page, and
 * a visitor who mistypes a URL lands somewhere that looks like a different site.
 *
 * noindex, so gen-sitemap.mjs drops it twice over: once on the /404 route name
 * and once on the robots meta.
 *
 * The markup is the "Post not found" branch that already lived in
 * PostDetailPage, lifted so both render identically instead of drifting.
 */
const NotFoundPage: React.FC<NotFoundPageProps> = ({
  title = `Page not found | ${SITE.name}`,
  kicker = 'Error 404',
  heading = 'Page not found',
  body = 'That page does not exist. It may have moved, or the link that brought you here may be wrong.',
  path = '/404',
}) => (
  <div className="page">
    <Seo title={title} description={body} path={path} noIndex />
    <header className="page-header">
      <p className="section-kicker">{kicker}</p>
      <h1 className="page-title">{heading}</h1>
      <p className="article-excerpt">{body}</p>
    </header>
    <Button as={NavLink} to="/" variant="cta2">
      Go back home
    </Button>
  </div>
);

export default NotFoundPage;
