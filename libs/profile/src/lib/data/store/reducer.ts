import { createFeature, createReducer, on } from '@ngrx/store';

import { Profile } from '@tt/interfaces/profile';
import { profileActions } from './actions';

interface ProfileState {
  profiles: Profile[];
  profileFilters: Record<string, any>;
}

const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => {
      return {
        ...state,
        profiles: payload.profiles,
      };
    })
  ),
});
