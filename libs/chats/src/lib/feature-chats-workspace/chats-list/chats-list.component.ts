import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';

import { ChatsService } from '@tt/data-access/chats';
import { ChatButtonComponent } from './chat-button/chat-button.component';
import { SvgIconComponent } from '@tt/common-ui';

@Component({
  selector: 'app-chats-list',
  imports: [
    ChatButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    SvgIconComponent,
    AsyncPipe,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatsListComponent {
  #chatsService = inject(ChatsService);

  searchControl = new FormControl<string>('', { nonNullable: true });

  chats$ = this.#chatsService.getMyChats().pipe(
    switchMap((chats) =>
      this.searchControl.valueChanges.pipe(
        startWith(''),
        map((searchValue) => {
          return chats.filter((chat) => {
            return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
              .toLowerCase()
              .includes(searchValue.toLowerCase().trim());
          });
        })
      )
    )
  );
}
