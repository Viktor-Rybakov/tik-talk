import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, TranslatePipe, SvgIconComponent, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  menu: { name: string; link: string; icon: string }[] = [
    {
      name: 'MY_PAGE',
      link: '',
      icon: 'home',
    },
    {
      name: 'CHATS',
      link: 'chats',
      icon: 'chats',
    },
    {
      name: 'SEARCH',
      link: 'search',
      icon: 'search',
    },
  ];
}
