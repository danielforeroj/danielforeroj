import React from 'react';
import { NavLink } from 'react-router-dom';
import { ABOUT } from '../data/about';
import { COMPANY, ENTITY_PROFILES } from '../data/entity';
import { PROFILE } from '../data/profile';
import { SITE } from '../data/siteConfig';
import Seo from '../lib/SeoHead';
import { buildBreadcrumbListJsonLd, buildFaqJsonLd, buildProfilePageJsonLd } from '../lib/seo';
import { localePath, useLang } from '../lib/i18n';

// The entity home: the one page that says who Daniel Forero is, links every
// official profile, and carries the Person as a ProfilePage. /about in English,
// /es/sobre-mi in Spanish. Copy lives in data/about.ts, facts in data/entity.ts.

const portraitModule = import.meta.glob('../content/portrait.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;
const portrait: string | undefined = Object.values(portraitModule)[0];

const AboutPage: React.FC = () => {
  const lang = useLang();
  const t = ABOUT[lang];
  const path = localePath('/about', lang);
  const url = `${SITE.url}${path}`;

  const divisions = [
    { name: COMPANY.name, url: COMPANY.url },
    ...COMPANY.department.map((d) => ({ name: d.name, url: d.url })),
  ];

  return (
    <section className="aif">
      <Seo
        title={t.title}
        description={t.description}
        path={path}
        ogType="profile"
        jsonLd={[
          buildProfilePageJsonLd(lang, url, t.title, t.description),
          buildFaqJsonLd(t.faq, lang),
          buildBreadcrumbListJsonLd([
            { name: t.crumbHome, url: `${SITE.url}${localePath('/', lang)}` },
            { name: t.crumbAbout, url },
          ]),
        ]}
      />
      <article className="aif-panel about">
        <div className="aif-step">
          <p className="aif-kicker">{t.kicker}</p>
          {portrait ? (
            <div className="c-portrait about__portrait">
              <img src={portrait} alt={t.portraitAlt} width={900} height={900} />
            </div>
          ) : null}
          <h1 className="aif-title">{t.h1}</h1>
          <p className="aif-body about__lede">{t.lede}</p>

          {t.sections.map((s) => (
            <section key={s.heading} className="about__section">
              <h2 className="about__h2">{s.heading}</h2>
              {s.paragraphs.map((p) => (
                <p key={p.slice(0, 32)} className="aif-body">
                  {p}
                </p>
              ))}
            </section>
          ))}

          <section className="about__section" aria-labelledby="about-profiles">
            <h2 id="about-profiles" className="about__h2">
              {t.profilesHeading}
            </h2>
            <p className="aif-body">{t.profilesBody}</p>
            <ul className="aif-points">
              {ENTITY_PROFILES.map((p) => (
                <li key={p.url}>
                  {p.name}:{' '}
                  <a className="about__a" href={p.url} rel="me noopener" target="_blank">
                    {p.url.replace(/^https:\/\/(www\.)?/, '')}
                  </a>
                </li>
              ))}
              <li>
                {t.emailLabel}:{' '}
                <a className="about__a" href={`mailto:${PROFILE.email}`}>
                  {PROFILE.email}
                </a>
              </li>
            </ul>
          </section>

          <section className="about__section" aria-labelledby="about-company">
            <h2 id="about-company" className="about__h2">
              {t.companyHeading}
            </h2>
            <ul className="aif-points">
              {divisions.map((d) => (
                <li key={d.url}>
                  {d.name}:{' '}
                  <a className="about__a" href={d.url} rel="noopener" target="_blank">
                    {d.url.replace(/^https:\/\//, '').replace(/\/$/, '')}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <section className="about__section" aria-labelledby="about-faq">
            <h2 id="about-faq" className="about__h2">
              {t.faqHeading}
            </h2>
            {t.faq.map((f) => (
              <div key={f.q} className="about__qa">
                <h3 className="about__h3">{f.q}</h3>
                <p className="aif-body">{f.a}</p>
              </div>
            ))}
          </section>

          <div className="aif-actions">
            <NavLink to={localePath('/work-w-me', lang)} className="aif-btn">
              {t.cta}
            </NavLink>
          </div>
        </div>
      </article>
    </section>
  );
};

export default AboutPage;
