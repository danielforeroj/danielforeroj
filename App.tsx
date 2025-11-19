import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import { PostType } from './types';
import SkipToContent from './components/SkipToContent';
import ThemePicker from './components/ThemePicker';
import { generatePalette } from './themes/colorPalettes';
import { applyAccentTokens, persistThemeAndAccent, defaultPalette, ThemeMode } from "./themes/colorPalettes";


/* ---------- Utilities ---------- */
const THEME_KEY = 'df_theme';   // 'light' | 'dark' | 'system'
const ACCENT_KEY = 'df_accent'; // hex like '#000000'

const LIGHT_BG = '#f8f9fb';
const DARK_BG  = '#1b1c1e';

const metaTheme =
  (typeof document !== 'undefined' && document.querySelector('meta[name="theme-color"]')) as HTMLMetaElement | null;

function contrastText(hex: string) {
  const h = hex.replace('#', '');
  const n = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
  const num = parseInt(n, 16);
  const r = (num >> 16) & 255, g = (num >> 8) & 255, b = num & 255;
  const conv = (v: number) => (v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  const L = 0.2126 * conv(r) + 0.7152 * conv(g) + 0.0722 * conv(b);
  return L > 0.5 ? '#000000' : '#ffffff';
}

/* ---------- Scroll to top on route change ---------- */
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App: React.FC = () => {
  /* ---------- State ---------- */
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark' | 'system') || 'system';
  });
  const [accent, setAccent] = useState<string>(() => {
    return localStorage.getItem(ACCENT_KEY) || '#000000';
  });

  /* ---------- Apply Theme ---------- */
  const applyTheme = useCallback((mode: 'light' | 'dark' | 'system') => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');

    let finalMode = mode;
    if (mode === 'system') {
      finalMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    root.dataset.theme = finalMode;
    root.classList.add(finalMode);
    root.style.colorScheme = finalMode;

    if (metaTheme) metaTheme.setAttribute('content', finalMode === 'dark' ? DARK_BG : LIGHT_BG);
  }, []);

  /* ---------- Apply Accent ---------- */
  const applyAccent = useCallback((hex: string) => {
    const on = contrastText(hex);
    const s = document.documentElement.style;

    // Core tokens + Tailwind ring fallback
    s.setProperty('--accent', hex);
    s.setProperty('--accent-contrast', on);
    s.setProperty('--md-sys-color-primary', hex);
    s.setProperty('--md-sys-color-on-primary', on);
    s.setProperty('--md-sys-color-secondary', hex);
    s.setProperty('--md-sys-color-on-secondary', on);
    s.setProperty('--tw-ring-color', `color-mix(in srgb, ${hex} 45%, transparent)`);
    s.setProperty('--df-accent-10', `color-mix(in srgb, ${hex} 10%, transparent)`);
    s.setProperty('--df-accent-30', `color-mix(in srgb, ${hex} 30%, transparent)`);

    // Optional: generate M3-like extended palette (kept for your components)
    const p = generatePalette(hex);
    Object.entries(p).forEach(([k, v]) => s.setProperty(`--md-sys-color-${k.replaceAll('_', '-')}`, v));
  }, []);

  /* ---------- Effects ---------- */
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, applyTheme]);

  useEffect(() => {
    applyAccent(accent);
    localStorage.setItem(ACCENT_KEY, accent);
  }, [accent, applyAccent]);

  // Track system changes if user chose 'system'
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handle = () => {
      if (localStorage.getItem(THEME_KEY) === 'system') applyTheme('system');
    };
    mq.addEventListener('change', handle);
    return () => mq.removeEventListener('change', handle);
  }, [applyTheme]);

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
        <ThemePicker
          currentTheme={theme}
          currentAccent={accent}
          onThemeChange={setTheme}
          onAccentChange={setAccent}
        />
      </div>
    </BrowserRouter>
  );
};

export default App;
