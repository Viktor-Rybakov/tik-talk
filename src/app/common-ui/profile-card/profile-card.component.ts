import { Component, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

import { Profile } from '../../data/interfaces/profile.iterface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe, TranslatePipe],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input({ required: true }) profile!: Profile;
}
