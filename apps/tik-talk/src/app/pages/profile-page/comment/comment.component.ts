import { Component, input } from '@angular/core';
import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';

import { type PostComment } from '../../../data/interfaces/post.interface';
import { LocalDatePipe } from '../../../helpers/pipes/local-date.pipe';

@Component({
  selector: 'app-comment',
  imports: [AvatarComponent, LocalDatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input.required<PostComment>();
}
