import { createActionGroup, props } from '@ngrx/store';

import type { ChatWSUnreadMessage } from '../interfaces';

export const chatActions = createActionGroup({
  source: 'Chat',
  events: {
    newWSUnreadMessage: props<{ message: ChatWSUnreadMessage }>(),
    unreadMessagesCountUpdated: props<{ count: number }>(),
  },
});
