import React from 'react';

const WorkWithMePage: React.FC = () => {
  return (
    <section className="page">
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
