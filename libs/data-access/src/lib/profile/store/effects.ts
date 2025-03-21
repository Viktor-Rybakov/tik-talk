import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProfileService, MyProfileService } from '../services';
import { profileActions } from './actions';
import { selectProfilesFilters, selectProfilesPageable } from './selectors';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  #profileService = inject(ProfileService);
  #myProfileService = inject(MyProfileService);
  #store = inject(Store);
  actions$ = inject(Actions);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        profileActions.filterEvent,
        profileActions.setPage
      ),
      withLatestFrom(
        this.#store.select(selectProfilesFilters),
        this.#store.select(selectProfilesPageable)
      ),
      switchMap(([ _, filters, pageable ]) => {
        return this.#profileService.getFilteredProfiles({...filters, ...pageable});
      }),
      map((response) => profileActions.profilesLoaded({ profiles: response.items }))
    );
  });

  fetchMyProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.fetchMyProfile),
      switchMap(() => this.#myProfileService.getMe()),
      map((response) => profileActions.myProfileLoaded({ myProfile: response }))
    );
  });
}
