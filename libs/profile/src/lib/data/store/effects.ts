import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs';

import { ProfileService } from '../services/profile.service';
import { profileActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class ProfileEffects {
  #profileService = inject(ProfileService);
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
}
