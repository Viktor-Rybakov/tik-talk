import { Component, inject, input } from '@angular/core';
import { firstValueFrom, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { MessageInputComponent } from '../../../../common-ui/message-input/message-input.component';
import { ChatsService } from '../../../../data/services/chats.service';
import { type Chat } from '../../../../data/interfaces/chats.interface';

@Component({
  selector: 'app-chat-messages-list',
  imports: [ChatMessageComponent, MessageInputComponent],
  templateUrl: './chat-messages-list.component.html',
  styleUrl: './chat-messages-list.component.scss',
})
export class ChatMessagesListComponent {
  #chatService = inject(ChatsService);

  chat = input.required<Chat>();
  messages = this.#chatService.activeChatMessages;

  async onMessageSend(messageText: string) {
    await firstValueFrom(this.#chatService.sendMessage(this.chat().id, messageText).pipe(
      switchMap(() => this.#chatService.getChatById(this.chat().id))
    ));
  }

  constructor() {
    this.#startUpdateChat();
  }

  #startUpdateChat() {
    timer(60000, 20000).pipe(
      switchMap(() => this.#chatService.getChatById(this.chat().id)),
      takeUntilDestroyed()
    ).subscribe();
  }
}
