import React from "react";
import { NavLink } from "react-router-dom";
import { posts } from "../data/mockData";
import Button from "../components/Button";
import CompaniesWorkedWithCarousel from "../components/CompaniesWorkedWithCarousel";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });

const verticals = [
  {
    label: "Platform",
    name: "Unbound Operators",
    body: "The operating platform for the work: strategy, systems, talent, and execution.",
    url: "https://unboundoperators.com",
  },
  {
    label: "Branch",
    name: "Unbound Frontier Tech",
    body: "Growth and AI for frontier technology teams.",
    url: "https://withunbound.com",
  },
  {
    label: "Branch",
    name: "Unbound Growth Partners",
    body: "Embedded growth support for companies that are ready to scale.",
    url: "https://unboundgrowthpartners.com",
  },
  {
    label: "Branch",
    name: "On Duty",
    body: "AI agents for commerce and business operations.",
    url: "https://alwaysonduty.io",
  },
  {
    label: "Branch",
    name: "Selah",
    body: "Governance and control for teams deploying AI systems.",
    url: "https://selahcore.com",
  },
];

const operatingModel = [
  {
    title: "Clarify",
    body: "Positioning, ICP, offer, and the operating thesis.",
  },
  {
    title: "Build",
    body: "Systems, workflows, AI agents, and GTM assets.",
  },
  {
    title: "Scale",
    body: "Distribution, partnerships, cadence, and accountability.",
  },
];

const proofPoints = [
  { label: "Role", value: "CEO & Co-founder" },
  { label: "Platform", value: "Unbound Operators" },
  { label: "Branches", value: "4 business verticals" },
  { label: "Focus", value: "Growth / AI / Ops" },
];

const HomePage: React.FC = () => {
  const latest = (posts ?? []).slice(0, 3);

  return (
    <>
      <section className="operator-hero operator-hero--clean">
        <div className="operator-hero__copy">
          <p className="eyebrow">Daniel Forero / Unbound Operators</p>
          <h1 className="operator-title">
            Growth systems for AI and frontier companies.
          </h1>
          <p className="operator-lede">
            I am CEO and co-founder of Unbound Operators. We build business verticals across growth, AI operations,
            frontier tech, and governance.
          </p>
          <div className="hero__actions operator-hero__actions">
            <Button as={NavLink} to="/work-w-me" variant="cta1">
              Work with me
            </Button>
            <Button as="a" href="https://unboundoperators.com" target="_blank" rel="noopener noreferrer" variant="cta2">
              Unbound Operators
            </Button>
          </div>
        </div>

        <aside className="operator-map" aria-label="Current work">
          <p className="card-kicker">Current work</p>
          <div className="map-list">
            <div>
              <span>Platform</span>
              <strong>Unbound Operators</strong>
            </div>
            <div>
              <span>Branches</span>
              <strong>Frontier Tech / Growth Partners / On Duty / Selah</strong>
            </div>
            <div>
              <span>Mode</span>
              <strong>Hands-on operating partner</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="proof-band proof-band--clean" aria-label="Operating context">
        {proofPoints.map((point) => (
          <div key={point.label} className="proof-item">
            <span>{point.label}</span>
            <strong>{point.value}</strong>
          </div>
        ))}
      </section>

      <section className="section section--verticals">
        <div className="section-header">
          <div>
            <p className="section-kicker">Business verticals</p>
            <h2 className="section-title">The branches under Unbound Operators.</h2>
          </div>
          <p className="section-copy">
            Different lanes, one operating platform.
          </p>
        </div>

        <div className="verticals-grid">
          {verticals.map((vertical, index) => (
            <a
              key={vertical.name}
              href={vertical.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`vertical-card ${index === 0 ? "vertical-card--lead" : ""}`}
            >
              <span className="card-kicker">{vertical.label}</span>
              <h3>{vertical.name}</h3>
              <p>{vertical.body}</p>
              <span className="post-card__arrow" aria-hidden="true">Open</span>
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <div>
            <p className="section-kicker">Operating model</p>
            <h2 className="section-title">Simple, practical, close to the work.</h2>
          </div>
          <p className="section-copy">
            Less theater. More shipped systems.
          </p>
        </div>

        <div className="lane-grid">
          {operatingModel.map((lane) => (
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
              <h2 className="section-title">Notes on growth, AI, and markets.</h2>
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
