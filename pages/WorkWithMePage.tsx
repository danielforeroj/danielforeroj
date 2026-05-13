import React from 'react';

const WorkWithMePage: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-5xl">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Work with me</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          Schedule time to explore how we can work together.
        </p>
      </header>

      <div
        className="w-full overflow-hidden rounded-2xl border shadow-sm"
        style={{
          borderColor: 'var(--md-sys-color-outline-variant)',
          background: 'var(--md-sys-color-surface)',
        }}
      >
        <iframe
          title="Work with Daniel Forero"
          width="100%"
          height="1000"
          src="https://app.onecal.io/b/dnaielforeroj/work-with-me"
          frameBorder="0"
          className="block w-full"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </section>
  );
};

export default WorkWithMePage;
