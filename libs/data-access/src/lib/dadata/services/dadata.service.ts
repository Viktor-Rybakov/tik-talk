import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

import { DadataSuggestion } from '../interfaces';
import { DADATA_TOKEN } from './dadata.token';

@Injectable()
export class DadataService {
  #http = inject(HttpClient);

  apiUrl = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';

  getSuggestions(query: string) {
    return this.#http
      .post<{ suggestions: DadataSuggestion[] }>(
        this.apiUrl,
        { query },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Token ${DADATA_TOKEN}`,
          },
        }
      )
      .pipe(
        catchError((error) => {
          console.error('DADATA:', error?.error?.message);
          return of({ suggestions: [] });
        })
      );
  }

  getCitySuggestions(query: string) {
    return this.getSuggestions(query).pipe(
      map((res) => res.suggestions),
      map((res) => {
        return res.map((item) => item.data.city);
      }),
      map((res) => {
        return res.filter((city) => city != null);
      }),
      map((res) => {
        return Array.from(new Set(res));
      })
    );
  }
}
