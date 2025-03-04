import { inject, Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'todayOrDate',
})
export class TodayOrDatePipe implements PipeTransform {
  #datePipe = inject(DatePipe)

  transform(date: string | null, format: string): string | null {
    if (date == null) {
      return null;
    }

    const todayDate = new Date().toISOString().slice(0,10);
    const inputDate = new Date(date).toISOString().slice(0,10);

    if (todayDate === inputDate) {
      return 'Сегодня';
    }

    return this.#datePipe.transform(date, format);
  }
}
