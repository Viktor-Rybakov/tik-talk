import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormControl, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs';

import { DadataService } from '@tt/data-access/dadata';

@Component({
  selector: 'app-address-input',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
    DadataService,
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  #dadataService = inject(DadataService);

  #disabled: boolean = false;
  innerSearchControl = new FormControl<string | null>(null);
  dropDownOpened = signal<boolean>(true);

  citySuggestions$ = this.innerSearchControl.valueChanges.pipe(
    tap((value) => {
      this.onTouched();
      this.onChange(value);
    }),
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((value) => {
      return this.#dadataService.getCitySuggestions(value ?? '');
    }),
    tap((res) => {
      this.dropDownOpened.set(res.length > 0);
    })
  );

  @HostBinding('class.disabled')
  get disabled() {
    this.updateSearchControlDisable();
    return this.#disabled;
  }

  onChange(value: string | null): void {}

  onTouched() {}

  updateSearchControlDisable() {
    if ((this.innerSearchControl.disabled && this.#disabled) || (this.innerSearchControl.enabled && !this.#disabled)) {
      return;
    }

    if (this.#disabled) {
      this.innerSearchControl.disable({ emitEvent: false });
      return;
    }

    this.innerSearchControl.enable({ emitEvent: false });
  }

  onSuggestionPick(city: string) {
    this.onChange(city);
    this.innerSearchControl.patchValue(city, { emitEvent: false });
    this.dropDownOpened.set(false);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.#disabled = isDisabled;
  }

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, { emitEvent: false });
  }
}
