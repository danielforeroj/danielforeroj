<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1FvFJR06ysPfx-omtYMcYLtprc1tUFa99

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Adding new posts with SEO/AEO defaults

1. Copy `content/post-template.ts` into `data/mockData.ts` (or your data source) and update the placeholder fields:
   - `type`: choose `PostType.BLOG`, `PostType.RESEARCH`, or `PostType.LEAD_MAGNET`.
   - `slug`: URL-safe identifier (e.g., `pricing-playbook`).
   - `excerpt`: 1–2 sentence summary for meta descriptions and answer snippets.
   - `tags`: keywords used for `<meta name="keywords">` and JSON-LD `keywords`.
   - `lead_magnet`: optional download with `file` URL and CTA copy.
2. Place the Markdown-like body inside `content_md`; headings and short paragraphs keep speakable content concise.
3. The listing and detail pages automatically generate:
   - Canonical URLs and Open Graph/Twitter tags via `applyPageSEO`.
   - JSON-LD for CollectionPage, BlogPosting, breadcrumbs, and on-site search.
   - Keyword aggregation from `tags` to avoid manual duplication.
4. Publish: the SEO helpers run in `PostListPage.tsx` and `PostDetailPage.tsx`, so no extra wiring is needed once the post data is added.
