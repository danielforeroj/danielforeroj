import React from "react";
import { NavLink } from "react-router-dom";
import { posts } from "../data/mockData";
import { PROFILE } from "../data/profile";
import { SITE } from "../data/siteConfig";
import { buildPersonJsonLd, buildWebSiteJsonLd } from "../lib/seo";
import Seo from "../lib/SeoHead";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

// Drop a photo at content/portrait.(jpg|png|webp) and it appears automatically.
// Nothing breaks while the file is absent.
const portraitModule = import.meta.glob("../content/portrait.{jpg,jpeg,png,webp,avif}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const portrait: string | undefined = Object.values(portraitModule)[0];

const HomePage: React.FC = () => {
  const latest = (posts ?? []).slice(0, 3);

  return (
    <div className="console">
      <Seo
        title={`${PROFILE.name} — ${PROFILE.eyebrow}`}
        description={SITE.description}
        path="/"
        jsonLd={[buildPersonJsonLd(), buildWebSiteJsonLd()]}
      />
      <div className="console__wrap">
        {/* ---------- HERO: status rail + main console ---------- */}
        <section className="c-shell" aria-label="Introduction">
          <aside className="c-rail" aria-label="Status">
            {portrait ? (
              <div className="c-portrait">
                <img src={portrait} alt={`${PROFILE.name}, co-founder of Unbound Operators`} />
              </div>
            ) : null}
            <span className="c-live">Operating</span>
            {PROFILE.rail.map((s) => (
              <dl key={s.label} className="c-stat">
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </dl>
            ))}
          </aside>

          <div className="c-main">
            <p className="c-path">
              {PROFILE.handle} &nbsp;/&nbsp; <b>{PROFILE.eyebrow}</b>
            </p>

            <h1 className="c-title">
              {PROFILE.lead} <em>{PROFILE.leadAccent}</em>
              <span className="c-caret" aria-hidden="true" />
            </h1>

            <p className="c-sub">{PROFILE.sub}</p>

            <div className="c-ticker">
              {PROFILE.sectors.map((s, i) => (
                <span key={s}>
                  <b>{String(i + 1).padStart(2, "0")}</b> {s}
                </span>
              ))}
            </div>

            <div className="c-acts">
              <NavLink to={PROFILE.actions.primary.to} className="c-btn">
                {PROFILE.actions.primary.label}
              </NavLink>
              <a
                href={PROFILE.actions.secondary.href}
                className="c-btn c-btn--o"
                target="_blank"
                rel="noopener noreferrer"
              >
                {PROFILE.actions.secondary.label} ↗
              </a>
            </div>

            <ul className="c-tags" aria-label="Also">
              {PROFILE.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- UNBOUND OPERATORS ---------- */}
        <section className="c-section" aria-labelledby="unbound-title">
          <div className="c-section__head">
            <h2 id="unbound-title" className="c-section__title">{PROFILE.now.org}</h2>
            <a href={PROFILE.now.url} className="c-section__more" target="_blank" rel="noopener noreferrer">
              unboundoperators.com ↗
            </a>
          </div>

          <p className="c-lede">{PROFILE.now.note}</p>

          <div className="c-umbrella">
            {PROFILE.pillars.map((p) => (
              <div key={p.verb} className="c-venture c-venture--static">
                <span className="c-venture__name">{p.verb}</span>
                <p>{p.note}</p>
              </div>
            ))}
          </div>

          <div className="c-ops">
            {PROFILE.operate.map((o) => (
              <a key={o.name} className="c-op" href={o.url} target="_blank" rel="noopener noreferrer">
                <span className="c-op__role">We operate</span>
                <span className="c-op__org">
                  {o.name}
                  <small>{o.note}</small>
                </span>
                <span className="c-op__status" data-s="Live">Live</span>
              </a>
            ))}
          </div>
        </section>

        {/* ---------- PLATFORMS ---------- */}
        <section className="c-section" aria-labelledby="platforms-title">
          <div className="c-section__head">
            <h2 id="platforms-title" className="c-section__title">What we're launching</h2>
            <p className="c-kicker">Products, partners, and media</p>
          </div>

          <div className="c-umbrella c-umbrella--3">
            {PROFILE.platforms.map((v) => {
              const inner = (
                <>
                  <span className="c-venture__meta">
                    <span className="c-op__role">{v.kind}</span>
                    <span className="c-op__status" data-s={v.status}>{v.status}</span>
                  </span>
                  <span className="c-venture__name">{v.name}</span>
                  <p>{v.note}</p>
                  {v.url ? <span className="c-venture__go">Open ↗</span> : null}
                </>
              );
              return v.url ? (
                <a key={v.name} className="c-venture" href={v.url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={v.name} className="c-venture c-venture--static">{inner}</div>
              );
            })}
          </div>
        </section>

        {/* ---------- ROLES ---------- */}
        <section className="c-section" aria-labelledby="ops-title">
          <div className="c-section__head">
            <h2 id="ops-title" className="c-section__title">Where I'm active</h2>
            <p className="c-kicker">Roles right now</p>
          </div>

          <div className="c-ops">
            {PROFILE.engagements.map((e) => {
              const inner = (
                <>
                  <span className="c-op__role">{e.role}</span>
                  <span className="c-op__org">
                    {e.org}
                    <small>{e.note}</small>
                  </span>
                  <span className="c-op__status" data-s={e.status}>{e.status}</span>
                </>
              );
              return e.url ? (
                <a key={e.org} className="c-op" href={e.url} target="_blank" rel="noopener noreferrer">
                  {inner}
                </a>
              ) : (
                <div key={e.org} className="c-op">{inner}</div>
              );
            })}
          </div>
        </section>

        {/* ---------- WHO ---------- */}
        <section className="c-section" aria-labelledby="who-title">
          <div className="c-section__head">
            <h2 id="who-title" className="c-section__title">Who's this guy</h2>
            <p className="c-kicker">Background</p>
          </div>

          <div className="c-who">
            {PROFILE.who.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <dl className="c-record">
            {PROFILE.record.map((r) => (
              <div key={r.label}>
                <dt>{r.figure}</dt>
                <dd>{r.label}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ---------- WRITING ---------- */}
        {latest.length ? (
          <section className="c-section" aria-labelledby="writing-title">
            <div className="c-section__head">
              <h2 id="writing-title" className="c-section__title">Writing</h2>
              <NavLink to="/blog" className="c-section__more">All writing →</NavLink>
            </div>

            <div className="c-posts">
              {latest.map((p) => (
                <NavLink key={p.slug} to={`/post/${p.slug}`} className="c-post">
                  <span className="c-post__date">{fmt(p.date)}</span>
                  <span className="c-post__title">
                    {p.title}
                    <small>{p.excerpt}</small>
                  </span>
                  <span className="c-post__go">Read ↗</span>
                </NavLink>
              ))}
            </div>
          </section>
        ) : null}

        {/* ---------- CONTACT ---------- */}
        <section className="c-contact" aria-label="Get in touch">
          <div>
            <p className="c-kicker">Get in touch</p>
            <a href={`mailto:${PROFILE.email}`} className="c-contact__mail">{PROFILE.email}</a>
          </div>
          <ul className="c-socials">
            {PROFILE.socials.map((s) => (
              <li key={s.name}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.name}
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
