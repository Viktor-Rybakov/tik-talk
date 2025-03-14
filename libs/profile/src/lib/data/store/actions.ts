import { createActionGroup, props } from '@ngrx/store';

import { Profile } from '@tt/interfaces/profile';

export const profileActions = createActionGroup({
  source: 'Profile',
  events: {
    filterEvent: props<{ filters: Record<string, any> }>(),
    profilesLoaded: props<{ profiles: Profile[] }>(),
  },
});
