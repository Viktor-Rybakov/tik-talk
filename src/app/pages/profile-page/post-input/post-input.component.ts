import { booleanAttribute, Component, HostBinding, inject, Input, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
import { type PostCreateDto } from '../../../data/interfaces/post.interface';
import { PostService } from '../../../data/services/post.service';
import { ProfileService } from '../../../data/services/profile.service';

@Component({
  selector: 'app-post-input',
  imports: [AvatarComponent, SvgIconComponent, FormsModule],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  #r2 = inject(Renderer2);
  #postService = inject(PostService);
  profile = inject(ProfileService).me;

  @HostBinding('class.comment')
  @Input({ alias: 'comment', transform: booleanAttribute })
  isComment: boolean = false;

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

    const payload: PostCreateDto = {
      title: 'Новый пост',
      authorId: this.profile()!.id,
      content: this.inputText,
      communityId: null,
    };

    firstValueFrom(this.#postService.createPost(payload));
  }
}
