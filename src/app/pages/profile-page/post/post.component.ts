import { Component, inject, input, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { firstValueFrom } from 'rxjs';

import { type Post, PostComment } from '../../../data/interfaces/post.interface';
import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { PostInputComponent } from '../post-input/post-input.component';
import { CommentComponent } from '../comment/comment.component';
import { PostService } from '../../../data/services/post.service';

@Component({
  selector: 'app-post',
  imports: [AvatarComponent, DatePipe, SvgIconComponent, PostInputComponent, CommentComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  #postService = inject(PostService);

  post = input.required<Post>();
  comments = signal<PostComment[]>([]);

  ngOnInit(): void {
    this.comments.set(this.post().comments);
  }

  async onCommentCreated() {
    const comments = await firstValueFrom(this.#postService.getCommentsByPostId(this.post().id));
    this.comments.set(comments);
  }
}
