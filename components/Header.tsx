import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Index" },
  { to: "/blog", label: "Writing" },
  { to: "/research", label: "Research" },
  { to: "/leads", label: "Downloads" },
  { to: "/virtual-coffee", label: "Coffee" },
  { to: "/work-w-me", label: "Work with me" },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link--active" : ""}`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `mobile-nav-link ${isActive ? "mobile-nav-link--active" : ""}`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="brand-mark" onClick={closeMenu} aria-label="Daniel Forero home">
          <span className="brand-mark__tick" aria-hidden="true" />
          <span className="brand-mark__name">Daniel Forero</span>
        </NavLink>

        <nav className="site-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setIsMenuOpen((v) => !v)}
          className="menu-button"
          aria-controls="mobile-menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <span aria-hidden="true">{isMenuOpen ? "Close" : "Menu"}</span>
        </button>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="mobile-nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={mobileNavLinkClass} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
