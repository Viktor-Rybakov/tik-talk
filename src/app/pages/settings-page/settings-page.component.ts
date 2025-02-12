import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { ProfileRestService } from '../../data/services/profile-rest.service';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  fb = inject(FormBuilder);
  profileService = inject(ProfileRestService);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: [''],
  });

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue({
        ...this.profileService.me(),
        stack: this.mergeStack(this.profileService.me()?.stack),
      });
    });
  }

  onDelete() {}

  onLogout() {}

  onCancel() {}

  onSave() {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      return;
    }

    firstValueFrom(
      // @ts-ignore
      this.profileService.patchProfile({
        ...this.form.value,
        stack: this.splitStack(this.form.value.stack),
      })
    );
  }

  splitStack(stack: string | string[] | null | undefined): string[] {
    if (stack == null) {
      return [];
    }

    if (Array.isArray(stack)) {
      return stack;
    }

    return stack.split(',');
  }

  mergeStack(stack: string | string[] | null | undefined): string {
    if (stack == null) {
      return '';
    }

    if (Array.isArray(stack)) {
      return stack.join(',');
    }

    return stack;
  }
}
