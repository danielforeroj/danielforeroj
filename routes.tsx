import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import VirtualCoffeePage from './pages/VirtualCoffeePage';
import WorkWithMePage from './pages/WorkWithMePage';
import GrowPage from './pages/GrowPage';
import GeoPage from './pages/GeoPage';
import AiFunnelPage from './pages/ai/AiFunnelPage';
import AiLibraryPage from './pages/ai/AiLibraryPage';
import AiResourcePage, { RESOURCE_SHELL_KEY } from './pages/ai/AiResourcePage';
import NotFoundPage from './pages/NotFoundPage';
import { PostType } from './types';
import { posts } from './data/mockData';
import { SECTIONS } from './data/siteConfig';
import { localePath, type Lang } from './lib/i18n';

// Every route below is prerendered to real HTML at build time. The dynamic
// /post/:slug route needs getStaticPaths so the generator knows which slugs
// exist; it reads the same posts array the page renders from, so the two can
// never drift.
//
// Every page exists twice, once per language (see lib/i18n.ts). The site's
// pages keep their URLs in English and gain a Spanish twin under /es; the AI
// funnel keeps its URLs in Spanish and gains an English twin under /en. The
// pages read their language from the URL, so each pair shares one component.

type Child = NonNullable<RouteRecord['children']>[number];

/** The site's own pages, in English at the root or in Spanish under /es. */
const sitePages = (lang: Lang): Child[] => {
  const p = (base: string) => localePath(base, lang).slice(1);
  return [
    lang === 'en' ? { index: true, element: <HomePage /> } : { path: p('/'), element: <HomePage /> },

    // Unpublished sections are left out of the tree entirely rather than
    // rendered and hidden, so they are never prerendered, never enter the
    // sitemap, and 404 rather than serving an empty list. See SECTIONS.
    ...(SECTIONS.blog ? [{ path: p('/blog'), element: <PostListPage type={PostType.BLOG} /> }] : []),
    ...(SECTIONS.research ? [{ path: p('/research'), element: <PostListPage type={PostType.RESEARCH} /> }] : []),
    ...(SECTIONS.downloads ? [{ path: p('/leads'), element: <PostListPage type={PostType.LEAD_MAGNET} /> }] : []),
    {
      path: p('/post/:slug'),
      element: <PostDetailPage />,
      getStaticPaths: () => posts.map((post) => localePath(`/post/${post.slug}`, lang)),
    },
    { path: p('/virtual-coffee'), element: <VirtualCoffeePage /> },
    { path: p('/work-w-me'), element: <WorkWithMePage /> },
  ];
};

/**
 * The entry pages for the social feeds' other pillars (2026-09-24), written in
 * Spanish first: the growth diagnostic at /crecer (English /en/grow) and the
 * free GEO scan at /geo (English /en/geo). /ai and /work-w-me are the other two.
 */
const entryPages = (lang: Lang): Child[] => {
  const p = (base: string) => localePath(base, lang).slice(1);
  return [
    { path: p('/crecer'), element: <GrowPage /> },
    { path: p('/geo'), element: <GeoPage /> },
  ];
};

/** The AI funnel, in Spanish at /ai or in English under /en/ai. */
const aiPages = (lang: Lang): Child[] => {
  const p = (base: string) => localePath(base, lang).slice(1);
  return [
    { path: p('/ai'), element: <AiFunnelPage /> },
    { path: p('/ai/recursos'), element: <AiLibraryPage /> },
    // Keys are per visitor and unknown at build time, so the reader is
    // prerendered once under a placeholder segment and vercel.json rewrites
    // every /ai/recursos/:key (and /en/ai/recursos/:key) to that file. The page
    // reads the real key from the URL after hydration.
    {
      path: p('/ai/recursos/:key'),
      element: <AiResourcePage />,
      getStaticPaths: () => [localePath(`/ai/recursos/${RESOURCE_SHELL_KEY}`, lang)],
    },
  ];
};

export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      ...sitePages('en'),
      ...sitePages('es'),
      ...entryPages('es'),
      ...entryPages('en'),
      ...(SECTIONS.ai ? [...aiPages('es'), ...aiPages('en')] : []),
      // Catch-all. The generator skips any path containing "*", so the wildcard
      // alone would prerender nothing; getStaticPaths names /404 explicitly,
      // which renders this element to dist/404.html, the file Vercel serves
      // for an unmatched path, and /es/404 for its Spanish twin. It also keeps
      // the same component on screen for client-side navigation to a dead link.
      {
        path: '*',
        element: <NotFoundPage />,
        getStaticPaths: () => ['/404', localePath('/404', 'es')],
      },
    ],
  },
];
