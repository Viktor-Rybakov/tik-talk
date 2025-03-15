import { createActionGroup, props } from '@ngrx/store';

import { Profile } from '@tt/interfaces/profile';
import { ProfilesFilter } from '../interfaces/profilesFilter';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    filterEvent: props<{ filters: Partial<ProfilesFilter> }>(),
    profilesLoaded: props<{ profiles: Profile[] }>(),
  },
});
