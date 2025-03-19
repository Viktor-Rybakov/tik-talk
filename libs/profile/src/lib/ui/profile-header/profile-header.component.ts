import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { type Profile } from '@tt/data-access/profile';
import { AvatarComponent } from '@tt/common-ui';

@Component({
  selector: 'app-profile-header',
  imports: [AvatarComponent],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileHeaderComponent {
  @Input({ required: true }) profile!: Profile;
}
