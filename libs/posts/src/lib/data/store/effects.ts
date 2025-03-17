import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { PostService } from '../services/post.service';
import { postsActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class PostsEffects {
  #profileService = inject(PostService);
  actions$ = inject(Actions);

  fetchPosts = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.fetchPosts),
      switchMap(() => this.#profileService.getPosts()),
      map((response) => postsActions.postsLoaded({ posts: response }))
    );
  });

  createPost = createEffect(() => {
    return this.actions$.pipe(
      ofType(postsActions.createPost),
      switchMap(({ newPost }) => {
        return this.#profileService.createPost(newPost);
      }),
      map(() => postsActions.fetchPosts({}))
    );
  });
}
