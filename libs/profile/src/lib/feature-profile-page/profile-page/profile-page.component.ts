import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

import { ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '../../data';
import { SvgIconComponent } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { AvatarComponent } from '@tt/common-ui';
import { GlobalStoreService } from '@tt/shared';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, PostFeedComponent, AvatarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService);
  #globalStoreService = inject(GlobalStoreService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);

  isMyPage = signal<boolean>(false);

  me$ = toObservable(this.#globalStoreService.me);
  subscribers$ = this.#profileService.getSubscribersShortList(6);

  profile$ = this.#route.params.pipe(
    tap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.#globalStoreService.me()?.id);
    }),
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }

      return this.#profileService.getAccount(id);
    })
  );

  sendMessage(userId: number) {
    this.#router.navigate(['/', 'chats', 'new'], { queryParams: { userId } });
  }
}
