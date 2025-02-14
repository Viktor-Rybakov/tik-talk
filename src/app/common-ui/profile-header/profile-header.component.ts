import { Component, Input } from '@angular/core';

import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';
import { type Profile } from '../../data/interfaces/profile.iterface';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarUrlPipe],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
})
export class ProfileHeaderComponent {
  @Input({ required: true }) profile!: Profile;
}
