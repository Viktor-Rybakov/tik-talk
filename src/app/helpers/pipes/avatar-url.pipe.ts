import { Pipe, PipeTransform } from '@angular/core';

const Prefix: string = 'https://icherniakov.ru/yt-course/';

@Pipe({
  name: 'avatarUrl',
})
export class AvatarUrlPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '/assets/svg/avatar-placeholder.svg';
    }
    return `${Prefix}${value}`;
  }
}
