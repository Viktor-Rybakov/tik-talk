import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { type Chat, type LastMessage, type Message } from '../interfaces/chats.interface';
import { map } from 'rxjs';
import { ProfileService } from './profile.service';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  #http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessages = signal<Message[]>([]);

  createChat(userId: number) {
    return this.#http.post<Chat>(`${ApiPrefix}chat/${userId}`, {});
  }

  getMyChats() {
    return this.#http.get<LastMessage[]>(`${ApiPrefix}chat/get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.#http.get<Chat>(`${ApiPrefix}chat/${chatId}`).pipe(
      map((chat) => {
        const patchedMessages = chat.messages.map((message) => {
          return {
            ...message,
            user: message.userFromId === chat.userFirst.id ? chat.userFirst : chat.userSecond,
            isMine: this.me()?.id === message.userFromId,
          };
        });

        this.activeChatMessages.set(patchedMessages);

        return {
          ...chat,
          companion: this.me()?.id === chat.userFirst.id ? chat.userSecond : chat.userFirst,
          messages: patchedMessages,
        };
      })
    );
  }

  sendMessage(chatId: number, message: string) {
    return this.#http.post<Message>(`${ApiPrefix}message/send/${chatId}`, {}, { params: { message } });
  }

  getMessageById(messageId: number) {
    return this.#http.get<Message>(`${ApiPrefix}message/${messageId}`);
  }
}
