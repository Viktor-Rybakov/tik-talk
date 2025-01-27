import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Profile } from '../../data/interfaces/profile.iterface';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarUrlPipe, TranslatePipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: Profile;
}
