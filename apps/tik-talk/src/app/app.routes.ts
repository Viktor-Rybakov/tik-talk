import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import {
  ProfileEffects,
  SearchPageComponent,
  profileFeature,
  ProfilePageComponent,
  SettingsPageComponent,
} from '@tt/profile';
import { canActivateAuth, LoginPageComponent } from '@tt/auth';
import { LayoutComponent } from '@tt/layout';
import { chatsRoutes } from '@tt/chats';
import { SandboxPageComponent } from '@tt/sandbox';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchPageComponent,
        providers: [provideState(profileFeature), provideEffects(ProfileEffects)],
      },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'sandbox', component: SandboxPageComponent },
];
