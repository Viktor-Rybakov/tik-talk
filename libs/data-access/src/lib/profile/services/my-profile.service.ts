import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { Profile } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  #http = inject(HttpClient);

  getMe(): Observable<Profile> {
    return this.#http.get<Profile>('/yt-course/account/me');
  }
}
