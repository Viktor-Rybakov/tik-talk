import { finalize, Observable, tap } from 'rxjs';

import { ChatWSConnectionParams, ChatWsService } from '../interfaces/chat-ws-service.interface';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { ChatWSSendMessage } from '../interfaces/chat-ws-message.interface';

export class ChatWsRxjsService implements ChatWsService {
  #socket: WebSocketSubject<ChatWSSendMessage> | null = null;

  connect(params: ChatWSConnectionParams): Observable<ChatWSSendMessage> {
    if (!this.#socket) {
      this.#socket = new WebSocketSubject({
        url: params.url,
        protocol: [params.token],
      });
    }

    return this.#socket.asObservable().pipe(
      tap((message) => params.handleMessage(message)),
      finalize(() => console.log('Connection closed'))
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
  }
}
