import { Component, inject } from '@angular/core';
import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileRestService } from '../../data/services/profile-rest.service';
import type { Profile } from '../../data/interfaces/profile.iterface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-search-page',
  imports: [
    ProfileCardComponent
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  providers: [ProfileRestService]
})
export class SearchPageComponent {
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
