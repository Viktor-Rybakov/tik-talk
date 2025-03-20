import { createActionGroup, props } from '@ngrx/store';

import type { Post, PostCreateDto, PostComment, CommentCreateDto } from '../interfaces';

export const postsActions = createActionGroup({
  source: 'Posts',
  events: {
    fetchPosts: props<{ userId: number }>(),
    createPost: props<{ newPost: PostCreateDto, userId: number }>(),
    postsLoaded: props<{ posts: Post[] }>(),
    fetchComments: props<{ postId: number }>(),
    createComment: props<{ newComment: CommentCreateDto }>(),
    commentsLoaded: props<{ postId: number, comments: PostComment[] }>(),
  },
});
