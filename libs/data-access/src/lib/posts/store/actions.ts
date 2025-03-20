import { createActionGroup, props } from '@ngrx/store';

import type { Post, PostCreateDto, PostComment, CommentCreateDto } from '../interfaces';

export const postsActions = createActionGroup({
  source: 'Posts',
  events: {
    fetchPosts: props<{ page?: string }>(),
    createPost: props<{ newPost: PostCreateDto }>(),
    postsLoaded: props<{ posts: Post[] }>(),
    fetchComments: props<{ postId: number }>(),
    createComment: props<{ newComment: CommentCreateDto }>(),
    commentsLoaded: props<{ postId: number, comments: PostComment[] }>(),
  },
});
