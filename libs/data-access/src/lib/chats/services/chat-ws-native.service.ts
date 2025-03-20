import type { ChatWSConnectionParams, ChatWsService } from '../interfaces';

export class ChatWsNativeService implements ChatWsService {
  #socket: WebSocket | null = null;

  connect(params: ChatWSConnectionParams): void {
    if (!this.#socket) {
      this.#socket = new WebSocket(params.url, [params.token]);
    }

    this.#socket.onmessage = (event: MessageEvent): void => {
      params.handleMessage(JSON.parse(event.data));
    };

    this.#socket.onclose = (): void => {
      this.disconnect();
      this.#socket = null;
      console.log('WS connection closed')
    };
  }

  sendMessage(message: string, chatId: number): void {
    this.#socket?.send(
      JSON.stringify({
        text: message,
        chat_id: chatId,
      })
    );
  }

  disconnect(): void {
    this.#socket?.close();
  }
}
