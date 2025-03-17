import { createActionGroup, props } from '@ngrx/store';

import type { Profile } from '@tt/interfaces/profile';
import { ProfilesSearchInterface } from '../interfaces/profiles-search.interface';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    filterEvent: props<{ filters: Partial<ProfilesSearchInterface> }>(),
    profilesLoaded: props<{ profiles: Profile[] }>(),
  },
});
