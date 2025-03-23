import { finalize, Observable, tap } from 'rxjs';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';

import type { ChatWSConnectionParams, ChatWsService, ChatWSSendMessage } from '../interfaces';

export class ChatWsRxjsService implements ChatWsService {
  #socket: WebSocketSubject<ChatWSSendMessage> | null = null;

  connect(params: ChatWSConnectionParams): Observable<ChatWSSendMessage> {
    if (!this.#socket) {
      this.#socket = new WebSocketSubject({
        url: params.url,
        protocol: [params.token],
      });
      console.log('WS connected');
    }

    return this.#socket.asObservable().pipe(
      tap((message) => params.handleMessage(message)),
      finalize(() => {
        this.disconnect();
      })
    );
  }

  sendMessage(message: string, chatId: number): void {
    this.#socket?.next({
      text: message,
      chat_id: chatId,
    });
  }

  disconnect(): void {
    this.#socket?.complete();
    this.#socket = null;
    console.log('WS disconnected');
  }
}
