import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { type Profile } from '../../data/interfaces/profile.iterface';
import { ProfileRestService } from '../../data/services/profile-rest.service';


@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    TranslatePipe,
    SvgIconComponent,
    RouterLinkActive,
    SubscriberCardComponent,
    AsyncPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private profileRestService = inject(ProfileRestService);

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

  subscribers$: Observable<Profile[]> = this.profileRestService
    .getSubscribers()
    .pipe(map((response) => response.items.slice(0, 3)));
}
