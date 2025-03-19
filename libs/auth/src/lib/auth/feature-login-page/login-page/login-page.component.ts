import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '@tt/data-access/auth';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-login-page',
  imports: [ReactiveFormsModule, SvgIconComponent],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  #authService = inject(AuthService);
  #router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;

      if (username && password) {
        this.#authService
          .login({ username, password })
          .pipe(
            catchError(() => {
              throw new Error('Login error');
            })
          )
          .subscribe({
            next: () => {
              this.#router.navigate(['/', 'profile', 'me']);
            },
          });
      }
    }
  }

  togglePasswordVisible() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }
}
