import React from 'react';
import { SITE } from '../data/siteConfig';
import Seo from '../lib/SeoHead';

const WorkWithMePage: React.FC = () => {
  return (
    <section className="page">
      {/*
        Description is the page's standfirst, named. "Schedule time" on its own
        does not say with whom, which is the one fact a search result needs.

        noindex, for the same reason as /virtual-coffee: the page is a booking
        embed, the scheduler lives in a cross-origin iframe, and a crawler sees
        roughly ten words of body text. See VirtualCoffeePage for the full note.
      */}
      <Seo
        title={`Work with me | ${SITE.name}`}
        description="Schedule time with Daniel Forero to pressure-test positioning, GTM, partnerships, narrative, or the operating plan behind growth."
        path="/work-w-me"
        noIndex
      />
      <header className="page-header">
        <p className="section-kicker">Advisory and execution</p>
        <h1 className="page-title">Work with me</h1>
        <p className="article-excerpt">
          Schedule time to pressure-test positioning, GTM, partnerships, narrative, or the operating plan behind growth.
        </p>
      </header>

      <div className="embed-card">
        <iframe
          title="Work with Daniel Forero"
          src="https://app.onecal.io/b/dnaielforeroj/work-with-me"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
};

export default WorkWithMePage;
