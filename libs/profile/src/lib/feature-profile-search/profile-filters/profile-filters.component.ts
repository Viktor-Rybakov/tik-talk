import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { Store } from '@ngrx/store';

import { profileActions, ProfilesSearchForm, selectProfilesFilters } from '@tt/data-access/profile';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileFiltersComponent {
  #fb = inject(FormBuilder);
  #store = inject(Store);

  searchForm: FormGroup<ProfilesSearchForm> = this.#fb.nonNullable.group({
    firstName: '',
    lastName: '',
    stack: '',
  });

  initialFilters = this.#store.selectSignal(selectProfilesFilters);

  constructor() {
    this.searchForm.valueChanges.pipe(debounceTime(300), takeUntilDestroyed()).subscribe((formValue) => {
      this.#store.dispatch(profileActions.filterEvent({ filters: formValue }));
    });

    this.searchForm.patchValue(this.initialFilters());
  }
}
