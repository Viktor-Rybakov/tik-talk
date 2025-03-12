import { Component, Input } from '@angular/core';

import { type Profile } from '@tt/profile';
import { AvatarComponent } from '@tt/common-ui';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: Profile;
}
