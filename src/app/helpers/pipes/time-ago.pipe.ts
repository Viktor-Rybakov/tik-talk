import { Pipe, PipeTransform } from '@angular/core';

import { getPluralForm, type PluralForms } from '../utils/pluralisation.util';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: string | null): string | null {
    if (date == null) {
      return null;
    }

    const postDate = new Date(date);
    if (!postDate) {
      throw new Error('TimeAgoPipe: Invalid date');
    }

    const currentLocalDate = new Date();
    const localDateOffset = currentLocalDate.getTimezoneOffset();
    const postLocalDate = new Date(postDate.getTime() - localDateOffset * 60 * 1000);

    const postLocalTime = postLocalDate.getTime();
    const currentLocalTime = currentLocalDate.getTime();

    if (postLocalTime > currentLocalTime) {
      throw new Error('TimeAgoPipe: Date later than the current date');
    }

    if (postLocalTime === currentLocalTime) {
      return 'Сейчас';
    }

    const yearDiff = currentLocalDate.getFullYear() - postLocalDate.getFullYear();
    const monthDiff = currentLocalDate.getMonth() - postLocalDate.getMonth();
    const dateDiff = currentLocalDate.getDate() - postLocalDate.getDate();
    const hoursDiff = currentLocalDate.getHours() - postLocalDate.getHours();
    const minutesDiff = currentLocalDate.getMinutes() - postLocalDate.getMinutes();

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
