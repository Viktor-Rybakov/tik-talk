import { Component, Input } from '@angular/core';

import { type Profile } from '../../data/interfaces/profile.iterface';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-subscriber-card',
  imports: [AvatarComponent],
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
})
export class SubscriberCardComponent {
  @Input({ required: true }) profile!: Profile;
}
