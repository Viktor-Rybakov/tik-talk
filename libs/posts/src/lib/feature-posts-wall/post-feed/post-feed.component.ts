import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { PostComponent } from '../post/post.component';
import { postsActions, postsFeature } from '../../data';
import { type PostCreateDto } from '../../data';
import { MessageInputComponent } from '@tt/common-ui';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'app-post-feed',
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  #store = inject(Store);
  #hostElement = inject(ElementRef);
  #r2 = inject(Renderer2);
  me = inject(GlobalStoreService).me;

  posts = this.#store.selectSignal(postsFeature.selectPosts);

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
      authorId: this.me()!.id,
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
