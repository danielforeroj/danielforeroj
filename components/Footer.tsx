import React from 'react';
import { useUi } from '../lib/i18n';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const t = useUi();
  return (
    <footer className="site-footer">
      <p>Daniel Forero</p>
      <div className="site-footer__line" aria-hidden="true" />
      <span>{t.footerLine} &middot; {currentYear}</span>
    </footer>
  );
};

export default Footer;
