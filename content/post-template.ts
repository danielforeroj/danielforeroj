import { Post, PostType } from "../types";

// Copy this template into data/posts/<slug>.ts, fill in both languages, export
// the Post as default and import it in data/posts/index.ts. See README.
//
// The top-level copy is English and `es` is the Spanish translation. `es` is
// required: a post without it does not typecheck, because every page on the
// site is published in both languages. The English version is served at
// /post/<slug> and the Spanish one at /es/post/<slug>; the slug is shared.
//
// Keep the excerpt concise (1 to 2 sentences) for SEO/AEO snippets, and keep
// metaDescription (optional) under 158 characters in each language.
// Use ISO 8601 for the date to ensure consistent ordering.
export const postTemplate: Post = {
  type: PostType.BLOG,
  slug: "kebab-case-url-slug",
  date: "2024-01-01T12:00:00Z",

  // English
  title: "Title in Title Case",
  excerpt: "One or two lines that clearly state the promise of the article.",
  content_md: `
# Title in Title Case

## Key Takeaways
- **Point one.** Make the takeaway scannable in 12 to 18 words.
- **Point two.** Front-load the value so answer engines can quote you.
- **Point three.** Use short sentences and plain language.

---

Intro paragraph that explains who the article is for and the outcome they get.

## Section headline
Explain the idea with short paragraphs and examples.

## FAQ (optional)
- **Question?** Answer in one or two sentences.
- **Another question?** Keep it crisp for answer engines.
`,
  tags: ["seo", "aeo", "template"],

  // Spanish: the same claims, figures and links as the English, in natural
  // Latin American Spanish that addresses the reader as "tú".
  es: {
    title: "Título en español",
    excerpt: "Una o dos líneas que dicen con claridad qué promete el artículo.",
    content_md: `
# Título en español

## Puntos clave
- **Punto uno.** Que se pueda leer de un vistazo en 12 a 18 palabras.
- **Punto dos.** Pon el valor al principio para que los motores de respuesta te citen.
- **Punto tres.** Frases cortas y lenguaje claro.

---

Párrafo de introducción que explica para quién es el artículo y qué se lleva.

## Título de sección
Explica la idea con párrafos cortos y ejemplos.
`,
    tags: ["seo", "aeo", "plantilla"],
  },

  lead_magnet: undefined,
};

export default postTemplate;
