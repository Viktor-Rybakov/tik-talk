import { Pipe, PipeTransform } from '@angular/core';

const Prefix: string = 'https://icherniakov.ru/yt-course/';

@Pipe({
  name: 'imgUrl'
})
export class ImgUrlPipe implements PipeTransform {

  transform(value: string | null): string | null {
    if (!value) {
      return  null;
    }
    return `${Prefix}${value}`;
  }
}
