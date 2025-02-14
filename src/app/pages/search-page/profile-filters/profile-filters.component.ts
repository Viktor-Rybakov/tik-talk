import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, startWith, switchMap } from 'rxjs';

import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  private _fb = inject(FormBuilder);
  private _profileService = inject(ProfileService);

  searchForm = this._fb.group({
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
          return this._profileService.getFilteredProfiles(formValue);
        }),
        takeUntilDestroyed()
      )
      .subscribe();
  }
}
