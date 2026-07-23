import React from "react";
import { NavLink } from "react-router-dom";
import { posts } from "../data/mockData";
import { PROFILE } from "../data/profile";

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
      <div className="console__wrap">
        {/* ---------- HERO: status rail + main console ---------- */}
        <section className="c-shell" aria-label="Introduction">
          <aside className="c-rail" aria-label="Status">
            {portrait ? (
              <div className="c-portrait">
                <img src={portrait} alt={`${PROFILE.name}, operator and angel investor`} />
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
              {PROFILE.handle} &nbsp;/&nbsp; <b>index</b>
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
              <a href={PROFILE.actions.secondary.href} className="c-btn c-btn--o">
                {PROFILE.actions.secondary.label}
                <span className="c-btn__note">if you're raising</span>
              </a>
            </div>

            <ul className="c-tags" aria-label="Also">
              {PROFILE.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- ACTIVE ENGAGEMENTS ---------- */}
        <section className="c-section" aria-labelledby="ops-title">
          <div className="c-section__head">
            <h2 id="ops-title" className="c-section__title">Active engagements</h2>
            <p className="c-kicker">Where I put the playbook to work</p>
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

        {/* ---------- UNDER THE UMBRELLA ---------- */}
        <section className="c-section" aria-labelledby="umbrella-title">
          <div className="c-section__head">
            <h2 id="umbrella-title" className="c-section__title">Under Unbound Operators</h2>
            <p className="c-kicker">One umbrella, separate products</p>
          </div>

          <div className="c-umbrella">
            {PROFILE.ventures.map((v) => (
              <a
                key={v.name}
                className="c-venture"
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="c-venture__name">{v.name}</span>
                <p>{v.note}</p>
                <span className="c-venture__go">Open ↗</span>
              </a>
            ))}
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

        {/* ---------- WHO I BACK ---------- */}
        <section className="c-section" aria-labelledby="back-title">
          <div className="c-section__head">
            <h2 id="back-title" className="c-section__title">Who I back</h2>
            <p className="c-kicker">Angel</p>
          </div>

          <div className="c-back">
            <p className="c-back__thesis">{PROFILE.back.thesis}</p>
            <p className="c-back__looking">{PROFILE.back.looking}</p>
            <a href={PROFILE.actions.secondary.href} className="c-btn">Pitch me</a>
          </div>
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
