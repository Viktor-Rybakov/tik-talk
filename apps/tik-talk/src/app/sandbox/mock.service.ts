import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { type Address } from './form.interface';

export interface AdditionOptions {
  id: string;
  name: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getAddresses(): Observable<Address[]> {
    return of([
      {
        city: 'Самара',
        street: 'Московское шоссе',
        building: 34,
        apartment: 326,
      },
      {
        city: 'Санкт-Петербург',
        street: 'Пл. Восстания',
        building: 1,
        apartment: 22,
      },
    ]);
  }

  getLegalRecipientName(): Observable<string[]> {
    return of(['Организация', 'Ростех', 'Росмех']);
  }

  getFeatures(): Observable<AdditionOptions[]> {
    return of([
      {
        id: 'lift',
        name: 'Подъем на этаж',
        value: true,
      },
      {
        id: 'strong-package',
        name: 'Усиленная упаковка',
        value: true,
      },
      {
        id: 'fast',
        name: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }
}
