import { createActionGroup, props } from '@ngrx/store';

import { ChatWSUnreadMessage } from '../interfaces/chat-ws-message.interface';

export const chatActions = createActionGroup({
  source: 'Chat',
  events: {
    newWSUnreadMessage: props<{ message: ChatWSUnreadMessage }>(),
    unreadMessagesCountUpdated: props<{ count: number }>(),
  },
});
