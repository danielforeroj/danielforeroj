import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import { PostType } from './types';
import SkipToContent from './components/SkipToContent';
import ThemePicker from './components/ThemePicker';
import { applyAccentTokens, persistThemeAndAccent, readTheme, readAccent, ThemeMode } from './themes/colorPalettes';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [theme, setTheme]   = React.useState<ThemeMode>(readTheme());
  const [accent, setAccent] = React.useState<string>(readAccent());

  // paint once on mount (and persist current values)
  React.useEffect(() => {
    applyAccentTokens(accent, theme);
    persistThemeAndAccent(theme, accent);
  }, []); // eslint-disable-line

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div
        className="flex flex-col min-h-screen"
        style={{ background: 'var(--md-sys-color-background)', color: 'var(--md-sys-color-on-background)' }}
      >
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<PostListPage type={PostType.BLOG} title="Blog" />} />
            <Route path="/research" element={<PostListPage type={PostType.RESEARCH} title="Research" />} />
            <Route path="/leads" element={<PostListPage type={PostType.LEAD_MAGNET} title="Downloads" />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
          </Routes>
        </main>
        <Footer />
        {/* no props — ThemePicker manages its own state and writes tokens */}
        <ThemePicker />
      </div>
    </BrowserRouter>
  );
};

export default App;
