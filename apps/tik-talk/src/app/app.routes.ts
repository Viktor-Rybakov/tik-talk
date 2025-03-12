import { Routes } from '@angular/router';

import { SearchPageComponent } from '@tt/profile';
import { LoginPageComponent } from '@tt/auth';
import { ProfilePageComponent } from '@tt/profile';
import { SettingsPageComponent } from '@tt/profile';
import { LayoutComponent } from '@tt/layout';
import { canActivateAuth } from '@tt/auth';
import { chatsRoutes } from '@tt/chats';
import { SandboxPageComponent } from './sandbox/sandbox-page/sandbox-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      { path: 'search', component: SearchPageComponent },
      { path: 'profile/:id', component: ProfilePageComponent },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'sandbox', component: SandboxPageComponent },
];
