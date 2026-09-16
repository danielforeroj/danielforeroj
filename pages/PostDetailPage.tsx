import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { posts } from '../data/mockData';
import Button from '../components/Button';
import { SITE } from '../data/siteConfig';
import { buildBlogPostingJsonLd, buildBreadcrumbListJsonLd } from '../lib/seo';
import Seo from '../lib/SeoHead';
import NotFoundPage from './NotFoundPage';

const formatInlineMarkdown = (text: string) => {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return (
    escaped
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // Links. Without this a post citing a source rendered the raw
      // [text](url), so posts avoided links altogether and cited nothing.
      // Only http and https survive: the escape pass above already neutralised
      // angle brackets, and anything else (javascript:, data:) stays as text.
      .replace(/\[([^\]]+)\]\((https?:\/\/[^\s)"']+)\)/g, (_m, label: string, href: string) => {
        const safeHref = href.replace(/"/g, '&quot;');
        return `<a href="${safeHref}" target="_blank" rel="noopener noreferrer nofollow">${label}</a>`;
      })
  );
};

const OAICITE_PATTERN = /:contentReference\s*\[\s*oaicite\s*:\s*\d+\s*\]\s*\{\s*index\s*=\s*\d+\s*\}/gi;

const normalizeHeadingText = (value: string) =>
  value
    .toLowerCase()
    .replace(/[`*_~#>\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const stripOaiciteReferences = (markdown: string) => {
  const lines = markdown.split(/\r?\n/);
  let inFence = false;

  return lines
    .map((line) => {
      const trimmedStart = line.trimStart();
      if (trimmedStart.startsWith('```')) {
        inFence = !inFence;
        return line;
      }

      if (inFence) {
        return line;
      }

      return line.replace(OAICITE_PATTERN, '').replace(/\s{2,}$/g, '');
    })
    .join('\n');
};

const normalizePostMarkdown = (markdown: string, title: string) => {
  const cleaned = stripOaiciteReferences(markdown);
  const lines = cleaned.split(/\r?\n/);
  const normalizedTitle = normalizeHeadingText(title);
  let inFence = false;
  let skippedMatchingFirstH1 = false;

  const normalizedLines = lines.flatMap((line) => {
    const trimmedStart = line.trimStart();
    if (trimmedStart.startsWith('```')) {
      inFence = !inFence;
      return [line];
    }

    if (inFence) {
      return [line];
    }

    const headingMatch = line.match(/^(\s*)(#{1,6})\s+(.*)$/);
    if (!headingMatch) {
      return [line];
    }

    const [, indent, hashes, headingText] = headingMatch;

    if (hashes.length === 1) {
      if (!skippedMatchingFirstH1 && normalizeHeadingText(headingText) === normalizedTitle) {
        skippedMatchingFirstH1 = true;
        return [];
      }

      return [`${indent}## ${headingText}`];
    }

    return [line];
  });

  return normalizedLines.join('\n');
};

const markdownToHtml = (markdown: string) => {
  const lines = markdown.split(/\r?\n/);
  let html = '';
  // The open block, if any: a bullet list, a numbered list, or a quote. One
  // variable rather than three flags, so a block can never close as the wrong tag.
  let open: 'ul' | 'ol' | 'blockquote' | null = null;

  const closeBlock = () => {
    if (open) {
      html += `</${open}>`;
      open = null;
    }
  };

  const openBlock = (tag: 'ul' | 'ol' | 'blockquote') => {
    if (open !== tag) {
      closeBlock();
      html += `<${tag}>`;
      open = tag;
    }
  };

  lines.forEach(rawLine => {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      closeBlock();
      return;
    }

    if (/^---+$/.test(line)) {
      closeBlock();
      html += '<hr />';
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      closeBlock();
      html += `<h${level}>${formatInlineMarkdown(headingMatch[2])}</h${level}>`;
      return;
    }

    const bulletMatch = line.match(/^[-*+]\s+(.*)$/);
    if (bulletMatch) {
      openBlock('ul');
      html += `<li>${formatInlineMarkdown(bulletMatch[1])}</li>`;
      return;
    }

    // A numbered step rendered as a bullet before this, which threw away the
    // order the author wrote it in.
    const numberedMatch = line.match(/^\d+[.)]\s+(.*)$/);
    if (numberedMatch) {
      openBlock('ol');
      html += `<li>${formatInlineMarkdown(numberedMatch[1])}</li>`;
      return;
    }

    const quoteMatch = line.match(/^>\s?(.*)$/);
    if (quoteMatch) {
      openBlock('blockquote');
      html += `<p>${formatInlineMarkdown(quoteMatch[1])}</p>`;
      return;
    }

    closeBlock();
    html += `<p>${formatInlineMarkdown(line)}</p>`;
  });

  closeBlock();
  return html;
};

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  const htmlContent = React.useMemo(() => {
    if (!post) return '';
    return markdownToHtml(normalizePostMarkdown(post.content_md, post.title));
  }, [post]);

  if (!post) {
    return (
      <NotFoundPage
        title={`Post not found | ${SITE.name}`}
        kicker="Missing"
        heading="Post not found"
        body="The post you are looking for does not exist."
        path="/post"
      />
    );
  }

  const canonicalUrl = `${SITE.url}/post/${post.slug}`;

  return (
    <article className="article">
      <Seo
        title={`${post.title} | ${SITE.name}`}
        // metaDescription is the length-constrained twin of the excerpt. The
        // excerpt still renders below, unchanged; only the head-level string
        // changes, because that is the one with a 158-character ceiling.
        description={post.metaDescription ?? post.excerpt}
        path={`/post/${post.slug}`}
        ogType="article"
        keywords={post.tags}
        jsonLd={[
          buildBlogPostingJsonLd(post),
          buildBreadcrumbListJsonLd([
            { name: 'Home', url: SITE.homeUrl },
            { name: 'Blog', url: `${SITE.url}/blog` },
            { name: post.title, url: canonicalUrl },
          ]),
        ]}
      />
      <header className="article-header">
        <NavLink to="/blog" className="chip">Back to library</NavLink>
        <h1 className="article-title">{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        <p className="article-date">
          Published {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
        {post.tags?.length ? (
          <div className="chips" style={{ marginTop: 18 }}>
            {post.tags.slice(0, 6).map((tag) => (
              <span key={tag} className="chip">{tag}</span>
            ))}
          </div>
        ) : null}
      </header>

      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />

      {post.lead_magnet?.file && (
        <div className="button-row" style={{ marginTop: 48 }}>
          <Button href={post.lead_magnet.file} as="a" variant="cta1" icon="Download" download>
            {post.lead_magnet.cta || 'Download'}
          </Button>
        </div>
      )}
    </article>
  );
};

export default PostDetailPage;
