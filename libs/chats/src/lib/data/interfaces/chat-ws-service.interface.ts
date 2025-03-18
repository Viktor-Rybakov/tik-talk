import { ChatWSMessage } from './chat-ws-message.interface';

export interface ChatWSConnectionParams {
  url: string;
  token: string;
  handleMessage: (message: ChatWSMessage) => void;
}

export interface ChatWsService {
  connect: (params: ChatWSConnectionParams) => void;
  sendMessage: (message: string, chatId: number) => void;
  disconnect: () => void;
}
