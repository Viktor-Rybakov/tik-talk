import { Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { firstValueFrom, switchMap, timer } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { MessageInputComponent } from '@tt/common-ui';
import { ChatsService } from '../../../data';
import { type Chat } from '../../../data';
import { RelativeDatePipe } from '@tt/common-ui';

@Component({
  selector: 'app-chat-messages-list',
  imports: [ChatMessageComponent, MessageInputComponent, RelativeDatePipe],
  templateUrl: './chat-messages-list.component.html',
  styleUrl: './chat-messages-list.component.scss',
})
export class ChatMessagesListComponent implements OnInit {
  #chatService = inject(ChatsService);
  #destroyRef = inject(DestroyRef);

  chat = input.required<Chat>();

  messagesGroups = this.#chatService.activeChatMessagesGroups;

  async onMessageSend(messageText: string) {
    await firstValueFrom(
      this.#chatService
        .sendMessage(this.chat().id, messageText)
        .pipe(switchMap(() => this.#chatService.getChatById(this.chat().id)))
    );
  }

  ngOnInit() {
    this.#startUpdateChatPolling();
  }

  #startUpdateChatPolling() {
    timer(0, 5000)
      .pipe(
        switchMap(() => this.#chatService.getChatById(this.chat().id)),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe();
  }
}
