import React from 'react';

const socials = [
  {
    name: 'Instagram',
    url: 'https://www.instagram.com/danielforeroj/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.8A3.95 3.95 0 0 0 3.8 7.75v8.5A3.95 3.95 0 0 0 7.75 20.2h8.5a3.95 3.95 0 0 0 3.95-3.95v-8.5a3.95 3.95 0 0 0-3.95-3.95h-8.5Zm8.95 1.35a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.8a3.2 3.2 0 1 0 0 6.4 3.2 3.2 0 0 0 0-6.4Z" />
      </svg>
    ),
  },
  {
    name: 'X',
    url: 'https://www.x.com/danielforeroj/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M18.9 2H22l-6.77 7.75L23 22h-6.27l-4.9-6.39L6.24 22H3.1l7.25-8.29L1 2h6.43l4.43 5.82L18.9 2Zm-1.1 18h1.74L6.48 3.9H4.62L17.8 20Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/danielforeroj/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5 2.5 2.5 0 0 1 4.98 3.5ZM3 9.75h4v11.25H3V9.75Zm7 0h3.83v1.54h.06c.53-1.01 1.83-2.08 3.77-2.08 4.04 0 4.79 2.66 4.79 6.12V21h-4v-4.91c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.59V21h-4V9.75Z" />
      </svg>
    ),
  },
];

const VirtualCoffeePage: React.FC = () => {
  return (
    <section className="mx-auto w-full max-w-4xl">
      <header className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Virtual Coffee</h1>
        <div className="text-base sm:text-lg" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          <p>Let's have a conversation over a virtual coffee.</p>
          <p className="mt-2">And let's connect on socials!</p>
          <div className="mt-3 flex items-center gap-2">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-[var(--df-accent-10)]"
                style={{ borderColor: 'var(--md-sys-color-outline-variant)' }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
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
            height: 'clamp(780px, 96dvh, 1200px)',
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
