import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, Observable, of, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatMessagesListComponent } from './chat-messages-list/chat-messages-list.component';
import { ChatsService } from '@tt/data-access/chats';
import { type Chat } from '@tt/data-access/chats';

@Component({
  selector: 'app-chat-workspace',
  imports: [ChatWorkspaceHeaderComponent, ChatMessagesListComponent, AsyncPipe],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #chatService = inject(ChatsService);

  activeChat$: Observable<Chat | null> = this.#route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'new') {
        return this.#route.queryParams.pipe(
          filter(({ userId }) => userId),
          switchMap(({ userId }) => {
            return this.#chatService.createChat(userId).pipe(
              switchMap((chat) => {
                this.#router.navigate(['/', 'chats', chat.id]);
                return of(null);
              })
            );
          })
        );
      }

      return this.#chatService.getChatById(id);
    })
  );
}
