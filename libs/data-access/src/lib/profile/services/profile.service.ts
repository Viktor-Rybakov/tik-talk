import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import type { Pageable } from '../../common';
import type { Profile } from '../interfaces';
import { profileActions } from '../store/actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  #http = inject(HttpClient);
  #store = inject(Store);

  constructor() {
    this.#store.dispatch(profileActions.fetchMyProfile({}));
  }

  getFilteredProfiles(params: Record<string, any>): Observable<Pageable<Profile>> {
    return this.#http.get<Pageable<Profile>>('/yt-course/account/accounts', { params });
  }

  getAccount(id: string): Observable<Profile> {
    return this.#http.get<Profile>(`/yt-course/account/${id}`);
  }

  getSubscribers(): Observable<Pageable<Profile>> {
    return this.#http.get<Pageable<Profile>>('/yt-course/account/subscribers/');
  }

  getSubscribersShortList(amount: number = 3): Observable<Profile[]> {
    return this.getSubscribers().pipe(map((response) => response.items.slice(0, amount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.#http.patch<Profile>('/yt-course/account/me', profile);
  }

  uploadImage(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.#http.post<Profile>('/yt-course/account/upload_image', fd);
  }
}
