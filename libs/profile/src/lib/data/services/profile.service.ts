import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { type Profile } from '@tt/interfaces/profile';
import { type Pageable } from '@tt/common-ui';
import { myProfileActions } from '@tt/shared';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  #http = inject(HttpClient);
  #store = inject(Store);

  constructor() {
    this.#store.dispatch(myProfileActions.fetchMyProfile({}));
  }

  getFilteredProfiles(params: Record<string, any>): Observable<Pageable<Profile>> {
    return this.#http.get<Pageable<Profile>>(`${ApiPrefix}account/accounts`, { params });
  }

  getAccount(id: string): Observable<Profile> {
    return this.#http.get<Profile>(`${ApiPrefix}account/${id}`);
  }

  getSubscribers(): Observable<Pageable<Profile>> {
    return this.#http.get<Pageable<Profile>>(`${ApiPrefix}account/subscribers/`);
  }

  getSubscribersShortList(amount: number = 3): Observable<Profile[]> {
    return this.getSubscribers().pipe(map((response) => response.items.slice(0, amount)));
  }

  patchProfile(profile: Partial<Profile>) {
    return this.#http.patch<Profile>(`${ApiPrefix}account/me`, profile);
  }

  uploadImage(file: File) {
    const fd = new FormData();
    fd.append('image', file);
    return this.#http.post<Profile>(`${ApiPrefix}account/upload_image`, fd);
  }
}
