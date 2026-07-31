import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SkipToContent from './components/SkipToContent';

// Scrolls to the top on client-side navigation. During prerendering there is no
// window, so the effect simply never runs.
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
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
