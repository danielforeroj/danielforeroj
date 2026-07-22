import React from "react";
import { NavLink } from "react-router-dom";
import { posts } from "../data/mockData";
import Button from "../components/Button";
import CompaniesWorkedWithCarousel from "../components/CompaniesWorkedWithCarousel";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const portfolio = [
  {
    mode: "Parent company",
    name: "Unbound Operators",
    body: "The operating company behind the portfolio. We operate, build, and back companies that need sharper growth, better systems, and execution that compounds.",
    url: "https://unboundoperators.com",
  },
  {
    mode: "Operate",
    name: "Unbound Frontier Tech",
    body: "Growth and AI for frontier technology companies from pre-seed to Series B.",
    url: "https://withunbound.com",
  },
  {
    mode: "Operate",
    name: "Unbound Growth Partners",
    body: "Growth and AI for companies that already work and need a serious operating partner.",
    url: "https://unboundgrowthpartners.com",
  },
  {
    mode: "Build",
    name: "On Duty",
    body: "Always-on AI agents for commerce and business operations.",
    url: "https://alwaysonduty.io",
  },
  {
    mode: "Build",
    name: "Selah",
    body: "An AI governance layer for teams deploying AI systems with control and accountability.",
    url: "https://selahcore.com",
  },
];

const operatingLanes = [
  {
    title: "Operate",
    body: "I get close to the business: positioning, pipeline, partnerships, systems, and the weekly cadence that turns strategy into shipped work.",
  },
  {
    title: "Build",
    body: "I co-found and ship products where AI, commerce, growth, and operations intersect. The bar is usefulness, not hype.",
  },
  {
    title: "Back",
    body: "I support founders with capital, narrative, intros, and pressure-tested go-to-market judgment when the company is still taking shape.",
  },
];

const proofPoints = [
  { label: "Role", value: "CEO & Co-founder" },
  { label: "Operating company", value: "Unbound Operators" },
  { label: "Capital helped raise", value: "$50M+" },
  { label: "Markets", value: "Web3 / AI / LATAM" },
];

const HomePage: React.FC = () => {
  const latest = (posts ?? []).slice(0, 3);

  return (
    <>
      <section className="operator-hero">
        <div className="operator-hero__copy">
          <span className="site-seal" aria-hidden="true" />
          <p className="eyebrow">CEO & Co-founder of Unbound Operators</p>
          <h1 className="operator-title">
            I operate, build, and back companies at the edge of growth and AI.
          </h1>
          <p className="operator-lede">
            I am Daniel Forero. Through Unbound Operators, I run a portfolio that includes Unbound Frontier
            Tech, Unbound Growth Partners, On Duty, and Selah.
          </p>
          <div className="hero__actions operator-hero__actions">
            <Button as="a" href="https://unboundoperators.com" target="_blank" rel="noopener noreferrer" variant="cta1">
              Unbound Operators
            </Button>
            <Button as={NavLink} to="/work-w-me" variant="cta2">
              Work with me
            </Button>
          </div>
        </div>

        <aside className="operator-brief" aria-label="Operating brief">
          <p className="card-kicker">Operating brief</p>
          <h2>Not a fund. Not an agency. An operator collective.</h2>
          <p>
            The work sits where strategy meets execution: growth systems, AI-native operations, frontier tech
            positioning, and companies that need a sharper path from idea to market.
          </p>
          <div className="brief-stack">
            <span>Operate</span>
            <span>Build</span>
            <span>Back</span>
          </div>
        </aside>
      </section>

      <section className="proof-band" aria-label="Selected operating proof">
        {proofPoints.map((point) => (
          <div key={point.label} className="proof-item">
            <span>{point.label}</span>
            <strong>{point.value}</strong>
          </div>
        ))}
      </section>

      <section className="section section--portfolio">
        <div className="section-header">
          <div>
            <p className="section-kicker">Portfolio</p>
            <h2 className="section-title">The companies I am building through Unbound.</h2>
          </div>
          <p className="section-copy">
            Each company has its own mandate. Together, they form the operating system behind my current work.
          </p>
        </div>

        <div className="portfolio-grid">
          {portfolio.map((company, index) => (
            <a
              key={company.name}
              href={company.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`portfolio-card ${index === 0 ? "portfolio-card--lead" : ""}`}
            >
              <span className="card-kicker">{company.mode}</span>
              <h3>{company.name}</h3>
              <p>{company.body}</p>
              <span className="post-card__arrow" aria-hidden="true">Open</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="section-kicker">Method</p>
            <h2 className="section-title">Operator first. Investor second.</h2>
          </div>
          <p className="section-copy">
            The pattern is simple: get close to the work, clarify the market, install the operating cadence,
            and stay accountable to momentum.
          </p>
        </div>

        <div className="lane-grid">
          {operatingLanes.map((lane) => (
            <article key={lane.title} className="lane-card">
              <span className="card-kicker">{lane.title}</span>
              <h3>{lane.title}</h3>
              <p>{lane.body}</p>
            </article>
          ))}
        </div>

        <CompaniesWorkedWithCarousel />
      </section>

      {latest.length ? (
        <section className="section">
          <div className="section-header">
            <div>
              <p className="section-kicker">Writing</p>
              <h2 className="section-title">Field notes from the operating room.</h2>
            </div>
            <Button as={NavLink} to="/blog" variant="cta2">
              View all writing
            </Button>
          </div>

          <div className="post-grid">
            {latest.map((p) => (
              <NavLink key={p.slug} to={`/post/${p.slug}`} className="post-card">
                <div className="post-card__meta">{fmt(p.date)}</div>
                <h4>{p.title}</h4>
                <p>{p.excerpt}</p>
                {p.tags?.length ? (
                  <div className="post-card__tags">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="chip">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <span className="post-card__arrow" aria-hidden="true">Read</span>
              </NavLink>
            ))}
          </div>
        </section>
      ) : null}
    </>
  );
};

export default HomePage;
