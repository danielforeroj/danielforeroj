import React from 'react';
import Button from '../components/Button';
import { PROFILE } from '../data/profile';
import { SITE } from '../data/siteConfig';
import Seo from '../lib/SeoHead';
import { localePath, useLang, useUi } from '../lib/i18n';

// The subject line arrives filled in, so a reply thread starts with something
// to sort on rather than "Hi". It is in the language the visitor was reading.
const mailto = (subject: string) => `mailto:${PROFILE.email}?subject=${encodeURIComponent(subject)}`;

const WorkWithMePage: React.FC = () => {
  const lang = useLang();
  const t = useUi().work;
  return (
    <section className="page">
      {/*
        This page used to embed a scheduler. It now asks for an email instead,
        so the first contact carries context rather than a calendar slot with no
        agenda behind it.

        Still noindex. The page is a short contact page reached from the site's
        own primary action, and a thin page asking to be a search result is the
        soft 404 pattern Search Console flagged this site for in 2026.
      */}
      <Seo
        title={`${t.title} | ${SITE.name}`}
        description={t.description}
        path={localePath('/work-w-me', lang)}
        noIndex
      />
      <header className="page-header">
        <p className="section-kicker">{t.kicker}</p>
        <h1 className="page-title">{t.title}</h1>
        <p className="article-excerpt">
          {t.standfirst}
        </p>
      </header>

      <div className="contact-card">
        <p className="section-kicker">{t.helpsKicker}</p>
        <ul>
          {t.helps.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </div>

      <div className="button-row">
        <Button href={mailto(t.mailSubject)} as="a" variant="cta1">
          {PROFILE.email}
        </Button>
      </div>
    </section>
  );
};

export default WorkWithMePage;
