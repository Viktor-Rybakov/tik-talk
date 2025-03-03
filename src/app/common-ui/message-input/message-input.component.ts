import { booleanAttribute, Component, inject, input, output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from '../avatar/avatar.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ProfileService } from '../../data/services/profile.service';

@Component({
  selector: 'app-message-input',
  imports: [AvatarComponent, FormsModule, SvgIconComponent],
  templateUrl: './message-input.component.html',
  styleUrl: './message-input.component.scss',
})
export class MessageInputComponent {
  #r2 = inject(Renderer2);
  profile = inject(ProfileService).me;

  isComment = input(false, { transform: booleanAttribute });

  created = output<string>();

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
