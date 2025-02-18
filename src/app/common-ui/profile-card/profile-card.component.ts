import { Component, Input } from '@angular/core';

import { type Profile } from '../../data/interfaces/profile.interface';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: Profile;
}
