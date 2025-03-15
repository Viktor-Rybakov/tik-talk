import { FormControl } from '@angular/forms';

export interface ProfilesFilter {
  firstName: string;
  lastName: string;
  stack: string;
}

export interface ProfilesFilterForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  stack: FormControl<string>;
}
