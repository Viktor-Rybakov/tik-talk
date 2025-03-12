import { Component, HostBinding, input } from '@angular/core';

import { type Message } from '../../../data';
import { AvatarComponent } from '@tt/common-ui';
import { LocalDatePipe } from '@tt/common-ui';

@Component({
  selector: 'app-chat-message',
  imports: [AvatarComponent, LocalDatePipe],
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
