import React from 'react';
import Button from '../components/Button';
import { PROFILE } from '../data/profile';
import { SITE } from '../data/siteConfig';
import Seo from '../lib/SeoHead';

// The subject line arrives filled in, so a reply thread starts with something
// to sort on rather than "Hi".
const MAILTO = `mailto:${PROFILE.email}?subject=${encodeURIComponent('Work with me')}`;

const WorkWithMePage: React.FC = () => {
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
        title={`Work with me | ${SITE.name}`}
        description="Write to Daniel Forero about AI operations, growth, positioning, partnerships, or the operating plan behind a company at the frontier."
        path="/work-w-me"
        noIndex
      />
      <header className="page-header">
        <p className="section-kicker">Advisory and execution</p>
        <h1 className="page-title">Work with me</h1>
        <p className="article-excerpt">
          Write to me. I read every email myself, and I answer the ones with enough in them to answer.
        </p>
      </header>

      <div className="contact-card">
        <p className="section-kicker">What helps</p>
        <ul>
          <li>What the company does, and where it operates.</li>
          <li>What is actually stuck: growth, AI operations, positioning, partnerships, fundraising.</li>
          <li>What you have already tried.</li>
          <li>The timeline you are working against.</li>
        </ul>
      </div>

      <div className="button-row">
        <Button href={MAILTO} as="a" variant="cta1">
          {PROFILE.email}
        </Button>
      </div>
    </section>
  );
};

export default WorkWithMePage;
