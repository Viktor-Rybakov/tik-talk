import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';

import { MessageInputComponent, RelativeDatePipe } from '@tt/common-ui';
import { ChatsService, type Chat } from '@tt/data-access/chats';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-messages-list',
  imports: [ChatMessageComponent, MessageInputComponent, RelativeDatePipe],
  templateUrl: './chat-messages-list.component.html',
  styleUrl: './chat-messages-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
