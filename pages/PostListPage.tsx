import React from 'react';
import { NavLink } from 'react-router-dom';
import { posts as allPosts } from '../data/mockData';
import { PostType } from '../types';
import { applyPageSEO, buildBlogCollectionJsonLd, buildBreadcrumbListJsonLd, buildSiteSearchJsonLd } from '../lib/seo';
import { SITE } from '../data/siteConfig';

interface PostListPageProps {
  type: PostType;
  title: string;
}

const descriptions: Record<string, string> = {
  Blog: 'Narrative, operating notes, and field-tested GTM thinking for Web3 and AI teams.',
  Research: 'Frameworks, experiments, and market notes for teams building in emerging categories.',
  Downloads: 'Templates, checklists, and practical artifacts built to move work forward.',
};

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
    <div className="page">
      <header className="page-header">
        <p className="section-kicker">Library</p>
        <h1 className="page-title">{title}</h1>
        <p className="article-excerpt">{descriptions[title] ?? descriptions.Blog}</p>
      </header>

      {filteredPosts.length > 0 ? (
        <div className="post-grid">
          {filteredPosts.map(post => (
            <NavLink to={`/post/${post.slug}`} key={post.slug} className="post-card">
              <div className="post-card__meta">
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <div className="post-card__tags">
                {post.type === PostType.LEAD_MAGNET ? <span className="chip">Download</span> : null}
                {post.tags?.slice(0, 4).map(tag => (
                  <span key={tag} className="chip">{tag}</span>
                ))}
              </div>
              <span className="post-card__arrow" aria-hidden="true">Read</span>
            </NavLink>
          ))}
        </div>
      ) : (
        <p className="empty-state">No posts found in this category.</p>
      )}
    </div>
  );
};

export default PostListPage;
