import { createFeature, createReducer, on } from '@ngrx/store';

import { Profile } from '../interfaces/profile.interface';
import { profileActions } from './actions';
import { ProfilesSearchInterface } from '../interfaces/profiles-search.interface';

interface ProfileState {
  profiles: Profile[];
  profileFilters: Partial<ProfilesSearchInterface>;
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
