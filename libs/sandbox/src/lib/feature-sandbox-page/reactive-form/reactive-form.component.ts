import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { LegalRecipientNameValidator } from '../../utils';
import { type Address, type AdditionOptions, MockService } from '../../data';

enum RecipientType {
  PRIVATE = 'PRIVATE',
  LEGAL = 'LEGAL',
}

function getAddressForm(initialValue: Address) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    building: new FormControl<number | null>(initialValue.building ?? null, { validators: [getBuildValidator(20)] }),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

function getBuildValidator(buildNumber: number = 13): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value === buildNumber
      ? {
          buildValidator: {
            message: `Нет доставки в дома под номером ${buildNumber}`,
          },
        }
      : null;
  };
}

function getDateRangeValidator(controlNameFrom: string, controlNameTo: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlFrom = control.get(controlNameFrom);
    const controlTo = control.get(controlNameTo);

    if (!controlFrom && !controlTo) {
      throw new Error('DateRangeValidator: controls not exhaust');
    }

    const dateFrom = controlFrom!.value;
    const dateTo = controlTo!.value;

    if (dateFrom > dateTo) {
      controlTo?.setErrors({
        dateRange: {
          message: 'Дата начала интервала не может быть позже даты конца',
        },
      });

      return {
        dateRange: {
          message: 'Дата начала интервала не может быть позже даты конца',
        },
      };
    }

    return null;
  };
}

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  #fb = inject(FormBuilder);
  #mockService = inject(MockService);
  #legalRecipientNameValidator = inject(LegalRecipientNameValidator);

  RecipientType = RecipientType;
  features: AdditionOptions[] = [];

  form = new FormGroup({
    type: new FormControl<RecipientType>(RecipientType.PRIVATE, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required],
      updateOn: 'blur',
    }),
    secondName: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    addresses: new FormArray([getAddressForm({})]), // можно получать форму из функции, если форма переипользуется. Но только с new FormControl
    dateRange: new FormGroup(
      {
        from: new FormControl<Date | null>(null),
        to: new FormControl<Date | null>(null),
      },
      {
        validators: [getDateRangeValidator('from', 'to')],
      }
    ),
    features: new FormRecord({}),
  });

  // form = this.#fb.group({
  //   type: this.#fb.nonNullable.control<RecipientType>(RecipientType.PRIVATE, [Validators.required]),
  //   name: this.#fb.control<string>({ value: 'NAME', disabled: true }),
  //   secondName: this.#fb.control<string>('', [Validators.required]),
  //   inn: this.#fb.control<string>(''),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     building: this.#fb.control<number | null>(null),
  //     apartment: this.#fb.control<number | null>(null),
  //   }),
  // });

  constructor() {
    this.#mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addresses) => {
        this.form.controls.addresses.clear({ emitEvent: false });

        for (const address of addresses) {
          this.form.controls.addresses.controls.push(getAddressForm(address));
        }

        this.form.controls.addresses.setControl(0, getAddressForm(addresses[1])); // Можно по индексу перезаписать контрол
      });

    this.#mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.features.addControl(feature.id, new FormControl<boolean>(feature.value));
        }
      });

    this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.form.controls.secondName.clearValidators();
      this.form.controls.inn.clearValidators();
      this.form.controls.name.clearAsyncValidators();

      if (value === RecipientType.LEGAL) {
        this.form.controls.inn.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
        this.form.controls.name.addAsyncValidators([
          // this.#legalRecipientNameValidator.validate,
          this.#legalRecipientNameValidator.validate.bind(this.#legalRecipientNameValidator),
        ]);
      }

      if (value === RecipientType.PRIVATE) {
        this.form.controls.secondName.addValidators([Validators.required]);
      }
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      console.log('FORM CHANGED', value);
    });
  }

  addAddress() {
    this.form.controls.addresses.push(getAddressForm({}), { emitEvent: false }); // добавяет элемент в конец

    // this.form.controls.addresses.insert(0, getAddressForm({}), { emitEvent: false }); // добавляет элемент в указанное место
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  getFeatureControl(name: string) {
    return this.form.controls.features.get(name) as FormControl<boolean>;
  }

  sort() {
    return 0;
  }

  onPatch() {
    this.form.patchValue(
      {
        // принимает неполный объект значений
        type: RecipientType.PRIVATE,
        name: 'Василий',
        secondName: 'Петров',
      },
      {
        emitEvent: true, // при этом изменении генерировать событие об изменении для всех прослущивателей или нет
        // onlySelf: true, // оповещать посписчиков на изменения только этого контрола
      }
    );
  }

  // onSetAddressValue() {
  //   this.form.controls.address.setValue(
  //     {
  //       // принимает полный объект для обновления
  //       city: 'Moscow',
  //       street: 'Kremlin',
  //       building: 1,
  //       apartment: 22,
  //     },
  //     {
  //       onlySelf: true, // обноляет только address и его подписчиков, FORM CHANGED не отработает
  //     }
  //   );
  // }

  onReset() {
    this.form.reset({
      name: 'Pupkin',
    }); // очищает форму. если у контрола стоит настройка nonNullable, то применяетя значение по-умолчанию
  }

  onSubmit() {
    this.form.markAllAsTouched(); // делает все поля "потроганными"
    this.form.updateValueAndValidity(); // проверяет валидность всех полей

    if (this.form.valid) {
      console.log('form value', this.form.value); // value - значение полей кроме disabled
      // console.log('form RawValue', this.form.getRawValue()); // raw value - значение всех полей, в тч disabled
    }
  }
}
