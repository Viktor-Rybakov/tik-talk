import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { debounce, firstValueFrom, fromEvent, interval, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { type PostCreateDto } from '../../../data/interfaces/post.interface';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-feed',
  imports: [PostInputComponent, PostComponent],
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
      .pipe(
        debounce(() => interval(100)),
        takeUntilDestroyed()
      )
      .subscribe(() => {
        this.#resizeFeed();
      });
  }
}
