import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { type CommentCreateDto, type Post, type PostCreateDto } from '../interfaces/post.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  posts = signal<Post[]>([]);

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${ApiPrefix}post/`, payload);
  }

  getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${ApiPrefix}post/`).pipe(
      tap((response: Post[]) => {
        this.posts.set(response);
      })
    );
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<Comment>(`${ApiPrefix}comment/`, payload);
  }
}
