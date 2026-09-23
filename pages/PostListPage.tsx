import React from 'react';
import { NavLink } from 'react-router-dom';
import { posts as allPosts } from '../data/mockData';
import { PostType } from '../types';
import { buildBlogCollectionJsonLd, buildBreadcrumbListJsonLd, postCopy } from '../lib/seo';
import { SITE } from '../data/siteConfig';
import { formatDate, localePath, useLang, useUi } from '../lib/i18n';
import Seo from '../lib/SeoHead';

interface PostListPageProps {
  type: PostType;
}

// Section titles, standfirsts and search-surface descriptions live in
// lib/i18n.ts under `list`, keyed by post type, in both languages.

const PostListPage: React.FC<PostListPageProps> = ({ type }) => {
  const lang = useLang();
  const t = useUi();
  const title = t.list.titles[type];

  const filteredPosts = React.useMemo(
    () =>
      allPosts
        .filter(post => post.type === type)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    [type],
  );

  const sectionBase =
    type === PostType.RESEARCH ? '/research' : type === PostType.LEAD_MAGNET ? '/leads' : '/blog';
  const sectionPath = localePath(sectionBase, lang);
  const canonicalUrl = `${SITE.url}${sectionPath}`;
  const tags = filteredPosts.flatMap((post) => postCopy(post, lang).tags ?? []);

  return (
    <div className="page">
      <Seo
        title={`${title} | ${SITE.name}`}
        description={t.list.meta[type]}
        path={sectionPath}
        keywords={[...new Set(tags)]}
        jsonLd={[
          buildBlogCollectionJsonLd(filteredPosts, title, canonicalUrl, lang, t.list.collectionIndex(title)),
          buildBreadcrumbListJsonLd([
            { name: t.crumbs.home, url: `${SITE.url}${localePath('/', lang)}` },
            { name: title, url: canonicalUrl },
          ]),
        ]}
      />
      <header className="page-header">
        <p className="section-kicker">{t.list.kicker}</p>
        <h1 className="page-title">{title}</h1>
        <p className="article-excerpt">{t.list.standfirst[type]}</p>
      </header>

      {filteredPosts.length > 0 ? (
        <div className="post-grid">
          {filteredPosts.map(post => {
            const copy = postCopy(post, lang);
            return (
              <NavLink to={localePath(`/post/${post.slug}`, lang)} key={post.slug} className="post-card">
                <div className="post-card__meta">{formatDate(post.date, lang)}</div>
                <h2>{copy.title}</h2>
                <p>{copy.excerpt}</p>
                <div className="post-card__tags">
                  {post.type === PostType.LEAD_MAGNET ? <span className="chip">{t.list.download}</span> : null}
                  {copy.tags?.slice(0, 4).map(tag => (
                    <span key={tag} className="chip">{tag}</span>
                  ))}
                </div>
                <span className="post-card__arrow" aria-hidden="true">{t.list.read}</span>
              </NavLink>
            );
          })}
        </div>
      ) : (
        <p className="empty-state">{t.list.empty}</p>
      )}
    </div>
  );
};

export default PostListPage;
