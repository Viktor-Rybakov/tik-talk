import { booleanAttribute, Component, HostBinding, inject, Input, Renderer2 } from '@angular/core';

import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-post-input',
  imports: [AvatarComponent, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  r2 = inject(Renderer2);

  @HostBinding('class.comment')
  @Input({ alias: 'comment', transform: booleanAttribute })
  isComment: boolean = false;

  onTextInput(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    this.r2.setStyle(textarea, 'height', 'auto');
    this.r2.setStyle(textarea, 'height', (textarea.scrollHeight + 2) + 'px');
  }
}
