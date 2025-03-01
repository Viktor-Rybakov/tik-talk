import { Component } from '@angular/core';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'app-chat-messages-list',
  imports: [ChatMessageComponent],
  templateUrl: './chat-messages-list.component.html',
  styleUrl: './chat-messages-list.component.scss',
})
export class ChatMessagesListComponent {}
