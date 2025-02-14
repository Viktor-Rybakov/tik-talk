import { Component, inject } from '@angular/core';
import { catchError } from 'rxjs';

import { ProfileCardComponent } from '../../common-ui/profile-card/profile-card.component';
import { ProfileRestService } from '../../data/services/profile-rest.service';
import type { Profile } from '../../data/interfaces/profile.iterface';
import { ProfileFiltersComponent } from './profile-filters/profile-filters.component';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCardComponent, ProfileFiltersComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private _profileRestService = inject(ProfileRestService);
  profiles = this._profileRestService.filteredProfiles;
}
