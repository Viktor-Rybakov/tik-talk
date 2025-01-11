import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ProfileCardComponent } from './common-ui/profile-card/profile-card.component';
import { ProfileRestService } from './data/services/profile-rest.service';
import { type Profile } from './data/interfaces/profile.iterface';

@Component({
  selector: 'app-root',
  imports: [ProfileCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ProfileRestService],
})
export class AppComponent {
  private _profileRestService = inject(ProfileRestService);

  profiles: Profile[] = [];

  constructor() {
    this._profileRestService.getProfiles$().pipe(takeUntilDestroyed()).subscribe({
      next: (profiles) => {
        this.profiles = profiles;
      }
    });
  }
}
