import { Post, PostType } from "../types";

// Copy-paste this template and update the values to add a new post.
// Keep the excerpt concise (1–2 sentences) for SEO/AEO snippets.
// Use ISO 8601 for the date to ensure consistent ordering.
export const postTemplate: Post = {
  type: PostType.BLOG,
  title: "Title in Title Case",
  slug: "kebab-case-url-slug",
  date: "2024-01-01T12:00:00Z",
  excerpt: "One or two lines that clearly state the promise of the article.",
  content_md: `
# Title in Title Case

## Key Takeaways
- **Point one.** Make the takeaway scannable in 12–18 words.
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
  lead_magnet: undefined,
};

export default postTemplate;
