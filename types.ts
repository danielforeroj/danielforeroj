
export enum PostType {
  BLOG = 'blog',
  RESEARCH = 'research',
  LEAD_MAGNET = 'lead_magnet'
}

export interface LeadMagnet {
  file: string;
  cta: string;
  requires_email: boolean;
}

/**
 * Everything about a post that is read, as opposed to how it is filed. A post
 * carries one of these per language: the English copy at the top level of the
 * Post, the Spanish copy under `es`. See README, "Adding a post".
 */
export interface PostCopy {
  title: string;
  /** On-page standfirst. Written to read well under the title; length is free. */
  excerpt: string;
  /**
   * Search-surface description, 120-158 characters. Optional: when absent the
   * excerpt is used. It exists because the excerpt was doing two incompatible
   * jobs, a standfirst wants 200+ characters, a meta description gets
   * truncated past ~158, and one string cannot be good at both.
   */
  metaDescription?: string;
  content_md: string;
  tags?: string[];
}

/**
 * A post. The top-level copy is English and `es` is the Spanish translation.
 * `es` is required, so a post without its Spanish version does not typecheck:
 * the site publishes every page in both languages.
 */
export interface Post extends PostCopy {
  type: PostType;
  /** Shared by both languages: /post/:slug in English, /es/post/:slug in Spanish. */
  slug: string;
  date: string; // ISO 8601 format
  lead_magnet?: LeadMagnet;
  es: PostCopy;
}
