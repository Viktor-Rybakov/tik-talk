import { Component, input } from '@angular/core';
import { AvatarComponent } from '../../../../../../apps/tik-talk/src/app/common-ui/avatar/avatar.component';

import { type PostComment } from '../../data';
import { LocalDatePipe } from '../../../../../../apps/tik-talk/src/app/helpers/pipes/local-date.pipe';

@Component({
  selector: 'app-comment',
  imports: [AvatarComponent, LocalDatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input.required<PostComment>();
}
