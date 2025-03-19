import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { type Profile } from '@tt/data-access/profile';
import { AvatarComponent } from '@tt/common-ui';

@Component({
  selector: 'app-profile-card',
  imports: [AvatarComponent],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: Profile;
}
