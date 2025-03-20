import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import type { Profile } from '@tt/data-access/profile';
import { AvatarComponent } from '@tt/common-ui';

@Component({
  selector: 'app-chat-workspace-header',
  imports: [AvatarComponent],
  templateUrl: './chat-workspace-header.component.html',
  styleUrl: './chat-workspace-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatWorkspaceHeaderComponent {
  profile = input.required<Profile>();
}
