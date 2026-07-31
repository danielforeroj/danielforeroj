import type { RouteRecord } from 'vite-react-ssg';
import Layout from './Layout';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import VirtualCoffeePage from './pages/VirtualCoffeePage';
import WorkWithMePage from './pages/WorkWithMePage';
import { PostType } from './types';
import { posts } from './data/mockData';

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
      { path: 'blog', element: <PostListPage type={PostType.BLOG} title="Blog" /> },
      { path: 'research', element: <PostListPage type={PostType.RESEARCH} title="Research" /> },
      { path: 'leads', element: <PostListPage type={PostType.LEAD_MAGNET} title="Downloads" /> },
      {
        path: 'post/:slug',
        element: <PostDetailPage />,
        getStaticPaths: () => posts.map((post) => `/post/${post.slug}`),
      },
      { path: 'virtual-coffee', element: <VirtualCoffeePage /> },
      { path: 'work-w-me', element: <WorkWithMePage /> },
    ],
  },
];
