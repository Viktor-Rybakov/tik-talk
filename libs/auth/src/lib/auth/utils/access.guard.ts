import { inject } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../data';

export function canActivateAuth() {
  const isLoggedIn = inject(AuthService).isAuth;

  if (isLoggedIn) {
    return true;
  }

  return inject(Router).navigate(['login']);
}
