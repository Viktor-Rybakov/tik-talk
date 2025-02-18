import { Component, HostBinding, Input } from '@angular/core';

type iconType =
  | 'eye'
  | 'telegram'
  | 'home'
  | 'chats'
  | 'search'
  | 'arrow'
  | 'trash'
  | 'logout'
  | 'comments'
  | 'like'
  | 'smile'
  | 'send'
  | 'kebab'
  | 'settings'
  | 'close'
  | 'cloud'
  | 'filter'
  | 'subscribe'
  | 'share'
  | 'added';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styleUrl: 'svg-icon.component.scss',
})
export class SvgIconComponent {
  @Input({ required: true }) icon!: iconType;

  @HostBinding('attr.aria-hidden') ariaHidden: boolean = true;

  get href(): string {
    return `/assets/svg/stack.svg#${this.icon}`;
  }
}
