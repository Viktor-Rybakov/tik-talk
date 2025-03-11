import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom, switchMap } from 'rxjs';

import type { CommentCreateDto, Post, PostComment } from '../../data';
import { AvatarComponent } from '../../../../../../apps/tik-talk/src/app/common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../../../../apps/tik-talk/src/app/common-ui/svg-icon/svg-icon.component';
import { CommentComponent } from '../../ui/';
import { TimeDiffToNowPipe } from '../../../../../../apps/tik-talk/src/app/helpers/pipes/time-diff-to-now.pipe';
import { ProfileService } from '../../../../../../apps/tik-talk/src/app/data/services/profile.service';
import { PostService } from '../../data';
import { MessageInputComponent } from '../../../../../../apps/tik-talk/src/app/common-ui/message-input/message-input.component';

@Component({
  selector: 'app-post',
  imports: [AvatarComponent, SvgIconComponent, CommentComponent, TimeDiffToNowPipe, MessageInputComponent],
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
