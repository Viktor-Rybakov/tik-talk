import { createFeature, createReducer, on } from '@ngrx/store';

import { chatActions } from './actions';

export interface ChatState {
  unreadMessagesCount: number;
}

const initialState: ChatState = {
  unreadMessagesCount: 0,
};

export const chatFeature = createFeature({
  name: 'chatFeature',
  reducer: createReducer(
    initialState,
    on(chatActions.unreadMessagesCountUpdated, (state, payload) => {
      return {
        ...state,
        unreadMessagesCount: payload.count,
      };
    })
  ),
});
