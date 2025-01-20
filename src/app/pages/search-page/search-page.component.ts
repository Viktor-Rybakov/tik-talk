import { Component, inject } from '@angular/core';
import { catchError } from 'rxjs';

import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileRestService } from '../../data/services/profile-rest.service';
import type { Profile } from '../../data/interfaces/profile.iterface';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private _profileRestService = inject(ProfileRestService);

  profiles: Profile[] = [];

  constructor() {
    this._profileRestService.getProfiles$().pipe(
      catchError(() => {
        throw new Error('ProfileRestService error');
      })
    ).subscribe({
      next: (profiles) => {
        this.profiles = profiles;
      }
    });
  }
}
