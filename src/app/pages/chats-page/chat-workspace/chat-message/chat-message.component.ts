import { Component, HostBinding, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type Message } from '../../../../data/interfaces/chats.interface';
import { AvatarComponent } from '../../../../common-ui/avatar/avatar.component';

@Component({
  selector: 'app-chat-message',
  imports: [AvatarComponent, DatePipe],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
})
export class ChatMessageComponent {
  message = input.required<Message>();

  @HostBinding('class.my-message')
  get isMine(): boolean {
    return this.message().isMine ?? false;
  }
}
