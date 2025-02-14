import { Component, effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { ProfileService } from '../../data/services/profile.service';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule, AvatarUploadComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
})
export class SettingsPageComponent {
  private _fb = inject(FormBuilder);
  private _profileService = inject(ProfileService);

  @ViewChild(AvatarUploadComponent, { static: true }) avatarUpload!: AvatarUploadComponent;

  form = this._fb.group({
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
        ...this._profileService.me(),
        stack: this.mergeStack(this._profileService.me()?.stack),
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
      firstValueFrom(this._profileService.uploadImage(this.avatarUpload.file));
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
