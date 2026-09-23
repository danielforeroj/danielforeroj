import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { SECTIONS } from "../data/siteConfig";
import { altHref, localePath, otherLang, useLang, useUi } from "../lib/i18n";

// Built from the same SECTIONS flags the router reads, so the nav can never
// advertise a section that has no route behind it. Paths are unprefixed here
// and localized at render time, so /blog becomes /es/blog on a Spanish page.
const LINKS = [
  { to: "/", key: "index" as const },
  ...(SECTIONS.blog ? [{ to: "/blog", key: "writing" as const }] : []),
  ...(SECTIONS.research ? [{ to: "/research", key: "research" as const }] : []),
  ...(SECTIONS.downloads ? [{ to: "/leads", key: "downloads" as const }] : []),
  // Virtual Coffee is deliberately not in the nav. The route still works and
  // still books, it is just handed out directly rather than offered to everyone
  // who lands on the site.
  { to: "/work-w-me", key: "work" as const },
];

/**
 * EN / ES. Each is a link to this same page in that language, so it works
 * without JavaScript and a crawler can follow it. The query string rides along,
 * which keeps an /ai?r=ig attribution intact when a visitor switches.
 */
export const LangSwitch: React.FC<{ className?: string }> = ({ className = "lang-switch" }) => {
  const { pathname, search, hash } = useLocation();
  const lang = useLang();
  const t = useUi();
  const other = otherLang(lang);
  const to = altHref(pathname, search, hash);

  return (
    <nav className={className} aria-label={t.langSwitchLabel}>
      {(["en", "es"] as const).map((l) =>
        l === lang ? (
          <span key={l} className="lang-switch__item lang-switch__item--active" aria-current="true" lang={l}>
            {l.toUpperCase()}
          </span>
        ) : (
          <Link
            key={l}
            to={to}
            className="lang-switch__item"
            hrefLang={l}
            lang={other}
            title={t.langSwitchTo}
            aria-label={t.langSwitchTo}
          >
            {l.toUpperCase()}
          </Link>
        ),
      )}
    </nav>
  );
};

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = useLang();
  const t = useUi();
  const links = LINKS.map((l) => ({ to: localePath(l.to, lang), label: t.nav[l.key], end: l.to === "/" }));

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "nav-link--active" : ""}`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
    `mobile-nav-link ${isActive ? "mobile-nav-link--active" : ""}`;

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to={localePath("/", lang)} end className="brand-mark" onClick={closeMenu} aria-label={t.homeAria}>
          <span className="brand-mark__tick" aria-hidden="true" />
          <span className="brand-mark__name">Daniel Forero</span>
        </NavLink>

        <nav className="site-nav" aria-label={t.primaryNav}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={navLinkClass}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__end">
          <LangSwitch />
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="menu-button"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">{t.openMenu}</span>
            <span aria-hidden="true">{isMenuOpen ? t.close : t.menu}</span>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div id="mobile-menu" className="mobile-nav">
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.end} className={mobileNavLinkClass} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
