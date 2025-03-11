import { Component, input } from '@angular/core';

import { type LastMessage } from '../../../../data/interfaces/chats.interface';
import { AvatarComponent } from '../../../../common-ui/avatar/avatar.component';
import { LocalDatePipe } from '../../../../helpers/pipes/local-date.pipe';

@Component({
  selector: 'button[chat]',
  imports: [AvatarComponent, LocalDatePipe],
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.scss',
})
export class ChatButtonComponent {
  chat = input.required<LastMessage>();
}
