import { createActionGroup, props } from '@ngrx/store';

import type { Profile, ProfilesSearch } from '../interfaces';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    filterEvent: props<{ filters: Partial<ProfilesSearch> }>(),
    profilesLoaded: props<{ profiles: Profile[] }>(),
    fetchMyProfile: props<{ profileId?: number }>(),
    myProfileLoaded: props<{ myProfile: Profile }>(),
  },
});
