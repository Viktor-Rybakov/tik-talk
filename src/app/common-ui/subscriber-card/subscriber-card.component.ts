import { Component, Input } from '@angular/core';

import { type Profile } from '../../data/interfaces/profile.iterface';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-subscriber-card',
  imports: [AvatarUrlPipe],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input({ required: true }) profile!: Profile;
}
