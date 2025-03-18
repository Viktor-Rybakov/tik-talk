import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
  transform(date: string | null, format: string = 'dd.MM.yyyy'): string | null {
    if (date == null) {
      return null;
    }

    const localDateISO = DateTime.fromISO(date, { zone: 'utc' }).toLocal();
    const localDateFromFormat = DateTime.fromFormat(date, 'yyyy-MM-dd HH:mm:ss', { zone: 'utc' }).toLocal();

    const result = localDateISO.isValid ? localDateISO : localDateFromFormat;

    return result.toFormat(format);
  }
}
