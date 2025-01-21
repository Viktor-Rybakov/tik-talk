import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

import { type Auth, type TokenResponse } from './auth.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _http = inject(HttpClient);
  private _cookieService = inject(CookieService);
  private _router = inject(Router);

  token: string | null = null;
  refreshToken: string | null = null;

  get isAuth(): boolean {
    if (!this.token) {
      this.token = this._cookieService.get('token');
    }
    return !!this.token;
  }

  login$(payload: Auth) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);

    return this._http.post<TokenResponse>(`${ApiPrefix}token`, fd).pipe(tap((response) => this._saveTokens(response)));
  }

  refreshAuthToken$() {
    return this._http
      .post<TokenResponse>(`${ApiPrefix}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((response) => this._saveTokens(response)),
        catchError((err) => {
          this._logout();
          return throwError(() => err);
        })
      );
  }

  private _logout() {
    this._cookieService.deleteAll();
    this.token = null;
    this.refreshToken = null;
    this._router.navigate(['login']);
  }

  private _saveTokens(response: TokenResponse) {
    this.token = response.access_token;
    this.refreshToken = response.refresh_token;
    this._cookieService.set('token', this.token);
    this._cookieService.set('refreshToken', this.refreshToken);
  }
}
