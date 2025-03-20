import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs';

import { PostService } from '../services';
import { postsActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  #postService = inject(PostService);
  actions$ = inject(Actions);

  fetchPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchPosts),
      switchMap(() => this.#postService.getPosts()),
      map((response) => postsActions.postsLoaded({ posts: response }))
    );
  });

  fetchComments = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchComments),
      mergeMap(({ postId }) => {
        return this.#postService.getCommentsByPostId(postId).pipe(
          map((response) => postsActions.commentsLoaded({ postId, comments: response }))
        );
      })
    );
  });

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap(({ newPost }) => {
        return this.#postService.createPost(newPost);
      }),
      map(() => postsActions.fetchPosts({}))
    );
  });

  createComment = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createComment),
      switchMap(({ newComment }) => {
        return this.#postService.createComment(newComment);
      }),
      map(({ postId }) => postsActions.fetchComments({ postId }))
    );
  });
}
