import { booleanAttribute, Component, inject, input, output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AvatarComponent } from '../avatar/avatar.component';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { ProfileService } from '@tt/profile';

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
  textarea: HTMLTextAreaElement | null = null;

  onTextInput(event: Event) {
    if (this.textarea === null) {
      this.textarea = event.target as HTMLTextAreaElement;
    }

    this.#r2.setStyle(this.textarea, 'height', 'auto');
    this.#r2.setStyle(this.textarea, 'height', this.textarea.scrollHeight + 2 + 'px');
  }

  onCreate() {
    const trimmedInputText: string = this.inputText.trim();

    if (trimmedInputText === '') {
      return;
    }

    this.created.emit(trimmedInputText);
    this.#r2.setStyle(this.textarea, 'height', 'auto');
    this.inputText = '';
  }
}
