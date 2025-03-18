import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ChatsListComponent } from '../chats-list/chats-list.component';
import { ChatsService } from '../../data';

@Component({
  selector: 'app-chats-page',
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats-page.component.html',
  styleUrl: './chats-page.component.scss',
})
export class ChatsPageComponent {
  #chatService = inject(ChatsService);

  constructor() {
    this.#chatService.connectWS();
  }
}
