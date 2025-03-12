import { AbstractControl, AsyncValidator, ValidationErrors, ValidatorFn } from '@angular/forms';
import { inject, Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';

import { MockService } from './mock.service';

@Injectable({
  providedIn: 'root',
})
export class LegalRecipientNameValidator implements AsyncValidator {
  #mockService = inject(MockService);

  // через стрелочную функцию сделано для того, чтобы при сохранить this (либо привязываем через bind)
  // validate = (control: AbstractControl): Observable<ValidationErrors | null> => {
  //   return this.#mockService.getLegalRecipientName().pipe(
  //     delay(1000),
  //     map((names: string[]) => {
  //       const namesNormalized = names.map((name) => name.toLowerCase());
  //
  //       return namesNormalized.includes(control.value.toLowerCase())
  //         ? null
  //         : {
  //           legalRecipientNameValid: {
  //             message: `Название организации должно быть одно из списка: ${names.join(', ')}`,
  //           },
  //         };
  //     })
  //   );
  // }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.#mockService.getLegalRecipientName().pipe(
      delay(1000),
      map((names: string[]) => {
        const namesNormalized = names.map((name) => name.toLowerCase());

        return namesNormalized.includes(control.value.toLowerCase())
          ? null
          : {
              legalRecipientNameValid: {
                message: `Название организации должно быть одно из списка: ${names.join(', ')}`,
              },
            };
      })
    );
  }
}
