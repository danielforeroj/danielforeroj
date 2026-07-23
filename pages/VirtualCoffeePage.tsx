import React from 'react';

const socials = [
  { name: 'Instagram', url: 'https://www.instagram.com/danielforeroj/' },
  { name: 'X', url: 'https://www.x.com/danielforeroj/' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/danielforeroj/' },
];

const VirtualCoffeePage: React.FC = () => {
  return (
    <section className="page">
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
          src="https://app.onecal.io/b/dnaielforeroj/virtual-coffee"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="clipboard-write"
        />
      </div>
    </section>
  );
};

export default VirtualCoffeePage;
