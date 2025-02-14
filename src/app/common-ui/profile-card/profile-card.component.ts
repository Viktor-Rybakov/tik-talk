import { Component, Input } from '@angular/core';

import { type Profile } from '../../data/interfaces/profile.iterface';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarUrlPipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: Profile;
}
