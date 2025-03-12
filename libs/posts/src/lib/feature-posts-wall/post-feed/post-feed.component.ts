import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { debounceTime, firstValueFrom, fromEvent, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PostComponent } from '../post/post.component';
import { PostService } from '../../data';
import type { PostCreateDto } from '../../data';
import { ProfileService } from '@tt/profile';
import { MessageInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-post-feed',
  imports: [PostComponent, MessageInputComponent],
  templateUrl: './post-feed.component.html',
  styleUrl: './post-feed.component.scss',
})
export class PostFeedComponent implements AfterViewInit {
  #postService = inject(PostService);
  #hostElement = inject(ElementRef);
  #r2 = inject(Renderer2);
  me = inject(ProfileService).me;

  posts = this.#postService.posts.asReadonly();

  constructor() {
    firstValueFrom(this.#postService.getPosts());

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

    firstValueFrom(this.#postService.createPost(payload).pipe(switchMap(() => this.#postService.getPosts())));
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
        console.log('+++');
        this.#resizeFeed();
      });
  }
}
