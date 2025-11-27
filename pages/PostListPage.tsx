
import React from 'react';
import { NavLink } from 'react-router-dom';
import { posts as allPosts } from '../data/mockData';
import { PostType } from '../types';
import Card from '../components/Card';
import Chip from '../components/Chip';
import { applyPageSEO, buildBlogCollectionJsonLd, buildBreadcrumbListJsonLd, buildSiteSearchJsonLd } from '../lib/seo';
import { SITE } from '../data/siteConfig';

interface PostListPageProps {
  type: PostType;
  title: string;
}

const PostListPage: React.FC<PostListPageProps> = ({ type, title }) => {
  const filteredPosts = React.useMemo(
    () =>
      allPosts
        .filter(post => post.type === type)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [type],
  );

  React.useEffect(() => {
    const sectionPath =
      type === PostType.RESEARCH ? '/research' : type === PostType.LEAD_MAGNET ? '/leads' : '/blog';
    const canonicalUrl = `${SITE.url}${sectionPath}`;
    const tags = filteredPosts.flatMap((post) => post.tags ?? []);

    applyPageSEO({
      title: `${title} | ${SITE.name}`,
      description:
        type === PostType.RESEARCH
          ? 'Research, frameworks, and experiments for Web3/AI go-to-market.'
          : type === PostType.LEAD_MAGNET
            ? 'Downloads, templates, and checklists for faster GTM execution.'
            : 'All blog posts, playbooks, and narratives from Daniel Forero.',
      canonicalUrl,
      keywords: [...new Set(tags)],
      jsonLd: [
        buildBlogCollectionJsonLd(filteredPosts, title, canonicalUrl),
        buildBreadcrumbListJsonLd([
          { name: 'Home', url: SITE.url },
          { name: title, url: canonicalUrl },
        ]),
        buildSiteSearchJsonLd(),
      ],
    });
  }, [filteredPosts, title, type]);

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-extrabold tracking-tight" style={{color: 'var(--md-sys-color-primary)'}}>{title}</h1>
      
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <NavLink to={`/post/${post.slug}`} key={post.slug} className="block hover:no-underline">
              <Card className="h-full flex flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-bold" style={{color: 'var(--md-sys-color-on-surface)'}}>{post.title}</h2>
                    {post.type === PostType.LEAD_MAGNET && <Chip>Download</Chip>}
                  </div>
                  <p className="text-sm mt-1" style={{color: 'var(--md-sys-color-on-surface-variant)'}}>
                    {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="mt-4 text-sm">{post.excerpt}</p>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags?.map(tag => (
                     <span key={tag} className="text-xs px-2 py-1 rounded" style={{backgroundColor: 'var(--md-sys-color-surface)', color: 'var(--md-sys-color-on-surface-variant)'}}>#{tag}</span>
                  ))}
                </div>
              </Card>
            </NavLink>
          ))}
        </div>
      ) : (
        <p>No posts found in this category.</p>
      )}
    </div>
  );
};

export default PostListPage;
