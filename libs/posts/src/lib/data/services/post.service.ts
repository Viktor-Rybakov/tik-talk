import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

import { type CommentCreateDto, type Post, type PostComment, type PostCreateDto } from '../interfaces/post.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  createPost(payload: PostCreateDto) {
    return this.#http.post<Post>(`${ApiPrefix}post/`, payload);
  }

  getPosts(): Observable<Post[]> {
    return this.#http.get<Post[]>(`${ApiPrefix}post/`);
  }

  createComment(payload: CommentCreateDto) {
    return this.#http.post<PostComment>(`${ApiPrefix}comment/`, payload);
  }

  getCommentsByPostId(postId: number): Observable<PostComment[]> {
    return this.#http.get<Post>(`${ApiPrefix}post/${postId}`).pipe(map((response: Post) => response.comments));
  }
}
