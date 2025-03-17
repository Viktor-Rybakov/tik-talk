import type { Profile } from '@tt/interfaces/profile';
import { createFeature, createReducer, on } from '@ngrx/store';

import { myProfileActions } from './actions';

export interface MyProfile {
  myProfile: Profile | null;
}

export const initialState: MyProfile = {
  myProfile: null,
};

export const myProfileFeature = createFeature({
  name: 'myProfileFeature',
  reducer: createReducer(
    initialState,
    on(myProfileActions.myProfileLoaded, (state, payload) => {
      return {
        ...state,
        myProfile: payload.myProfile,
      };
    })
  ),
});
