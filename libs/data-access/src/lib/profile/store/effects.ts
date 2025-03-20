import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { ProfileService, MyProfileService } from '../services';
import { profileActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  #profileService = inject(ProfileService);
  #myProfileService = inject(MyProfileService);
  actions$ = inject(Actions);

  filterProfiles = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.filterEvent),
      switchMap(({ filters }) => {
        return this.#profileService.getFilteredProfiles(filters);
      }),
      map((response) => profileActions.profilesLoaded({ profiles: response.items }))
    );
  });

  myProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(profileActions.fetchMyProfile),
      switchMap(() => this.#myProfileService.getMe()),
      map((response) => profileActions.myProfileLoaded({ myProfile: response }))
    );
  });
}
