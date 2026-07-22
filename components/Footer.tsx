import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer__line" aria-hidden="true" />
      <p>Daniel Forero</p>
      <span>{currentYear}</span>
    </footer>
  );
};

export default Footer;
