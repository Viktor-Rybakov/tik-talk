import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { AvatarComponent } from '@tt/common-ui';
import { type PostComment } from '@tt/data-access/posts';
import { LocalDatePipe } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  imports: [AvatarComponent, LocalDatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  comment = input.required<PostComment>();
}
