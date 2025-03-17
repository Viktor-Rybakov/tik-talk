import { createActionGroup, props } from '@ngrx/store';

import type { Profile } from '@tt/interfaces/profile';

export const myProfileActions = createActionGroup({
  source: 'MyProfile',
  events: {
    fetchMyProfile: props<{ profileId?: number }>(),
    myProfileLoaded: props<{ myProfile: Profile }>(),
  },
});
