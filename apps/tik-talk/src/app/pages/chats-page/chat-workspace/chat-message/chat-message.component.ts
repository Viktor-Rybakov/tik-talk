import { Component, HostBinding, input } from '@angular/core';

import { type Message } from '../../../../data/interfaces/chats.interface';
import { AvatarComponent } from '../../../../common-ui/avatar/avatar.component';
import { LocalDatePipe } from '../../../../helpers/pipes/local-date.pipe';

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
