import { createSelector } from '@ngrx/store';

import { myProfileFeature } from './reducer';

export const selectMyProfile = createSelector(myProfileFeature.selectMyProfile, (myProfile) => myProfile);
