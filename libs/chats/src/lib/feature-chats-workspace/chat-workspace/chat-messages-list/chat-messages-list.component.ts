import { Component, inject, input } from '@angular/core';

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
export class ChatMessagesListComponent {
  #chatService = inject(ChatsService);

  chat = input.required<Chat>();

  messagesGroups = this.#chatService.activeChatMessagesGroups;
  activeChatWSMessages = this.#chatService.activeChatWSMessages;

  onMessageSend(messageText: string) {
    this.#chatService.wsAdapter.sendMessage(messageText, this.chat().id);
  }
}
