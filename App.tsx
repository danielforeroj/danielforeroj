// App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import PostListPage from "./pages/PostListPage";
import PostDetailPage from "./pages/PostDetailPage";
import { PostType } from "./types";
import SkipToContent from "./components/SkipToContent";
import ThemePicker from "./components/ThemePicker";

import {
  applyAccentTokens,
  readTheme,
  readAccent,
  persistThemeAndAccent,
  ThemeMode,
} from "./themes/colorPalettes";

/* ---------- Scroll to top on route change ---------- */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Paint current theme/accent on first mount
  React.useEffect(() => {
    const theme: ThemeMode = readTheme();
    const accent: string = readAccent();
    applyAccentTokens(accent, theme);
    persistThemeAndAccent(theme, accent);

    const meta = document.querySelector('meta[name="theme-color"]') as HTMLMetaElement | null;
    if (meta) meta.content = theme === "dark" ? "#1B1C1E" : "#F8F9FB";
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-grow w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<PostListPage type={PostType.BLOG} title="Blog" />} />
            <Route path="/research" element={<PostListPage type={PostType.RESEARCH} title="Research" />} />
            <Route path="/leads" element={<PostListPage type={PostType.LEAD_MAGNET} title="Downloads" />} />
            <Route path="/post/:slug" element={<PostDetailPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <ThemePicker />
      </div>
    </BrowserRouter>
  );
};

export default App;
