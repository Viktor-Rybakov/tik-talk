import { Component, input } from '@angular/core';
import { AvatarComponent } from '@tt/common-ui';

import { type PostComment } from '../../data';
import { LocalDatePipe } from '@tt/common-ui';

@Component({
  selector: 'app-comment',
  imports: [AvatarComponent, LocalDatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input.required<PostComment>();
}
