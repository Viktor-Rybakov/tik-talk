import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { firstValueFrom, map, Observable } from 'rxjs';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { type Profile } from '../../data/interfaces/profile.iterface';
import { ProfileRestService } from '../../data/services/profile-rest.service';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    TranslatePipe,
    SvgIconComponent,
    RouterLinkActive,
    SubscriberCardComponent,
    AsyncPipe,
    AvatarUrlPipe,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private profileRestService = inject(ProfileRestService);

  me = this.profileRestService.me;

  menu: { name: string; link: string[]; icon: string }[] = [
    {
      name: 'MY_PAGE',
      link: ['/', 'profile', 'me'],
      icon: 'home',
    },
    {
      name: 'CHATS',
      link: ['/', 'chats'],
      icon: 'chats',
    },
    {
      name: 'SEARCH',
      link: ['/', 'search'],
      icon: 'search',
    },
  ];

  subscribers$: Observable<Profile[]> = this.profileRestService
    .getSubscribers()
    .pipe(map((response) => response.items.slice(0, 3)));

  constructor() {
    firstValueFrom(this.profileRestService.getMe());
  }
}
