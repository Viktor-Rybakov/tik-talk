import { Component, inject, input, OnInit, signal } from '@angular/core';
import { firstValueFrom, switchMap } from 'rxjs';

import { type CommentCreateDto, type Post, type PostComment } from '../../data';
import { AvatarComponent } from '@tt/common-ui';
import { SvgIconComponent } from '@tt/common-ui';
import { CommentComponent } from '../../ui/';
import { TimeDiffToNowPipe } from '@tt/common-ui';
import { ProfileService } from '@tt/profile';
import { PostService } from '../../data';
import { MessageInputComponent } from '@tt/common-ui';

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
