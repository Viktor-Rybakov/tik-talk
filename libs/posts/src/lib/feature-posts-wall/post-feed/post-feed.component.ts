import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { MessageInputComponent } from '@tt/common-ui';
import { selectMyProfile } from '@tt/data-access/profile';
import { PostComponent } from '../post/post.component';
import { postsActions, selectPosts } from '@tt/data-access/posts';
import { type PostCreateDto } from '@tt/data-access/posts';

@Component({
  selector: 'app-post-feed',
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements AfterViewInit {
  #store = inject(Store);
  #hostElement = inject(ElementRef);
  #r2 = inject(Renderer2);
  myProfile = this.#store.selectSignal(selectMyProfile);

  posts = this.#store.selectSignal(selectPosts);

  constructor() {
    this.#store.dispatch(postsActions.fetchPosts({}));
    this.#startListenWindowResize();
  }

  ngAfterViewInit(): void {
    this.#resizeFeed();
  }

  onPostCreated(commentText: string): void {
    const payload: PostCreateDto = {
      title: 'Новый пост',
      authorId: this.myProfile()!.id,
      content: commentText,
    };

    this.#store.dispatch(postsActions.createPost({ newPost: payload }));
  }

  #resizeFeed(): void {
    const { top } = this.#hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24;
    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', `${height}px`);
  }

  #startListenWindowResize(): void {
    fromEvent(window, 'resize')
      .pipe(debounceTime(50), takeUntilDestroyed())
      .subscribe(() => {
        this.#resizeFeed();
      });
  }
}
