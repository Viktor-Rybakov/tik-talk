import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';

import { MessageInputComponent } from '@tt/common-ui';
import { selectMyProfile } from '@tt/data-access/profile';
import { postsActions, selectPosts, type PostCreateDto } from '@tt/data-access/posts';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-post-feed',
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFeedComponent implements OnChanges, AfterViewInit {
  #store = inject(Store);
  #hostElement = inject(ElementRef);
  #r2 = inject(Renderer2);

  myProfile = this.#store.selectSignal(selectMyProfile);
  posts = this.#store.selectSignal(selectPosts);

  userId = input.required<number>();

  isMyPage = computed<boolean>(() => this.myProfile()?.id === this.userId());

  constructor() {
    this.#startListenWindowResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId']) {
      this.#store.dispatch(postsActions.fetchPosts({ userId: this.userId() }));
    }
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

    this.#store.dispatch(postsActions.createPost({ newPost: payload, userId: this.userId() }));
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
