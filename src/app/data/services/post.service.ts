import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { type Post, type PostCreateDto } from '../interfaces/post.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  #http = inject(HttpClient);

  createPost(payload: PostCreateDto): Observable<Post> {
    return this.#http.post<Post>(`${ApiPrefix}post/`, payload);
  }
}
