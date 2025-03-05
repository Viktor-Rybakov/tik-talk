import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'relativeDate',
})
export class RelativeDatePipe implements PipeTransform {
  transform(date: string | null, format: string = 'dd.MM.yyyy'): string | null {
    if (date == null) {
      return null;
    }

    const formatedDate = DateTime.fromFormat(date, 'dd.MM.yyyy');

    const dayDiff = formatedDate.diffNow('days').days;

    if (Math.abs(dayDiff) <= 3) {
      return formatedDate.toRelativeCalendar({ locale: 'ru' });
    }

    return formatedDate.toFormat(format);
  }
}
