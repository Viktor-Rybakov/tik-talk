import { Component, input, output } from '@angular/core';

import { type CommentCreateDto, type Post } from '../../../data/interfaces/post.interface';
import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from '../comment/comment.component';
import { TimeAgoPipe } from '../../../helpers/pipes/time-ago.pipe';

@Component({
  selector: 'app-post',
  imports: [AvatarComponent, SvgIconComponent, PostInputComponent, CommentComponent, TimeAgoPipe],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent {
  post = input.required<Post>();

  commentCreated = output<CommentCreateDto>();

  onCommentCreated(payload: CommentCreateDto) {
    this.commentCreated.emit(payload);
  }
}
