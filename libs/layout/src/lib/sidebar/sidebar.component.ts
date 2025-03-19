import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { type IconType, SvgIconComponent } from '@tt/common-ui';
import { SubscriberCardComponent } from '../ui';
import { ProfileService } from '@tt/profile';
import { AvatarComponent } from '@tt/common-ui';
import { type Profile } from '@tt/interfaces/profile';
import { selectMyProfile } from '@tt/shared';
import { ChatsService, selectUnreadMessagesCount } from '@tt/chats';

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
