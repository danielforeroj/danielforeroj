import { Post } from '../types';
import { newPosts } from './posts';

// Every post is one file under data/posts, collected in data/posts/index.ts.
// Newest first. The blog index sorts again, the homepage takes the first three.
export const posts: Post[] = [...newPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
);
