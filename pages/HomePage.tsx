// /pages/HomePage.tsx
import React from "react";
import { initialHomeContent } from "../data/mockData";

/** Inline chip renderer so we avoid any cross-folder import issues */
const Chips: React.FC<{ items: string[]; align?: "left" | "center"; className?: string }> = ({
  items,
  align = "center",
  className = "",
}) => (
  <div className={`chips ${align === "center" ? "chips-hero" : "chips-card"} ${className}`} role="list">
    {items.map((t) => (
      <span key={t} className="chip" role="listitem">
        {t}
      </span>
    ))}
  </div>
);

const HomePage: React.FC = () => {
  const c = initialHomeContent;

  return (
    <div>
      {/* HERO */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        <h1 className="hero-title text-6xl sm:text-7xl font-extrabold tracking-tight">{c.hero_title}</h1>

        {/* HERO TAGS */}
        <Chips items={c.hero_tags} align="center" className="mt-6" />

        {/* CTAs */}
        <div className="mt-8 flex items-center justify-center gap-4">
          {c.hero_buttons?.map((b) => (
            <a key={b.label} href={b.url} className="btn btn-primary">
              {b.label}
            </a>
          ))}
        </div>
      </section>

      {/* CARDS */}
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

            {/* same chips as hero, left-aligned */}
            <Chips items={c.hero_tags} align="left" className="mt-6" />
          </article>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
