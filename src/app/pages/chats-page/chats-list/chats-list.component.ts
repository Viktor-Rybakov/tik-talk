import { Component } from '@angular/core';
import { ChatButtonComponent } from './chat-button/chat-button.component';

@Component({
  selector: 'app-chats-list',
  imports: [ChatButtonComponent],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
})
export class ChatsListComponent {}
