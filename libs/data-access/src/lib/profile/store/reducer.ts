import { createFeature, createReducer, on } from '@ngrx/store';

import type { Profile, ProfilesSearch } from '../interfaces';
import { profileActions } from './actions';

interface ProfileState {
  profiles: Profile[];
  profileFilters: Partial<ProfilesSearch>;
  page: number;
  size: number;
  myProfile: Profile | null;
}

const initialState: ProfileState = {
  profiles: [],
  profileFilters: {},
  page: 1,
  size: 10,
  myProfile: null,
};

export const profileFeature = createFeature({
  name: 'profileFeature',
  reducer: createReducer(
    initialState,
    on(profileActions.profilesLoaded, (state, payload) => {
      return {
        ...state,
        profiles: state.profiles.concat(payload.profiles),
      };
    }),

    on(profileActions.filterEvent, (state, payload) => {
      return {
        ...state,
        profiles: [],
        profileFilters: payload.filters,
        page: 1,
      };
    }),

    on(profileActions.setPage, (state, payload) => {
      let page = payload.page;

      if (!page) {
        page = state.page + 1;
      }

      return {
        ...state,
        page,
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
