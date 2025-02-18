import { booleanAttribute, Component, HostBinding, Input } from '@angular/core';

import { AvatarComponent } from '../../../common-ui/avatar/avatar.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';

@Component({
  selector: 'app-post-input',
  imports: [AvatarComponent, SvgIconComponent],
  templateUrl: './post-input.component.html',
  styleUrl: './post-input.component.scss',
})
export class PostInputComponent {
  @HostBinding('class.comment')
  @Input({ alias: 'comment', transform: booleanAttribute })
  isComment: boolean = false;
}
