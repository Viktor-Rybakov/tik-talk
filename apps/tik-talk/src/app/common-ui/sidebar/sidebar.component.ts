import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';

import { type IconType, SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from '../subscriber-card/subscriber-card.component';
import { type Profile } from '../../data/interfaces/profile.interface';
import { ProfileService } from '../../data/services/profile.service';
import { AvatarComponent } from '../avatar/avatar.component';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, SvgIconComponent, RouterLinkActive, SubscriberCardComponent, AsyncPipe, AvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  #profileService = inject(ProfileService);

  me = this.#profileService.me;

  menu: { name: string; link: string[]; icon: IconType }[] = [
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

  subscribers$: Observable<Profile[]> = this.#profileService.getSubscribersShortList();
}
