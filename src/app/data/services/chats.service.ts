import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { type Chat, type LastMessage, type Message } from '../interfaces/chats.interface';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  #http = inject(HttpClient);

  createChat(userId: number) {
    return this.#http.post<Chat>(`${ApiPrefix}chat/${userId}`, {});
  }

  getMyChats() {
    return this.#http.get<LastMessage[]>(`${ApiPrefix}chat/get_my_chats/`);
  }

  getChatById(chatId: number) {
    return this.#http.get<Chat>(`${ApiPrefix}chat/${chatId}`);
  }

  sendMessage(chatId: number, message: string) {
    return this.#http.post<Message>(`${ApiPrefix}message/send/${chatId}`, {}, { params: { message } });
  }

  getMessageById(messageId: number) {
    return this.#http.get<Message>(`${ApiPrefix}message/${messageId}`);
  }
}
