import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, startWith, switchMap } from 'rxjs';

import { ProfileService } from '@tt/profile';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  #fb = inject(FormBuilder);
  #profileService = inject(ProfileService);

  searchForm = this.#fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchForm.valueChanges
      .pipe(
        startWith({}),
        debounceTime(300),
        switchMap((formValue) => {
          return this.#profileService.getFilteredProfiles(formValue);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
