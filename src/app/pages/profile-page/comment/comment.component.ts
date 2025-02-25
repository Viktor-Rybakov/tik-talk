import { Component, input } from '@angular/core';
import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';

import { type PostComment } from '../../../data/interfaces/post.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  imports: [AvatarComponent, DatePipe],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.scss',
})
export class CommentComponent {
  comment = input.required<PostComment>();
}
