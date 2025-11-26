import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { posts } from '../data/mockData';
import Button from '../components/Button';
import Chip from '../components/Chip';
import { SITE } from '../data/siteConfig';
import { applyPageSEO, buildBlogPostingJsonLd, buildBreadcrumbListJsonLd } from '../lib/seo';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

  React.useEffect(() => {
    if (!post) return;

    const canonicalUrl = `${SITE.url}/post/${post.slug}`;
    applyPageSEO({
      title: `${post.title} | ${SITE.name}`,
      description: post.excerpt,
      canonicalUrl,
      ogType: 'article',
      keywords: post.tags,
      jsonLd: [
        buildBlogPostingJsonLd(post),
        buildBreadcrumbListJsonLd([
          { name: 'Home', url: SITE.url },
          { name: 'Blog', url: `${SITE.url}/blog` },
          { name: post.title, url: canonicalUrl },
        ]),
      ],
    });
  }, [post]);

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
      
      <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-line" style={{color: 'var(--md-sys-color-on-background)'}}>
        {post.content_md}
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
