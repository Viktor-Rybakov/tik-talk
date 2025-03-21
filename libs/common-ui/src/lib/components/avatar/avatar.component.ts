import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { AvatarUrlPipe } from '../../pipes';

@Component({
  selector: 'app-avatar',
  imports: [AvatarUrlPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {
  @Input() avatarUrl: string | null = null;
  @Input() avatarAlt: string | null = null;
}
