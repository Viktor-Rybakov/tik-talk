import { createSelector } from '@ngrx/store';

import { postsFeature } from './reducer';

export const selectPosts = createSelector(postsFeature.selectPosts, (posts) => posts);

export const selectCommentsByPostId = (postId: number) =>
  createSelector(postsFeature.selectComments, (comments) => comments.get(postId) ?? []);
