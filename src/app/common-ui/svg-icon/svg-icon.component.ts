import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'svg[icon]',
  imports: [],
  template: '<svg:use [attr.href]="href"></svg:use>',
  styleUrl: 'svg-icon.component.scss',
})
export class SvgIconComponent {
  @Input({ required: true }) icon!: string;

  @HostBinding('attr.aria-hidden') ariaHidden: boolean = true;

  get href(): string {
    return `/assets/svg/stack.svg#${this.icon}`;
  }
}
