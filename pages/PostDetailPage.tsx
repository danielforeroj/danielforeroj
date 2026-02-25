import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { posts } from '../data/mockData';
import Button from '../components/Button';
import Chip from '../components/Chip';
import { SITE } from '../data/siteConfig';
import { applyPageSEO, buildBlogPostingJsonLd, buildBreadcrumbListJsonLd } from '../lib/seo';

const formatInlineMarkdown = (text: string) => {
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return escaped
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
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
  let inList = false;

  const closeList = () => {
    if (inList) {
      html += '</ul>';
      inList = false;
    }
  };

  lines.forEach(rawLine => {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      closeList();
      return;
    }

    if (/^---+$/.test(line)) {
      closeList();
      html += '<hr />';
      return;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      closeList();
      html += `<h${level}>${formatInlineMarkdown(headingMatch[2])}</h${level}>`;
      return;
    }

    const listMatch = line.match(/^[-*+]\s+(.*)$/);
    if (listMatch) {
      if (!inList) {
        html += '<ul>';
        inList = true;
      }
      html += `<li>${formatInlineMarkdown(listMatch[1])}</li>`;
      return;
    }

    closeList();
    html += `<p>${formatInlineMarkdown(line)}</p>`;
  });

  closeList();
  return html;
};

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  const htmlContent = React.useMemo(() => {
    if (!post) return '';
    return markdownToHtml(normalizePostMarkdown(post.content_md, post.title));
  }, [post]);

  React.useEffect(() => {
    if (!post) return;

    const canonicalUrl = `${SITE.url}/post/${post.slug}`;
    const breadcrumbs = [
      { name: 'Home', url: SITE.url },
      { name: 'Blog', url: `${SITE.url}/blog` },
      { name: post.title, url: canonicalUrl },
    ];

    applyPageSEO({
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      canonicalUrl,
      ogType: 'article',
      keywords: post.tags,
      jsonLd: [
        buildBlogPostingJsonLd(post),
        buildBreadcrumbListJsonLd(breadcrumbs),
      ],
    });
  }, [post]);

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-4">The post you are looking for does not exist.</p>
        <NavLink to="/" className="mt-6 inline-block">
          Go back home
        </NavLink>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <Chip>{post.type.replace('_', ' ')}</Chip>
        <h1
          className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight"
          style={{ color: 'var(--md-sys-color-primary)' }}
        >
          {post.title}
        </h1>
        <p className="mt-2 text-lg" style={{ color: 'var(--md-sys-color-on-surface-variant)' }}>
          {post.excerpt}
        </p>
        <p className="mt-4 text-sm" style={{ color: 'var(--md-sys-color-outline)' }}>
          Published on{' '}
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      <div
        className="prose prose-base dark:prose-invert max-w-none whitespace-pre-line"
        style={{ color: 'var(--md-sys-color-on-background)' }}
      >
        <div className="markdown-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
      </div>

      {post.lead_magnet?.file && (
        <div className="mt-12 text-center">
          <Button href={post.lead_magnet.file} as="a" variant="filled" icon="download" download>
            {post.lead_magnet.cta || 'Download'}
          </Button>
        </div>
      )}
    </article>
  );
};

export default PostDetailPage;
