import { Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';

import { ChatsService } from '../../../data/services/chats.service';
import { ChatButtonComponent } from './chat-button/chat-button.component';
import { SvgIconComponent } from '../../../common-ui/svg-icon/svg-icon.component';

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
