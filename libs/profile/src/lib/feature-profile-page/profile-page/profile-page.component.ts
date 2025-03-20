import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { Observable, switchMap, tap } from 'rxjs';
import { Store } from '@ngrx/store';

import { type Profile, ProfileService, selectMyProfile } from '@tt/data-access/profile';
import { PostFeedComponent } from '@tt/posts';
import { SvgIconComponent, AvatarComponent } from '@tt/common-ui';
import { ProfileHeaderComponent } from '../../ui';

@Component({
  selector: 'app-profile-page',
  imports: [ProfileHeaderComponent, AsyncPipe, RouterLink, SvgIconComponent, PostFeedComponent, AvatarComponent],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  profile$: Observable<Profile | null> = this.#route.params.pipe(
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
