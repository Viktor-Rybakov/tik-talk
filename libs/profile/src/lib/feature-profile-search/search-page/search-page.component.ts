import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { profileActions, selectFilteredProfiles } from '@tt/data-access/profile';
import { InfiniteScrollComponent, InfiniteScrollTriggerComponent } from '@tt/common-ui';
import { ProfileFiltersComponent } from '../profile-filters/profile-filters.component';
import { ProfileCardComponent } from '../../ui';

@Component({
  selector: 'app-search-page',
  imports: [ProfileFiltersComponent, InfiniteScrollComponent, ProfileCardComponent, InfiniteScrollTriggerComponent],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchPageComponent {
  #store = inject(Store);

  profiles = this.#store.selectSignal(selectFilteredProfiles);

  loadNextPage() {
    this.#store.dispatch(profileActions.setPage({}));
  }
}
