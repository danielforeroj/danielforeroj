import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { posts } from '../data/mockData';
import Button from '../components/Button';
import Chip from '../components/Chip';
import { SITE } from '../data/siteConfig';
import { applyPageSEO, buildBlogPostingJsonLd, buildBreadcrumbListJsonLd, buildFaqPageJsonLd } from '../lib/seo';
import { markdownToHtml } from '../lib/markdown';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  React.useEffect(() => {
    if (!post) return;

    const canonicalUrl = `${SITE.url}/post/${post.slug}`;
    const jsonLd = [
      buildBlogPostingJsonLd(post),
      buildBreadcrumbListJsonLd([
        { name: 'Home', url: SITE.url },
        { name: 'Blog', url: `${SITE.url}/blog` },
        { name: post.title, url: canonicalUrl },
      ]),
    ];

    const faqJsonLd = buildFaqPageJsonLd(post);
    if (faqJsonLd) jsonLd.push(faqJsonLd);

    applyPageSEO({
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      canonicalUrl,
      ogType: 'article',
      keywords: post.tags,
      publishedTime: post.date,
      modifiedTime: post.date,
      jsonLd,
    });
  }, [post]);

  const renderedContent = React.useMemo(() => (post ? markdownToHtml(post.content_md) : ''), [post]);

  if (!post) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <p className="mt-4">The post you are looking for does not exist.</p>
        <NavLink to="/" className="mt-6 inline-block">Go back home</NavLink>
      </div>
    );
  }

  return (
    <article className="max-w-3xl mx-auto">
      <header className="mb-8">
        <Chip>{post.type.replace('_', ' ')}</Chip>
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight" style={{color: 'var(--md-sys-color-primary)'}}>{post.title}</h1>
        <p className="mt-2 text-lg" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>{post.excerpt}</p>
        <p className="mt-4 text-sm" style={{color: 'var(--md-sys-color-outline)'}}>
          Published on {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </header>

      {post.answer && (
        <section className="mb-8 p-6 rounded-xl border" style={{backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)'}}>
          <p className="text-sm font-semibold uppercase tracking-wide" style={{color: 'var(--md-sys-color-primary)'}}>
            Quick answer
          </p>
          <p className="mt-2 leading-relaxed text-base">{post.answer}</p>
        </section>
      )}

      <div
        className="prose prose-lg dark:prose-invert max-w-none"
        style={{color: 'var(--md-sys-color-on-background)'}}
        dangerouslySetInnerHTML={{ __html: renderedContent }}
      />

      {post.faqs?.length ? (
        <section className="mt-10 space-y-4">
          <h2 className="text-2xl font-bold" style={{color: 'var(--md-sys-color-primary)'}}>
            FAQs
          </h2>
          <div className="space-y-3">
            {post.faqs.map((faq) => (
              <details key={faq.question} className="border rounded-lg p-4" style={{backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface)'}}>
                <summary className="font-semibold cursor-pointer">{faq.question}</summary>
                <p className="mt-2 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

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
