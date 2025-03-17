import { createActionGroup, props } from '@ngrx/store';

import type { Post, PostCreateDto } from '../interfaces/post.interface';

export const postsActions = createActionGroup({
  source: 'Posts',
  events: {
    fetchPosts: props<{ page?: string }>(),
    createPost: props<{ newPost: PostCreateDto }>(),
    postsLoaded: props<{ posts: Post[] }>(),
  }
});
