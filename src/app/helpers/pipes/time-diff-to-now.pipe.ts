import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

import { getPluralForm, type PluralForms } from '../utils/pluralisation.util';

@Pipe({
  name: 'timeDiffToNow',
})
export class TimeDiffToNowPipe implements PipeTransform {
  transform(date: string | null): string | null {
    if (date == null) {
      return null;
    }

    const postLocalDate = DateTime.fromISO(date, { zone: 'utc' }).toLocal();
    const timeDiff = postLocalDate.diffNow(['years', 'months', 'days', 'hours', 'minutes', 'milliseconds']);

    if (timeDiff.milliseconds > 0) {
      throw new Error('TimeDiffToNowPipe: Date later than the current date');
    }

    const yearDiff = Math.floor(Math.abs(timeDiff.years));
    const monthDiff = Math.floor(Math.abs(timeDiff.months));
    const dateDiff = Math.floor(Math.abs(timeDiff.days));
    const hoursDiff = Math.floor(Math.abs(timeDiff.hours));
    const minutesDiff = Math.floor(Math.abs(timeDiff.minutes));

    if (yearDiff > 0) {
      const years: PluralForms = {
        one: 'год',
        two: 'года',
        five: 'лет',
      };
      return `${yearDiff} ${getPluralForm(yearDiff, years)} назад`;
    }

    if (monthDiff > 0) {
      const months: PluralForms = {
        one: 'месяц',
        two: 'месяца',
        five: 'месяцев',
      };
      return `${monthDiff} ${getPluralForm(monthDiff, months)} назад`;
    }

    if (dateDiff > 0) {
      const dates: PluralForms = {
        one: 'день',
        two: 'дня',
        five: 'дней',
      };
      return `${dateDiff} ${getPluralForm(dateDiff, dates)} назад`;
    }

    if (hoursDiff > 0) {
      const hours: PluralForms = {
        one: 'час',
        two: 'часа',
        five: 'часов',
      };
      return `${hoursDiff} ${getPluralForm(hoursDiff, hours)} назад`;
    }

    if (minutesDiff > 0) {
      const minutes: PluralForms = {
        one: 'минута',
        two: 'минуты',
        five: 'минут',
      };
      return `${minutesDiff} ${getPluralForm(minutesDiff, minutes)} назад`;
    }

    return 'Только что';
  }
}
