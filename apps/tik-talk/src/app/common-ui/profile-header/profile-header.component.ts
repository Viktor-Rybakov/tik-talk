import { Component, Input } from '@angular/core';

import { type Profile } from '../../data/interfaces/profile.interface';
import { AvatarComponent } from '@tt/common-ui';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  @Input({ required: true }) profile!: Profile;
}
