import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toObservable } from '@angular/core/rxjs-interop';
import { switchMap, tap } from 'rxjs';

import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { SvgIconComponent } from '../../common-ui/svg-icon/svg-icon.component';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';
import { PostFeedComponent } from './post-feed/post-feed.component';

@Component({
  selector: 'app-profile-page',
  imports: [
    ProfileHeaderComponent,
    AsyncPipe,
    RouterLink,
    SvgIconComponent,
    AvatarUrlPipe,
    PostFeedComponent,
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss',
})
export class ProfilePageComponent {
  private _profileService = inject(ProfileService);
  private _route = inject(ActivatedRoute);

  isMe: boolean = false;

  me$ = toObservable(this._profileService.me);
  subscribers$ = this._profileService.getSubscribersShortList(6);

  profile$ = this._route.params.pipe(
    tap(({ id }) => {
      this.isMe = id === 'me';
    }),
    switchMap(({ id }) => {
      if (id === 'me') {
        return this.me$;
      }

      return this._profileService.getAccount(id);
    })
  );
}
