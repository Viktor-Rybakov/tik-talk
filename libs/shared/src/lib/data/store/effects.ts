import { inject, Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { myProfileActions } from './actions';
import { MyProfileService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class MyProfileEffects {
  #myProfileService = inject(MyProfileService);
  actions$ = inject(Actions);

  myProfile = createEffect(() => {
    return this.actions$.pipe(
      ofType(myProfileActions.fetchMyProfile),
      switchMap(() => this.#myProfileService.getMe()),
      map((response) => myProfileActions.myProfileLoaded({ myProfile: response }))
    );
  });
}
