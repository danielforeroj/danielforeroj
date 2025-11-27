import { Post, PostType } from "../types";
import { SITE } from "../data/siteConfig";
import { stripMarkdown } from "./markdown";

type JsonLd = Record<string, unknown>;

type SEOOptions = {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: JsonLd[];
};

const ensureMeta = (selector: string, attr: "name" | "property", key: string) => {
  let el = document.head.querySelector(`${selector}[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  return el;
};

const setMetaTag = (name: string, content?: string) => {
  if (!content) return;
  ensureMeta("meta", "name", name).setAttribute("content", content);
};

const setPropertyTag = (property: string, content?: string) => {
  if (!content) return;
  ensureMeta("meta", "property", property).setAttribute("content", content);
};

const setCanonicalLink = (href?: string) => {
  if (!href) return;
  let link = document.head.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", href);
};

const clearJsonLd = () => {
  document.querySelectorAll("script[data-seo-jsonld='true']").forEach((node) => node.remove());
};

const addJsonLd = (data: JsonLd) => {
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.seoJsonld = "true";
  script.textContent = JSON.stringify(data, null, 2);
  document.head.appendChild(script);
};

export const applyPageSEO = (options: SEOOptions) => {
  if (typeof document === "undefined") return;

  document.title = options.title;
  setMetaTag("description", options.description);
  setMetaTag("keywords", options.keywords?.filter(Boolean).join(", "));

  setPropertyTag("og:title", options.title);
  setPropertyTag("og:description", options.description);
  setPropertyTag("og:type", options.ogType ?? "website");
  setPropertyTag("og:url", options.canonicalUrl);
  setPropertyTag("og:image", options.ogImage ?? SITE.defaultOgImage);
  setPropertyTag("og:site_name", SITE.name);

  if (options.ogType === "article") {
    setPropertyTag("article:published_time", options.publishedTime);
    setPropertyTag("article:modified_time", options.modifiedTime ?? options.publishedTime);
  }

  setMetaTag("twitter:card", "summary_large_image");
  setMetaTag("twitter:title", options.title);
  setMetaTag("twitter:description", options.description);
  setMetaTag("twitter:image", options.ogImage ?? SITE.defaultOgImage);

  setCanonicalLink(options.canonicalUrl);

  if (options.noIndex) {
    setMetaTag("robots", "noindex, nofollow");
  } else {
    setMetaTag("robots", "index, follow");
  }

  clearJsonLd();
  options.jsonLd?.forEach(addJsonLd);
};

const urlForPost = (post: Post) => `${SITE.url}/post/${post.slug}`;

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
  description: post.excerpt,
  abstract: post.answer ?? post.excerpt,
  datePublished: post.date,
  dateModified: post.date,
  mainEntityOfPage: urlForPost(post),
  url: urlForPost(post),
  image: SITE.defaultOgImage,
  author: {
    "@type": SITE.publisher.type,
    name: SITE.publisher.name,
    url: SITE.url,
  },
  publisher: {
    "@type": "Organization",
    name: SITE.name,
    logo: {
      "@type": "ImageObject",
      url: SITE.logo,
    },
  },
  keywords: post.tags ?? [],
  articleBody: stripMarkdown(post.content_md),
  articleSection:
    post.type === PostType.RESEARCH ? "Research" : post.type === PostType.LEAD_MAGNET ? "Downloads" : "Blog",
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["article h1", "article p"],
  },
});

export const buildFaqPageJsonLd = (post: Post): JsonLd | undefined => {
  if (!post.faqs?.length) return undefined;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: stripMarkdown(faq.answer),
      },
    })),
  };
};

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

export const buildSiteSearchJsonLd = (): JsonLd => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE.url,
  name: SITE.name,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE.url}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
});
