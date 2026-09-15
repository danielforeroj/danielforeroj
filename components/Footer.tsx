import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <p>Daniel Forero</p>
      <div className="site-footer__line" aria-hidden="true" />
      <span>Operate &middot; Build &middot; Back &middot; {currentYear}</span>
    </footer>
  );
};

export default Footer;
