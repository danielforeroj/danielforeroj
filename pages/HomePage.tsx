// /pages/HomePage.tsx
import React from "react";
import { initialHomeContent, posts } from "../data/mockData";
import Button from "../components/Button";

/** Inline chips (for tags) so we avoid fragile imports */
const Chips: React.FC<{
  items: Array<string | { name: string; url?: string }>;
  align?: "left" | "center";
  className?: string;
  asLinks?: boolean;
}> = ({ items, align = "center", className = "", asLinks = false }) => {
  const justify = align === "center" ? "justify-center" : "justify-start";
  return (
    <div className={`chips flex flex-wrap gap-3 ${justify} ${className}`}>
      {items.map((it) => {
        const label = typeof it === "string" ? it : it.name;
        const href = typeof it === "string" ? undefined : it.url;
        if (asLinks && href) {
          return (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="chip inline-flex items-center px-3 py-2 rounded-full border"
            >
              {label}
            </a>
          );
        }
        return (
          <span key={label} className="chip inline-flex items-center px-3 py-2 rounded-full border">
            {label}
          </span>
        );
      })}
    </div>
  );
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const HomePage: React.FC = () => {
  const c = initialHomeContent;

  // Build CTA1 list = hero_buttons + socials (dedup by label)
  const heroCTAItems = [
    ...(c.hero_buttons ?? []),
    ...(c.socials ?? []).map((s) => ({ label: s.name, url: s.url })),
  ].filter(Boolean) as Array<{ label: string; url: string }>;

  const dedupedHeroCTA = (() => {
    const seen = new Set<string>();
    return heroCTAItems.filter((b) => {
      const k = b.label.trim().toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  })();

  const latest = (posts ?? []).slice(0, 6);

  return (
    <div>
      {/* HERO */}
      <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10 text-center">
        <h1 className="hero-title text-6xl sm:text-7xl font-extrabold tracking-tight">{c.hero_title}</h1>

        {/* HERO TAGS */}
        <Chips items={c.hero_tags} align="center" className="mt-6" />

        {/* HERO CTAs (CTA1 behavior) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          {dedupedHeroCTA.map((b) => (
            <Button key={b.label} as="a" href={b.url} variant="cta1">
              {b.label}
            </Button>
          ))}
        </div>
      </section>

      {/* ABOUT + OPERATOR */}
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
            <Chips items={c.hero_tags} align="left" className="mt-6" />
          </article>
        </div>
      </section>

      {/* SOCIALS SECTION (kept for structure; links shown as chips here) */}
      {c.socials?.length ? (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 text-center">
          <h3 className="text-2xl font-extrabold mb-4">My Official SM Channels</h3>
          <Chips items={c.socials} align="center" asLinks className="mt-2" />
        </section>
      ) : null}

      {/* VENTURES */}
      {c.ventures?.length ? (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <h3 className="text-2xl font-extrabold mb-6 text-center">Ventures & Roles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {c.ventures.map((v) => (
              <article key={v.title} className="card p-8">
                <h4 className="text-xl font-bold mb-2">{v.title}</h4>
                <p className="leading-relaxed mb-4">{v.body}</p>
                {v.ctaUrl && v.ctaLabel ? (
                  <Button
                    as="a"
                    href={v.ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="cta2"
                  >
                    {v.ctaLabel}
                  </Button>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* LATEST POSTS */}
      {latest.length ? (
        <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
          <h3 className="text-2xl font-extrabold mb-6 text-center">Latest writing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {latest.map((p) => (
              <article key={p.slug} className="card p-8">
                <div className="text-sm opacity-70 mb-2">{fmt(p.date)}</div>
                <h4 className="text-xl font-bold mb-2">{p.title}</h4>
                <p className="mb-4">{p.excerpt}</p>
                {p.tags?.length ? <Chips items={p.tags.slice(0, 6)} align="left" className="mb-4" /> : null}
                <Button as="a" href={`/post/${p.slug}`} variant="cta2">
                  Read
                </Button>
              </article>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
};

export default HomePage;
