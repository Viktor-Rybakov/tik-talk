import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, startWith } from 'rxjs';
import { Store } from '@ngrx/store';

import { profileActions } from '../../data';

@Component({
  selector: 'app-profile-filters',
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  #fb = inject(FormBuilder);
  #store = inject(Store);

  searchForm = this.#fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    this.searchForm.valueChanges.pipe(startWith({}), debounceTime(300), takeUntilDestroyed()).subscribe((formValue) => {
      this.#store.dispatch(profileActions.filterEvent({ filters: formValue }));
    });
  }
}
