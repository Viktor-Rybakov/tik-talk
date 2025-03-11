import { Component, Input } from '@angular/core';
import { AvatarUrlPipe } from '../../helpers/pipes/avatar-url.pipe';

@Component({
  selector: 'app-avatar',
  imports: [AvatarUrlPipe],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.scss',
})
export class AvatarComponent {
  @Input() avatarUrl: string | null = null;
  @Input() avatarAlt: string | null = null;
}
