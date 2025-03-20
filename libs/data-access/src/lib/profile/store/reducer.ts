import { createFeature, createReducer, on } from '@ngrx/store';

import type { Profile, ProfilesSearch } from '../interfaces';
import { profileActions } from './actions';

interface ProfileState {
  profiles: Profile[];
  profileFilters: Partial<ProfilesSearch>;
  myProfile: Profile | null;
}

const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  myProfile: null,
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
    }),
    on(profileActions.filterEvent, (state, payload) => {
      return {
        ...state,
        profileFilters: payload.filters,
      };
    }),
    on(profileActions.myProfileLoaded, (state, payload) => {
      return {
        ...state,
        myProfile: payload.myProfile,
      };
    })
  ),
});
