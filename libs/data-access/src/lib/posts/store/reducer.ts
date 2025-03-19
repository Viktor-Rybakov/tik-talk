import { createFeature, createReducer, on } from '@ngrx/store';

import type { Post, PostComment } from '../interfaces/post.interface';
import { postsActions } from './actions';

export interface PostsState {
  posts: Post[];
  comments: Map<number, PostComment[]>;
}

export const initialState: PostsState = {
  posts: [],
  comments: new Map(),
};

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialState,
    on(postsActions.postsLoaded, (state, payload) => {
      return {
        ...state,
        posts: payload.posts,
      };
    }),
    on(postsActions.commentsLoaded, (state, payload) => {
      const stateComments = new Map(state.comments);
      stateComments.set(payload.postId, payload.comments);

      return {
        ...state,
        comments: stateComments,
      };
    })
  ),
});
