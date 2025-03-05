import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'localDate'
})
export class LocalDatePipe implements PipeTransform {
  transform(date: string | null, format: string = 'dd.MM.yyyy'): string | null {
    if (date == null) {
      return null;
    }

    const localDate = DateTime.fromISO(date, { zone: 'utc' }).toLocal();

    return localDate.toFormat(format);
  }
}
