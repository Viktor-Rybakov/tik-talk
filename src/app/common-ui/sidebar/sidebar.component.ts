import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { firstValueFrom, Observable } from 'rxjs';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { type Profile } from '../../data/interfaces/profile.iterface';
import { ProfileService } from '../../data/services/profile.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-sidebar',
  imports: [
    RouterLink,
    SvgIconComponent,
    RouterLinkActive,
    SubscriberCardComponent,
    AsyncPipe,
    AvatarComponent,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  private _profileService = inject(ProfileService);

  me = this._profileService.me;

  menu: { name: string; link: string[]; icon: string }[] = [
    {
      name: 'Моя страница',
      link: ['/', 'profile', 'me'],
      icon: 'home',
    },
    {
      name: 'Чаты',
      link: ['/', 'chats'],
      icon: 'chats',
    },
    {
      name: 'Поиск',
      link: ['/', 'search'],
      icon: 'search',
    },
  ];

  subscribers$: Observable<Profile[]> = this._profileService.getSubscribersShortList();

  constructor() {
    firstValueFrom(this._profileService.getMe());
  }
}
