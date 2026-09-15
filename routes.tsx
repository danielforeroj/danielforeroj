import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import VirtualCoffeePage from './pages/VirtualCoffeePage';
import WorkWithMePage from './pages/WorkWithMePage';
import AiFunnelPage from './pages/ai/AiFunnelPage';
import AiLibraryPage from './pages/ai/AiLibraryPage';
import AiResourcePage, { RESOURCE_SHELL_KEY } from './pages/ai/AiResourcePage';
import NotFoundPage from './pages/NotFoundPage';
import { PostType } from './types';
import { posts } from './data/mockData';
import { SECTIONS } from './data/siteConfig';

// Every route below is prerendered to real HTML at build time. The dynamic
// /post/:slug route needs getStaticPaths so the generator knows which slugs
// exist; it reads the same posts array the page renders from, so the two can
// never drift.
export const routes: RouteRecord[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },

      // Unpublished sections are left out of the tree entirely rather than
      // rendered and hidden, so they are never prerendered, never enter the
      // sitemap, and 404 rather than serving an empty list. See SECTIONS.
      ...(SECTIONS.blog
        ? [{ path: 'blog', element: <PostListPage type={PostType.BLOG} title="Blog" /> }]
        : []),
      ...(SECTIONS.research
        ? [{ path: 'research', element: <PostListPage type={PostType.RESEARCH} title="Research" /> }]
        : []),
      ...(SECTIONS.downloads
        ? [{ path: 'leads', element: <PostListPage type={PostType.LEAD_MAGNET} title="Downloads" /> }]
        : []),
      {
        path: 'post/:slug',
        element: <PostDetailPage />,
        getStaticPaths: () => posts.map((post) => `/post/${post.slug}`),
      },
      { path: 'virtual-coffee', element: <VirtualCoffeePage /> },
      { path: 'work-w-me', element: <WorkWithMePage /> },
      ...(SECTIONS.ai
        ? [
            { path: 'ai', element: <AiFunnelPage /> },
            { path: 'ai/recursos', element: <AiLibraryPage /> },
            // Keys are per visitor and unknown at build time, so the reader is
            // prerendered once under a placeholder segment and vercel.json
            // rewrites every /ai/recursos/:key to that file. The page reads the
            // real key from the URL after hydration.
            {
              path: 'ai/recursos/:key',
              element: <AiResourcePage />,
              getStaticPaths: () => [`/ai/recursos/${RESOURCE_SHELL_KEY}`],
            },
          ]
        : []),
      // Catch-all. The generator skips any path containing "*", so the wildcard
      // alone would prerender nothing; getStaticPaths names /404 explicitly,
      // which renders this element to dist/404.html, the file Vercel serves
      // for an unmatched path. It also keeps the same component on screen for
      // client-side navigation to a dead link.
      {
        path: '*',
        element: <NotFoundPage />,
        getStaticPaths: () => ['/404'],
      },
    ],
  },
];
