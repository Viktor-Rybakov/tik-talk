import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom, switchMap } from 'rxjs';

import { type CommentCreateDto, type Post, type PostComment } from '../../../data/interfaces/post.interface';
import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { CommentComponent } from '../comment/comment.component';
import { TimeAgoPipe } from '../../../helpers/pipes/time-ago.pipe';
import { ProfileService } from '../../../data/services/profile.service';
import { PostService } from '../../../data/services/post.service';
import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component';

@Component({
  selector: 'app-post',
  imports: [AvatarComponent, SvgIconComponent, CommentComponent, TimeAgoPipe, MessageInputComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  #postService = inject(PostService);
  me = inject(ProfileService).me;

  post = input.required<Post>();
  comments = signal<PostComment[]>([]);

  ngOnInit(): void {
    this.comments.set(this.post().comments);
  }

  async onCommentCreated(commentText: string) {
    const payload: CommentCreateDto = {
      text: commentText,
      authorId: this.me()!.id,
      postId: this.post().id,
    };

    const comments = await firstValueFrom(
      this.#postService
        .createComment(payload)
        .pipe(switchMap(() => this.#postService.getCommentsByPostId(this.post().id)))
    );

    this.comments.set(comments);
  }
}
