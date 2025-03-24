import { ChangeDetectionStrategy, Component, forwardRef, HostBinding, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-stack-input',
  imports: [CommonModule, SvgIconComponent, FormsModule],
  templateUrl: './stack-input.component.html',
  styleUrl: './stack-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => StackInputComponent),
    },
  ],
})
export class StackInputComponent implements ControlValueAccessor {
  value$ = new BehaviorSubject<string[]>([]);
  innerInput: string = '';
  #disabled: boolean = false;

  @HostBinding('class.disabled')
  get disabled(): boolean {
    return this.#disabled;
  }

  @HostListener('keydown.enter', ['$event'])
  onEnter(event: KeyboardEvent) {
    event.stopPropagation();
    event.preventDefault();

    if (this.innerInput) {
      const tags = [...this.value$.value];
      tags.push(this.innerInput.trim());
      this.value$.next([...this.value$.value, this.innerInput.trim()]);
      this.innerInput = '';
      this.onChange(tags);
      this.onTouched();
    }
  }

  onSkillDelete(i: number) {
    const tags = [...this.value$.value];
    tags.splice(i, 1);
    this.value$.next(tags);
    this.onChange(tags);
    this.onTouched();
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

  writeValue(value: string[] | null): void {
    if (!value) {
      this.value$.next([]);
      return;
    }

    this.value$.next(value);
  }

  onChange(value: string[] | null) {}

  onTouched() {}
}
