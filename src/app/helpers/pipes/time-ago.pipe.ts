import { Pipe, PipeTransform } from '@angular/core';

import { getPluralForm, type PluralForms } from '../utils/pluralisation.util';

@Pipe({
  name: 'timeAgo'
})
export class TimeAgoPipe implements PipeTransform {
  transform(date: string | null): string | null {
    if (date == null) {
      return null;
    }

    const postDate = new Date(date);
    const currentDate = new Date();

    if (postDate === undefined) {
      throw new Error('Invalid date');
    }

    const postTime = postDate.getTime();
    const currentTime = currentDate.getTime();

    if (postTime > currentTime ) {
      throw new Error('Date later than the current date');
    }

    if (postTime === currentTime ) {
      return 'Только что';
    }

    const yearDiff = currentDate.getFullYear() - postDate.getFullYear();
    const monthDiff = currentDate.getMonth() - postDate.getMonth();
    const dateDiff = currentDate.getDate() - postDate.getDate();
    const hoursDiff = currentDate.getHours() - postDate.getHours();
    const minutesDiff = currentDate.getMinutes() - postDate.getMinutes();

    if (yearDiff > 0) {
      const years: PluralForms = {
        one: 'год',
        two: 'года',
        five: 'лет',
      }
      return `${yearDiff} ${getPluralForm(yearDiff, years)} назад`;
    }

    if (monthDiff > 0) {
      const months: PluralForms = {
        one: 'месяц',
        two: 'месяца',
        five: 'месяцев',
      }
      return `${monthDiff} ${getPluralForm(monthDiff, months)} назад`;
    }

    if (dateDiff > 0) {
      const dates: PluralForms = {
        one: 'день',
        two: 'дня',
        five: 'дней',
      }
      return `${dateDiff} ${getPluralForm(dateDiff, dates)} назад`;
    }

    if (hoursDiff > 0) {
      const hours: PluralForms = {
        one: 'час',
        two: 'часа',
        five: 'часов',
      }
      return `${hoursDiff} ${getPluralForm(hoursDiff, hours)} назад`;
    }

    if (minutesDiff > 0) {
      const minutes: PluralForms = {
        one: 'минута',
        two: 'минуты',
        five: 'минут',
      }
      return `${minutesDiff} ${getPluralForm(minutesDiff, minutes)} назад`;
    }

    return 'Только что';
  }
}
