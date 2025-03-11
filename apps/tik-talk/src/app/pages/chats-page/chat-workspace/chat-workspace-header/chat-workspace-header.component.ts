import { Component, input } from '@angular/core';

import { type Profile } from '../../../../data/interfaces/profile.interface';
import { AvatarComponent } from '../../../../common-ui/avatar/avatar.component';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
