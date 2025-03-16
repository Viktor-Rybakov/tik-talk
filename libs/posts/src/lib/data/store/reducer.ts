import { Post } from '../interfaces/post.interface';
import { createFeature, createReducer, on } from '@ngrx/store';
import { postsActions } from './actions';

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [],
}

export const postsFeature = createFeature({
  name: 'postsFeature',
  reducer: createReducer(
    initialState,
    on(postsActions.postsLoaded, (state, payload) => {
      return {
        ...state,
        posts: payload.posts,
      };
    })
  )
});
