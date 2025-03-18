import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, firstValueFrom, map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { DateTime } from 'luxon';
import { Store } from '@ngrx/store';

import { type Chat, type LastMessage, type Message, type MessagesGroupByDate } from '../interfaces/chats.interface';
import { MyProfileService, selectMyProfile } from '@tt/shared';
import { ChatWsService } from '../interfaces/chat-ws-service.interface';
import { AuthService } from '../../../../../auth/src/lib/auth/data';
import { ChatWSMessage } from '../interfaces/chat-ws-message.interface';
import { isError, isNewMessage, isUnreadMessage } from '../interfaces/type-guard';
import { Profile } from '@tt/interfaces/profile';
import { ChatWsRxjsService } from './chat-ws-rxjs.service';
import { chatActions } from '../store/actions';

const ApiPrefix: string = 'https://icherniakov.ru/yt-course/';

@Injectable({
  providedIn: 'root',
})
export class ChatsService {
  #http = inject(HttpClient);
  #store = inject(Store);
  #authService = inject(AuthService);
  #myProfileService = inject(MyProfileService);

  // wsAdapter: ChatWsService = new ChatWsNativeService();
  wsAdapter: ChatWsService = new ChatWsRxjsService();
  wsRefresh$ = new Subject<void>();

  myProfile = this.#store.selectSignal(selectMyProfile);
  activeCompanionProfile = signal<Profile | null>(null);
  activeChatMessagesGroups = signal<MessagesGroupByDate[]>([]);
  activeChatWSMessages = signal<Message[]>([]);

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
            isMine: this.myProfile()?.id === message.userFromId,
          };
        });

        const messagesGroups: MessagesGroupByDate[] = this.#getMessagesGroupsByDate(patchedMessages);
        this.activeChatMessagesGroups.set(messagesGroups);
        this.activeChatWSMessages.set([]);

        const companion = this.myProfile()?.id === chat.userFirst.id ? chat.userSecond : chat.userFirst;
        this.activeCompanionProfile.set(companion);

        return {
          ...chat,
          companion,
          messages: patchedMessages,
        };
      })
    );
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

  connectWithRefreshingWS() {
    return this.wsRefresh$.pipe(
      startWith(null),
      switchMap(() => this.#connectWS()),
    )
  }

  handleWSMessage = (message: ChatWSMessage) => {
    if (!('action' in message)) {
      return;
    }

    if (isUnreadMessage(message)) {
      this.#store.dispatch(chatActions.newWSUnreadMessage({ message }));
    }

    if (isNewMessage(message)) {
      const isMyMessage = this.myProfile()?.id === message.data.author;
      const isCompanionMessage = this.activeCompanionProfile()?.id === message.data.author;

      if (isMyMessage || isCompanionMessage) {
        const newWSMessage: Message = {
          id: message.data.id,
          userFromId: message.data.author,
          personalChatId: message.data.chat_id,
          text: message.data.message,
          createdAt: message.data.created_at,
          isRead: true,
          user: isMyMessage ? this.myProfile()! : this.activeCompanionProfile()!,
          isMine: isMyMessage,
        };

        this.activeChatWSMessages.set([...this.activeChatWSMessages(), newWSMessage]);
      }
    }

    if (isError(message)) {
      console.error('WS Connection ERROR: Invalid token');
      this.#refreshWSConnection();
    }
  };

  #connectWS() {
    return this.wsAdapter.connect({
      url: `${ApiPrefix}chat/ws`,
      token: this.#authService.token ?? '',
      handleMessage: this.handleWSMessage,
    }) as Observable<ChatWSMessage>;
  }

  #refreshWSConnection() {
    firstValueFrom(this.#myProfileService.getMe().pipe(delay(2000))).then(() => this.wsRefresh$.next());
  }
}
