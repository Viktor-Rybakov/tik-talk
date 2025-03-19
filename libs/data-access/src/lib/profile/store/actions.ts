import { createActionGroup, props } from '@ngrx/store';

import type { Profile } from '../interfaces/profile.interface';
import { ProfilesSearchInterface } from '../interfaces/profiles-search.interface';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    filterEvent: props<{ filters: Partial<ProfilesSearchInterface> }>(),
    profilesLoaded: props<{ profiles: Profile[] }>(),
    fetchMyProfile: props<{ profileId?: number }>(),
    myProfileLoaded: props<{ myProfile: Profile }>(),
  },
});
