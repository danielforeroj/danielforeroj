import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SkipToContent from './components/SkipToContent';
import { langOfPath } from './lib/i18n';

// Scrolls to the top on client-side navigation. During prerendering there is no
// window, so the effect simply never runs.
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// <html lang> is written into each prerendered page by lib/SeoHead, but Head
// does not update it on a client-side navigation, so moving from /blog to
// /es/blog would keep lang="en" and a screen reader would keep the English
// voice. This keeps it on the language of the route.
const HtmlLang: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    document.documentElement.lang = langOfPath(pathname);
  }, [pathname]);
  return null;
};

// The shell that used to live inside App.tsx's <BrowserRouter>. vite-react-ssg
// owns the router now, so this is a layout route wrapping every page via
// <Outlet />. The markup and class names are unchanged.
const Layout: React.FC = () => {
  return (
    <>
      <ScrollToTop />
      <HtmlLang />
      <div className="site-shell flex min-h-screen flex-col">
        <SkipToContent />
        <Header />
        <main id="main-content" className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
