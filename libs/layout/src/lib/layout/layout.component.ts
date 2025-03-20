import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';

import { SidebarComponent } from '../sidebar/sidebar.component';
import { profileActions } from '@tt/data-access/profile';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {
  #store = inject(Store);

  constructor() {
    this.#store.dispatch(profileActions.fetchMyProfile({}));
  }
}
