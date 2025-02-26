import { AfterViewInit, Component, ElementRef, inject, Renderer2 } from '@angular/core';
import { debounce, firstValueFrom, fromEvent, interval, switchMap } from 'rxjs';

import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { type CommentCreateDto, type PostCreateDto } from '../../../data/interfaces/post.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  posts = this.#postService.posts.asReadonly();

  constructor() {
    firstValueFrom(this.#postService.getPosts());

    this.#startListenWindowResize();
  }

  ngAfterViewInit(): void {
    this.#resizeFeed();
  }

  onPostCreated(payload: PostCreateDto): void {
    firstValueFrom(this.#postService.createPost(payload).pipe(switchMap(() => this.#postService.getPosts())));
  }

  onCommentCreated(payload: CommentCreateDto): void {
    firstValueFrom(this.#postService.createComment(payload).pipe(switchMap(() => this.#postService.getPosts())));
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
