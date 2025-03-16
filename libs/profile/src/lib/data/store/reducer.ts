import { createFeature, createReducer, on } from '@ngrx/store';

import { Profile } from '@tt/interfaces/profile';
import { profileActions } from './actions';
import { ProfilesSearchInterface } from '../interfaces/profiles-search.interface';

interface ProfileState {
  profiles: Profile[];
  profileFilters: Partial<ProfilesSearchInterface>;
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
    }),
    on(profileActions.filterEvent, (state, payload) => {
      return {
        ...state,
        profileFilters: payload.filters,
      };
    })
  ),
});
