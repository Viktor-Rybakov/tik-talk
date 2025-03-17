import { Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProfileHeaderComponent } from '../../ui';
import { ProfileService } from '../../data';
import { SvgIconComponent } from '@tt/common-ui';
import { PostFeedComponent } from '@tt/posts';
import { AvatarComponent } from '@tt/common-ui';
import { selectMyProfile } from '@tt/shared';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, PostFeedComponent, AvatarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  #profileService = inject(ProfileService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #store = inject(Store);

  isMyPage = signal<boolean>(false);

  myProfile = this.#store.selectSignal(selectMyProfile);
  myProfile$ = toObservable(this.myProfile);
  subscribers$ = this.#profileService.getSubscribersShortList(6);

  profile$ = this.#route.params.pipe(
    tap(({ id }) => {
      this.isMyPage.set(id === 'me' || id === this.myProfile()?.id);
    }),
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.myProfile$;
      }

      return this.#profileService.getAccount(id);
    })
  );

  sendMessage(userId: number) {
    this.#router.navigate(['/', 'chats', 'new'], { queryParams: { userId } });
  }
}
