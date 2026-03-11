import React from 'react';

const VirtualCoffeePage: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Virtual Coffee</h1>
        <p className="text-base sm:text-lg" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          Agenda una conversación rápida conmigo. El calendario se adapta a móvil, tablet y escritorio.
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
          title="Agenda un virtual coffee con Daniel Forero"
          src="https://app.onecal.io/b/dnaielforeroj/virtual-coffee"
          className="w-full"
          style={{
            height: 'clamp(520px, 75vh, 860px)',
            border: '0',
          }}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="clipboard-write"
        />
      </div>
    </section>
  );
};

export default VirtualCoffeePage;
