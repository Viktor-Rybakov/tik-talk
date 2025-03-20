import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { type IconType, SvgIconComponent, AvatarComponent } from '@tt/common-ui';
import { type Profile, ProfileService, selectMyProfile } from '@tt/data-access/profile';
import { ChatsService, selectUnreadMessagesCount } from '@tt/data-access/chats';
import { SubscriberCardComponent } from '../ui';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, SvgIconComponent, RouterLinkActive, SubscriberCardComponent, AsyncPipe, AvatarComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  #profileService = inject(ProfileService);
  #chatService = inject(ChatsService);
  #store = inject(Store);

  myProfile = this.#store.selectSignal(selectMyProfile);
  unreadMessagesCount = this.#store.selectSignal(selectUnreadMessagesCount);

  menu: { id: 'myProfile' | 'chats' | 'search'; name: string; link: string[]; icon: IconType }[] = [
    {
      id: 'myProfile',
      name: 'Моя страница',
      link: ['/', 'profile', 'me'],
      icon: 'home',
    },
    {
      id: 'chats',
      name: 'Чаты',
      link: ['/', 'chats'],
      icon: 'chats',
    },
    {
      id: 'search',
      name: 'Поиск',
      link: ['/', 'search'],
      icon: 'search',
    },
  ];

  subscribers$: Observable<Profile[]> = this.#profileService.getSubscribersShortList();

  constructor() {
    this.#chatService.connectWithRefreshingWS().pipe(takeUntilDestroyed()).subscribe();
  }
}
