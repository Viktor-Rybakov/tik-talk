import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { type LastMessage } from '../../../data';
import { AvatarComponent } from '@tt/common-ui';
import { LocalDatePipe } from '@tt/common-ui';

@Component({
  selector: 'button[chat]',
  imports: [AvatarComponent, LocalDatePipe],
  templateUrl: './chat-button.component.html',
  styleUrl: './chat-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatButtonComponent {
  chat = input.required<LastMessage>();
}
