import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'avatarUrl',
})
export class AvatarUrlPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return '/assets/svg/avatar-placeholder.svg';
    }
    return `/yt-course/${value}`;
  }
}
