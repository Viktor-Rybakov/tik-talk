import { AfterViewInit, Component, ElementRef, HostListener, inject, Renderer2 } from '@angular/core';
import { firstValueFrom, switchMap } from 'rxjs';

import { PostInputComponent } from '../post-input/post-input.component';
import { PostComponent } from '../post/post.component';
import { PostService } from '../../../data/services/post.service';
import { PostCreateDto } from '../../../data/interfaces/post.interface';

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

  @HostListener('window:resize')
  onWindowResize(): void {
    this.#resizeFeed();
  }

  posts = this.#postService.posts;

  constructor() {
    firstValueFrom(this.#postService.getPosts());
  }

  ngAfterViewInit(): void {
    this.#resizeFeed();
  }

  onPostCreated(payload: PostCreateDto): void {
    firstValueFrom(this.#postService.createPost(payload).pipe(switchMap(() => this.#postService.getPosts())));
  }

  #resizeFeed() {
    const { top } = this.#hostElement.nativeElement.getBoundingClientRect();
    const height = window.innerHeight - top - 24;
    this.#r2.setStyle(this.#hostElement.nativeElement, 'height', `${height}px`);
  }
}
