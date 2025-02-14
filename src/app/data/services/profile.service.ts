import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

import { type Profile } from '../interfaces/profile.iterface';
import { type Pageable } from '../interfaces/pageable.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private _http = inject(HttpClient);

  me = signal<Profile | null>(null);
  filteredProfiles = signal<Profile[]>([]);

  getFilteredProfiles(params: Record<string, any>): Observable<Pageable<Profile>> {
    return this._http
      .get<Pageable<Profile>>(`${ApiPrefix}account/accounts`, { params })
      .pipe(tap((response) => this.filteredProfiles.set(response.items)));
  }

  getMe(): Observable<Profile> {
    return this._http.get<Profile>(`${ApiPrefix}account/me`).pipe(
      tap((response) => {
        this.me.set(response);
      })
    );
  }

  getAccount(id: string): Observable<Profile> {
    return this._http.get<Profile>(`${ApiPrefix}account/${id}`);
  }

  getSubscribers(): Observable<Pageable<Profile>> {
    return this._http.get<Pageable<Profile>>(`${ApiPrefix}account/subscribers/`);
  }

  getSubscribersShortList(amount: number = 3): Observable<Profile[]> {
    return this.getSubscribers().pipe(map((response) => response.items.slice(0, amount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this._http.patch<Profile>(`${ApiPrefix}account/me`, profile);
  }

  uploadImage(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this._http.post<Profile>(`${ApiPrefix}account/upload_image`, fd);
  }
}
