import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import VirtualCoffeePage from './pages/VirtualCoffeePage';
import WorkWithMePage from './pages/WorkWithMePage';
import { PostType } from './types';
import SkipToContent from './components/SkipToContent';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="site-shell flex min-h-screen flex-col">
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<PostListPage type={PostType.BLOG} title="Blog" />} />
            <Route path="/research" element={<PostListPage type={PostType.RESEARCH} title="Research" />} />
            <Route path="/leads" element={<PostListPage type={PostType.LEAD_MAGNET} title="Downloads" />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
            <Route path="/virtual-coffee" element={<VirtualCoffeePage />} />
            <Route path="/work-w-me" element={<WorkWithMePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
