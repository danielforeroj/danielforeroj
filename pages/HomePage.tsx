import React from "react";
import { initialHomeContent } from "../content/mock"; // <-- if your path is different, point this to your mock/content file

const HomePage: React.FC = () => {
  const c = initialHomeContent;

  return (
    <div>
      {/* HERO */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        <h1 className="hero-title text-6xl sm:text-7xl font-extrabold tracking-tight">
          {c.hero_title}
        </h1>

        {/* HERO TAGS */}
        <div className="chips chips-hero mt-6">
          {c.hero_tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>

        {/* HERO CTAs */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {c.hero_buttons?.map((b) => (
            <a key={b.label} href={b.url} className="btn btn-primary">
              {b.label}
            </a>
          ))}
        </div>
      </section>

      {/* TWO CARDS */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ABOUT */}
          <article className="card p-8">
            <h2 className="section-title text-2xl font-extrabold mb-3">{c.about.title}</h2>
            <p className="leading-relaxed whitespace-pre-line">{c.about.body}</p>
          </article>

          {/* OPERATOR */}
          <article className="card p-8">
            <h2 className="section-title text-2xl font-extrabold mb-3">{c.operator.title}</h2>
            <p className="leading-relaxed whitespace-pre-line">{c.operator.body}</p>

            {/* CARD TAGS (explicit classes) */}
            <div className="chips chips-card mt-6">
              {c.hero_tags.map((t) => (
                <span key={`op-${t}`} className="chip">{t}</span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
