import { Routes } from '@angular/router';
import { provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

import { SearchPageComponent, ProfilePageComponent, SettingsPageComponent } from '@tt/profile';
import { LoginPageComponent } from '@tt/auth';
import { canActivateAuth } from '@tt/data-access/auth';
import { LayoutComponent } from '@tt/layout';
import { chatsRoutes } from '@tt/chats';
import { SandboxPageComponent } from '@tt/sandbox';
import { PostsEffects, postsFeature } from '@tt/data-access/posts';
import { ChatEffects, chatFeature } from '@tt/data-access/chats';
import { ProfileEffects, profileFeature } from '@tt/data-access/profile';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'profile/me', pathMatch: 'full' },
      {
        path: 'search',
        component: SearchPageComponent,
      },
      {
        path: 'profile/:id',
        component: ProfilePageComponent,
        providers: [provideState(postsFeature), provideEffects(PostsEffects)],
      },
      { path: 'settings', component: SettingsPageComponent },
      { path: 'chats', loadChildren: () => chatsRoutes },
    ],
    canActivate: [canActivateAuth],
    providers: [
      provideState(profileFeature),
      provideEffects(ProfileEffects),
      provideState(chatFeature),
      provideEffects(ChatEffects),
    ],
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'sandbox', component: SandboxPageComponent },
];
