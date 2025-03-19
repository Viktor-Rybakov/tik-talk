import { createSelector } from '@ngrx/store';

import { profileFeature } from './reducer';

export const selectFilteredProfiles = createSelector(
  profileFeature.selectProfiles,
  (profiles) => profiles
);

export const selectProfilesFilters = createSelector(
  profileFeature.selectProfileFilters,
  (filters) => filters
);

export const selectMyProfile = createSelector(
  profileFeature.selectMyProfile,
  (myProfile) => myProfile
);
