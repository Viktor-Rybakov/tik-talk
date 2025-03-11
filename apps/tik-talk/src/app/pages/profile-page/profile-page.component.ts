import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom, switchMap, tap } from 'rxjs';

import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { PostFeedComponent } from './post-feed/post-feed.component';
import { AvatarComponent } from '../../common-ui/avatar/avatar.component';
import { ChatsService } from '../../data/services/chats.service';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, PostFeedComponent, AvatarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService);
  #chatsService = inject(ChatsService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  isMyPage = signal<boolean>(false);

  me$ = toObservable(this.#profileService.me);
  subscribers$ = this.#profileService.getSubscribersShortList(6);

  profile$ = this.#route.params.pipe(
    tap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.#profileService.me()?.id);
    }),
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }

      return this.#profileService.getAccount(id);
    })
  );

  async sendMessage(userId: number) {
    await firstValueFrom(this.#chatsService.createChat(userId)).then((res) =>
      this.#router.navigate(['/', 'chats', res.id])
    );
  }
}
