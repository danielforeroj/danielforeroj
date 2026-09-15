import React from 'react';
import { SITE } from '../data/siteConfig';
import Seo from '../lib/SeoHead';

const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/danielforeroj/' },
  { name: 'X', url: 'https://www.x.com/danielforeroj/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/danielforeroj/' },
];

const VirtualCoffeePage: React.FC = () => {
  return (
    <section className="page">
      {/*
        Description is the page's standfirst with the action the page actually
        offers put in front of it. The standfirst alone ran 95 characters, short
        enough that a search surface pads it with whatever else it can find.

        noindex. The page is a booking embed: the scheduler is an iframe from
        another origin, so everything a visitor comes here to use is invisible
        to a crawler, which sees about ten words of body text wrapped in nav and
        footer. Google reads that as a page with no content and files it under
        Soft 404, the reason Search Console flagged the site on 2026-08-07.
        Writing filler to pad the page would be writing for the crawler rather
        than the visitor, so the page stays as it is and stops asking to be
        indexed. gen-sitemap.mjs reads this meta, so sitemap.xml and llms.txt
        both drop the route on the next build with no second edit.

        The BreadcrumbList that used to be here went with it: structured data
        only shapes how a result is displayed, and this page has asked not to be
        a result. Emitting it anyway is telling Google how to render something
        we told it not to render.
      */}
      <Seo
        title={`Virtual Coffee | ${SITE.name}`}
        description="Book a virtual coffee with Daniel Forero: a focused conversation for ideas, intros, operator notes, or where AI and Web3 are headed next."
        path="/virtual-coffee"
        noIndex
      />
      <header className="page-header">
        <p className="section-kicker">Conversation</p>
        <h1 className="page-title">Virtual Coffee</h1>
        <p className="article-excerpt">
          A focused conversation for ideas, intros, operator notes, or where AI and Web3 are headed next.
        </p>
      </header>

      <div className="social-grid" style={{ marginBottom: 24 }}>
        {socials.map((social) => (
          <a key={social.name} href={social.url} target="_blank" rel="noreferrer" className="social-link">
            <span>{social.name}</span>
            <span aria-hidden="true">Open</span>
          </a>
        ))}
      </div>

      <div className="embed-card">
        <iframe
          title="Agenda un virtual coffee con Daniel Forero"
          src="https://unboundoperators.app/book/danielforeroj/intro-call"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="clipboard-write"
        />
      </div>
    </section>
  );
};

export default VirtualCoffeePage;
