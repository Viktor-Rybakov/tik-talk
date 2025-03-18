import { createSelector } from '@ngrx/store';

import { chatFeature } from './reducer';

export const selectUnreadMessagesCount = createSelector(
  chatFeature.selectUnreadMessagesCount,
  (messagesCount) => messagesCount
);
