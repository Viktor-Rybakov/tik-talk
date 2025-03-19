import { ChangeDetectionStrategy, Component, computed, inject, input, OnInit, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';

import { AvatarComponent, SvgIconComponent, TimeDiffToNowPipe, MessageInputComponent } from '@tt/common-ui';
import { selectMyProfile } from '@tt/shared';
import { type CommentCreateDto, type Post, PostComment, postsActions, selectCommentsByPostId } from '@tt/data-access/posts';
import { CommentComponent } from '../../ui/';

@Component({
  selector: 'app-post',
  imports: [AvatarComponent, SvgIconComponent, CommentComponent, TimeDiffToNowPipe, MessageInputComponent],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostComponent implements OnInit {
  #store = inject(Store);

  myProfile = this.#store.selectSignal(selectMyProfile);

  post = input.required<Post>();
  storeComments!: Signal<PostComment[]>;
  isCommentsUpdated = signal<boolean>(false);

  comments = computed<PostComment[]>(() => {
    return this.isCommentsUpdated() ? this.storeComments() : this.post().comments;
  });

  ngOnInit(): void {
    this.storeComments = this.#store.selectSignal(selectCommentsByPostId(this.post().id));
  }

  onCommentCreated(commentText: string) {
    const payload: CommentCreateDto = {
      text: commentText,
      authorId: this.myProfile()!.id,
      postId: this.post().id,
    };

    this.#store.dispatch(postsActions.createComment({ newComment: payload }));
    this.isCommentsUpdated.set(true);
  }
}
