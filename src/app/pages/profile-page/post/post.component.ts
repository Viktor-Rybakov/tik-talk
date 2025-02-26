import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { type CommentCreateDto, type Post } from '../../../data/interfaces/post.interface';
import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from '../comment/comment.component';

@Component({
  selector: 'app-post',
  imports: [AvatarComponent, DatePipe, SvgIconComponent, PostInputComponent, CommentComponent],
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
