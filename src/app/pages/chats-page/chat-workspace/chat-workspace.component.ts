import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatMessagesListComponent } from './chat-messages-list/chat-messages-list.component';
import { ChatsService } from '../../../data/services/chats.service';
import { type Chat } from '../../../data/interfaces/chats.interface';

@Component({
  selector: 'app-chat-workspace',
  imports: [ChatWorkspaceHeaderComponent, ChatMessagesListComponent, AsyncPipe],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {
  #route = inject(ActivatedRoute);
  #chatService = inject(ChatsService);

  activeChat$: Observable<Chat> = this.#route.params.pipe(switchMap(({ id }) => this.#chatService.getChatById(id)));
}
