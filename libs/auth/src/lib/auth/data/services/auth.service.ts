import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { type Auth, type TokenResponse } from '../interfaces/auth.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #cookieService = inject(CookieService);
  #router = inject(Router);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this.#cookieService.get('token');
      this.refreshToken = this.#cookieService.get('refreshToken');
    }
    return !!this.token;
  }

  login(payload: Auth) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this.#http.post<TokenResponse>(`${ApiPrefix}token`, fd).pipe(tap((response) => this.#saveTokens(response)));
  }

  refreshAuthToken() {
    return this.#http
      .post<TokenResponse>(`${ApiPrefix}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((response) => this.#saveTokens(response)),
        catchError((err) => {
          this.#logout();
          return throwError(() => err);
        })
      );
  }

  #logout() {
    this.#cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this.#router.navigate(['login']);
  }

  #saveTokens(response: TokenResponse) {
    this.token = response.access_token;
    this.refreshToken = response.refresh_token;
    this.#cookieService.set('token', this.token, { path: '/' });
    this.#cookieService.set('refreshToken', this.refreshToken, { path: '/' });
  }
}
