import { ChangeDetectionStrategy, Component, effect, inject, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProfileService, selectMyProfile } from '@tt/data-access/profile';
import { AvatarUploadComponent, StackInputComponent } from '@tt/common-ui';

@Component({
  selector: 'app-settings-page',
  imports: [ReactiveFormsModule, AvatarUploadComponent, StackInputComponent],
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {
  #fb = inject(FormBuilder);
  #profileService = inject(ProfileService);
  #store = inject(Store);

  myProfile = this.#store.selectSignal(selectMyProfile);

  @ViewChild(AvatarUploadComponent, { static: true }) avatarUpload!: AvatarUploadComponent;

  form = this.#fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: [{ value: '', disabled: true }, Validators.required],
    description: [''],
    stack: ['', Validators.required],
  });

  constructor() {
    effect(() => {
      // @ts-ignore
      this.form.patchValue(this.myProfile());
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
      this.#profileService.patchProfile(this.form.value)
    );
  }
}
