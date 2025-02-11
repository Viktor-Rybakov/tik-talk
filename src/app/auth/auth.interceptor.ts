import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from 'rxjs';

import { AuthService } from './auth.service';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) {
    return next(req);
  }

  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }

  return next(addToken(req, token)).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(() => error);
    })
  );
};

const refreshAndProceed = (authService: AuthService, req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true);

    return authService.refreshAuthToken().pipe(
      switchMap(() => {
        if (authService.token == null) {
          throw new Error('Auth token expected');
        }

        return next(addToken(req, authService.token)).pipe(
          tap(() => {
            isRefreshing$.next(false);
          })
        );
      })
    );
  }

  if (req.url.includes('refresh')) {
    if (authService.token == null) {
      throw new Error('Auth token expected');
    }

    return next(addToken(req, authService.token));
  }

  return isRefreshing$.pipe(
    filter((isRefreshing) => !isRefreshing),
    switchMap(() => {
      if (authService.token == null) {
        throw new Error('Auth token expected');
      }

      return next(addToken(req, authService.token));
    })
  );
};

const addToken = (req: HttpRequest<unknown>, token: string) => {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
};
