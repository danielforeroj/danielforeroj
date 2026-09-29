import { Post, PostCopy } from "../types";
import { SITE, SITE_DESCRIPTION } from "../data/siteConfig";
import { PROFILES } from "../data/profile";
import { ALTERNATE_NAMES, COMPANY, DESCRIPTOR, KNOWS_ABOUT, PORTRAIT_URL, SAME_AS } from "../data/entity";
import { LOCALE, localePath, type Lang } from "./i18n";

type JsonLd = Record<string, unknown>;

/** The copy of a post in a language: the top-level fields are English, `es` is Spanish. */
export const postCopy = (post: Post, lang: Lang): PostCopy =>
  lang === "es"
    ? post.es
    : {
        title: post.title,
        excerpt: post.excerpt,
        metaDescription: post.metaDescription,
        content_md: post.content_md,
        tags: post.tags,
      };

export const urlForPost = (post: Post, lang: Lang = "en") => `${SITE.url}${localePath(`/post/${post.slug}`, lang)}`;

/**
 * The single Person node the whole site refers to. Author and publisher are the
 * same human here, so they must be the same node: typing the publisher as an
 * Organization named "Daniel Forero" while the author was a Person of the same
 * name asked an answer engine to resolve two entities with one name, which is
 * the ambiguity that makes a model hedge instead of stating a fact.
 *
 * The shared @id is what does the work, the homepage Person and every
 * BlogPosting's author/publisher all resolve to one node in the graph.
 */
export const PERSON_ID = `${SITE.homeUrl}#person`;

const personRef = (): JsonLd => ({
  "@type": SITE.publisher.type,
  "@id": PERSON_ID,
  name: SITE.publisher.name,
  url: SITE.homeUrl,
  image: {
    "@type": "ImageObject",
    url: PORTRAIT_URL,
  },
});

export const buildBreadcrumbListJsonLd = (crumbs: Array<{ name: string; url: string }>): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

export const buildBlogPostingJsonLd = (post: Post, lang: Lang = "en", section = "Blog"): JsonLd => {
  const copy = postCopy(post, lang);
  return {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: copy.title,
  description: copy.metaDescription ?? copy.excerpt,
  inLanguage: LOCALE[lang],
  datePublished: post.date,
  dateModified: post.date,
  mainEntityOfPage: urlForPost(post, lang),
  url: urlForPost(post, lang),
  image: SITE.defaultOgImage,
  author: personRef(),
  publisher: personRef(),
  keywords: copy.tags ?? [],
  articleSection: section,
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["article h1", "article p"],
  },
  };
};

export const buildBlogCollectionJsonLd = (
  posts: Post[],
  sectionName: string,
  canonicalUrl: string,
  lang: Lang = "en",
  indexName = `${sectionName} index`,
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${sectionName} | ${SITE.name}`,
  url: canonicalUrl,
  inLanguage: LOCALE[lang],
  mainEntity: {
    "@type": "ItemList",
    name: indexName,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: urlForPost(post, lang),
      name: postCopy(post, lang).title,
      description: postCopy(post, lang).excerpt,
    })),
  },
});

/**
 * The Person node: who Daniel Forero is. Rendered in full on the homepage and
 * the about page; every other page refers to it by PERSON_ID. The facts come
 * from data/entity.ts, the one place that states them, so the schema, the
 * about page, the meta descriptions and llms.txt cannot drift apart.
 *
 * sameAs is ENTITY_PROFILES, not the homepage social links: it lists only the
 * profiles confirmed as Daniel's main ones, because a sameAs pointing at the
 * wrong account tells an engine two people are one.
 */
export const buildPersonJsonLd = (lang: Lang = "en"): JsonLd => {
  const PROFILE = PROFILES[lang];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    alternateName: ALTERNATE_NAMES,
    givenName: "Daniel",
    familyName: "Forero",
    url: SITE.homeUrl,
    mainEntityOfPage: `${SITE.url}${localePath("/about", lang)}`,
    email: `mailto:${PROFILE.email}`,
    description: DESCRIPTOR[lang],
    image: {
      "@type": "ImageObject",
      url: PORTRAIT_URL,
      width: 900,
      height: 900,
    },
    jobTitle: lang === "es" ? "Cofundador de Unbound" : "Co-founder of Unbound",
    worksFor: COMPANY,
    nationality: { "@type": "Country", name: "Colombia" },
    knowsLanguage: ["es", "en"],
    knowsAbout: KNOWS_ABOUT[lang],
    sameAs: SAME_AS,
  };
};

/**
 * The about page is a ProfilePage whose mainEntity is the Person. The full
 * Person is embedded (not only referenced) so a crawler that reads this one
 * page gets every fact without following the @id.
 */
export const buildProfilePageJsonLd = (lang: Lang, url: string, name: string, description: string): JsonLd => {
  const { ["@context"]: _ctx, ...person } = buildPersonJsonLd(lang);
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profilepage`,
    url,
    name,
    description,
    inLanguage: LOCALE[lang],
    isPartOf: { "@id": `${SITE.homeUrl}#website` },
    about: { "@id": PERSON_ID },
    mainEntity: person,
  };
};

export const buildFaqJsonLd = (faq: Array<{ q: string; a: string }>, lang: Lang): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: LOCALE[lang],
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

/**
 * WebSite is a site-level entity, so it belongs on the homepage and nowhere
 * else. Repeating it on /blog, /research and /leads described the same site
 * four times.
 *
 * It used to declare a SearchAction pointing at /search?q={search_term_string}.
 * There is no /search route and that URL 404s, so the site was advertising a
 * capability it does not have. The entity is worth keeping; the false claim is
 * not. If site search is ever built, add the potentialAction back then.
 */
export const buildWebSiteJsonLd = (lang: Lang = "en"): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.homeUrl}#website`,
  url: SITE.homeUrl,
  name: SITE.name,
  // The one site, published in both languages.
  inLanguage: [LOCALE.en, LOCALE.es],
  description: SITE_DESCRIPTION[lang],
  publisher: { "@id": PERSON_ID },
});
