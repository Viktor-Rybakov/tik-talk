import { Component, Input } from '@angular/core';

import { type Profile } from '@tt/profile';
import { AvatarComponent } from '@tt/common-ui';

@Component({
  selector: 'app-subscriber-card',
  imports: [AvatarComponent],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input({ required: true }) profile!: Profile;
}
