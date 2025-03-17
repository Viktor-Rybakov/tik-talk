import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { type IconType, SvgIconComponent } from '@tt/common-ui';
import { SubscriberCardComponent } from '../ui';
import { ProfileService } from '@tt/profile';
import { AvatarComponent } from '@tt/common-ui';
import { type Profile } from '@tt/interfaces/profile';
import { selectMyProfile } from '@tt/shared';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, SvgIconComponent, RouterLinkActive, SubscriberCardComponent, AsyncPipe, AvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  #profileService = inject(ProfileService);
  #store = inject(Store);

  myProfile = this.#store.selectSignal(selectMyProfile);

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
