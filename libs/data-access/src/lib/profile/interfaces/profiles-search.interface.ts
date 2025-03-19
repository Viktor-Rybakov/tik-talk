import { FormControl } from '@angular/forms';

export interface ProfilesSearchInterface {
  firstName: string;
  lastName: string;
  stack: string;
}

export interface ProfilesSearchForm {
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  stack: FormControl<string>;
}
