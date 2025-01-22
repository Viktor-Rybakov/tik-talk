import { Component, inject, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError } from 'rxjs';
import { Router } from '@angular/router';

import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [TranslatePipe, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);

  isPasswordVisible = signal<boolean>(false);

  form = new FormGroup({
    username: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    password: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
  });

  onSubmit() {
    if (this.form.valid) {
      const { username, password } = this.form.value;

      if (username && password) {
        this._authService
          .login({ username, password })
          .pipe(
            catchError(() => {
              throw new Error('Login error');
            })
          )
          .subscribe({
            next: () => {
              this._router.navigate(['']);
            },
          });
      }
    }
  }

  togglePasswordVisible() {
    this.isPasswordVisible.set(!this.isPasswordVisible());
  }
}
