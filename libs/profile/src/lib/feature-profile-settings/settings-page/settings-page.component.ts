import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { ProfileService } from '../../data';
import { AvatarUploadComponent } from '@tt/common-ui';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  #fb = inject(FormBuilder);
  #profileService = inject(ProfileService);
  #globalStoreService = inject(GlobalStoreService);

  @ViewChild(AvatarUploadComponent, { static: true }) avatarUpload!: AvatarUploadComponent;

  form = this.#fb.group({
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
        ...this.#globalStoreService.me(),
        stack: this.mergeStack(this.#globalStoreService.me()?.stack),
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

    if (this.avatarUpload.file) {
      firstValueFrom(this.#profileService.uploadImage(this.avatarUpload.file));
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
