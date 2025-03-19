import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import type { CommentCreateDto, Post, PostComment, PostCreateDto } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>('/yt-course/post/', payload);
  }

  getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>('/yt-course/post/');
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<PostComment>('/yt-course/comment/', payload);
  }

  getCommentsByPostId(postId: number): Observable<PostComment[]> {
    return this.#http.get<Post>(`/yt-course/post/${postId}`).pipe(map((response: Post) => response.comments));
  }
}
