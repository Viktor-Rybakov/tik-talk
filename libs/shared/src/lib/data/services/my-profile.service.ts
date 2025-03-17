import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import type { Profile } from '@tt/interfaces/profile';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class MyProfileService {
  #http = inject(HttpClient);

  getMe(): Observable<Profile> {
    return this.#http.get<Profile>(`${ApiPrefix}account/me`);
  }
}
