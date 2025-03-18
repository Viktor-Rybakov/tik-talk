import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs';

import { chatActions } from './actions';

@Injectable({
  providedIn: 'root',
})
export class ChatEffects {
  actions$ = inject(Actions);

  getNeWSMessage = createEffect(() => {
    return this.actions$.pipe(
      ofType(chatActions.newWSUnreadMessage),
      map(({ message }) => chatActions.unreadMessagesCountUpdated({ count: message.data.count }))
    );
  });
}
