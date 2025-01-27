import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { type Profile } from '../interfaces/profile.iterface';
import { type Pageable } from '../interfaces/pageable.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class ProfileRestService {
  private _http = inject(HttpClient);

  me = signal<Profile | null>(null);

  getProfiles(): Observable<Profile[]> {
    return this._http.get<Profile[]>(`${ApiPrefix}account/test_accounts`);
  }

  getMe(): Observable<Profile> {
    return this._http.get<Profile>(`${ApiPrefix}account/me`).pipe(
      tap((response) => {
        this.me.set(response);
      })
    );
  }

  getSubscribers(): Observable<Pageable<Profile>> {
    return this._http.get<Pageable<Profile>>(`${ApiPrefix}account/subscribers/`);
  }
}
