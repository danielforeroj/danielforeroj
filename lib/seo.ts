import { Post, PostType } from "../types";
import { SITE } from "../data/siteConfig";
import { PROFILE } from "../data/profile";

type JsonLd = Record<string, unknown>;

const urlForPost = (post: Post) => `${SITE.url}/post/${post.slug}`;

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
    url: SITE.logo,
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

export const buildBlogPostingJsonLd = (post: Post): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  headline: post.title,
  description: post.metaDescription ?? post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  mainEntityOfPage: urlForPost(post),
  url: urlForPost(post),
  image: SITE.defaultOgImage,
  author: personRef(),
  publisher: personRef(),
  keywords: post.tags ?? [],
  articleSection:
    post.type === PostType.RESEARCH ? "Research" : post.type === PostType.LEAD_MAGNET ? "Downloads" : "Blog",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["article h1", "article p"],
  },
});

export const buildBlogCollectionJsonLd = (
  posts: Post[],
  sectionName: string,
  canonicalUrl: string,
): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: `${sectionName} | ${SITE.name}`,
  url: canonicalUrl,
  mainEntity: {
    "@type": "ItemList",
    name: `${sectionName} index`,
    numberOfItems: posts.length,
    itemListElement: posts.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: urlForPost(post),
      name: post.title,
      description: post.excerpt,
    })),
  },
});

/**
 * Person entity for the homepage. Every field is read from data/profile.ts, so
 * the schema cannot state anything the page does not already say. sameAs is the
 * set of self-owned profiles, which is what lets an answer engine resolve which
 * "Daniel Forero" a page is about.
 */
export const buildPersonJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": PERSON_ID,
  name: PROFILE.name,
  url: SITE.homeUrl,
  email: `mailto:${PROFILE.email}`,
  description: SITE.description,
  image: SITE.defaultOgImage,
  jobTitle: PROFILE.engagements[0]?.role,
  worksFor: {
    "@type": "Organization",
    name: PROFILE.now.org,
    url: PROFILE.now.url,
  },
  knowsAbout: PROFILE.sectors,
  sameAs: PROFILE.socials.map((social) => social.url),
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
export const buildWebSiteJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.homeUrl}#website`,
  url: SITE.homeUrl,
  name: SITE.name,
  publisher: { "@id": PERSON_ID },
});
