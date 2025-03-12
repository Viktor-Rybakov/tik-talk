import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DateTime } from 'luxon';

import { type Chat, type LastMessage, type Message, type MessagesGroupByDate } from '../interfaces/chats.interface';
import { ProfileService } from '@tt/profile';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  #http = inject(HttpClient);
  me = inject(ProfileService).me;

  activeChatMessagesGroups = signal<MessagesGroupByDate[]>([]);

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

        const messagesGroups: MessagesGroupByDate[] = this.#getMessagesGroupsByDate(patchedMessages);
        this.activeChatMessagesGroups.set(messagesGroups);

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

  #getMessagesGroupsByDate(messages: Message[]): MessagesGroupByDate[] {
    const messagesMap = new Map<string, Message[]>();

    messages.forEach((message: Message) => {
      const messageCreateDate = DateTime.fromISO(message.createdAt, { zone: 'utc' }).toFormat('dd.MM.yyyy');

      if (!messagesMap.has(messageCreateDate)) {
        messagesMap.set(messageCreateDate, []);
      }

      messagesMap.get(messageCreateDate)!.push(message);
    });

    return Array.from(messagesMap, ([date, messages]) => {
      return { date, messages };
    });
  }
}
