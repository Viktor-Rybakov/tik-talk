import { booleanAttribute, Component, HostBinding, inject, input, output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';
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

  comment = input(false, { transform: booleanAttribute });

  created = output<string>();

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
    const trimmedInputText: string = this.inputText.trim();

    if (trimmedInputText === '') {
      return;
    }

    this.created.emit(trimmedInputText);
    this.inputText = '';
  }
}
