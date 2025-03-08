import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

enum RecipientType {
  PRIVATE = 'PRIVATE',
  LEGAL = 'LEGAL',
}

function getAddressForm() {
  return new FormGroup({
    city: new FormControl<string>(''),
    street: new FormControl<string>(''),
    building: new FormControl<number | null>(null),
    apartment: new FormControl<number | null>(null),
  });
}

@Component({
  selector: 'app-reactive-form',
  imports: [ReactiveFormsModule],
  templateUrl: './reactive-form.component.html',
  styleUrl: './reactive-form.component.scss',
})
export class ReactiveFormComponent {
  #fb = inject(FormBuilder);

  RecipientType = RecipientType;

  form = new FormGroup({
    type: new FormControl<RecipientType>(RecipientType.PRIVATE, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    name: new FormControl<string>(
      { value: '', disabled: true },
      { nonNullable: true, validators: [Validators.required] }
    ),
    secondName: new FormControl<string>(''),
    inn: new FormControl<string>(''),
    address: getAddressForm(), // можно получать форму из функции, если форма переипользуется. Но только с new FormControl
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
    this.form.controls.type.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      this.form.controls.secondName.clearValidators();
      this.form.controls.inn.clearValidators();

      if (value === RecipientType.LEGAL) {
        this.form.controls.inn.addValidators([Validators.required, Validators.minLength(10), Validators.maxLength(12)]);
      }

      if (value === RecipientType.PRIVATE) {
        this.form.controls.secondName.addValidators([Validators.required]);
      }
    });

    this.form.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      console.log('FORM CHANGED', value);
    });
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

  onSetAddressValue() {
    this.form.controls.address.setValue(
      {
        // принимает полный объект для обновления
        city: 'Moscow',
        street: 'Kremlin',
        building: 1,
        apartment: 22,
      },
      {
        onlySelf: true, // обноляет только address и его подписчиков, FORM CHANGED не отработает
      }
    );
  }

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
      console.log('form RawValue', this.form.getRawValue()); // raw value - значение всех полей, в тч disabled
    }
  }
}
