import { booleanAttribute, Component, HostBinding, inject, input, output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { type CommentCreateDto, type PostCreateDto } from '../../../data/interfaces/post.interface';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-input',
  imports: [AvatarComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  #r2 = inject(Renderer2);
  profile = inject(ProfileService).me;

  postId = input<number>(0);
  comment = input(false, { transform: booleanAttribute });

  commentCreated = output<CommentCreateDto>();
  postCreated = output<PostCreateDto>();

  @HostBinding('class.comment')
  get isComment(): boolean {
    return this.comment();
  }

  inputText: string = '';

  onTextInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.#r2.setStyle(textarea, 'height', 'auto');
    this.#r2.setStyle(textarea, 'height', textarea.scrollHeight + 2 + 'px');
  }

  onCreate() {
    if (this.inputText === '') {
      return;
    }

    if (this.isComment) {
      this.#createNewComment();
    } else {
      this.#createNewPost();
    }
  }

  #createNewComment(): void {
    const payload: CommentCreateDto = {
      text: this.inputText,
      authorId: this.profile()!.id,
      postId: this.postId(),
    };

    this.commentCreated.emit(payload);
    this.inputText = '';
  }

  #createNewPost(): void {
    const payload: PostCreateDto = {
      title: 'Новый пост',
      authorId: this.profile()!.id,
      content: this.inputText,
    };

    this.postCreated.emit(payload);
    this.inputText = '';
  }
}
