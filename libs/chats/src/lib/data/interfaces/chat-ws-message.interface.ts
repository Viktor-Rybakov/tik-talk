export interface ChatWSMessageBase {
  status: 'success' | 'error';
}

export interface ChatWSUnreadMessage extends ChatWSMessageBase {
  action: 'unread';
  data: {
    count: number;
  }
}

export interface ChatWSNewMessage extends ChatWSMessageBase {
  action: 'message';
  data: {
    id: number;
    message: string;
    chat_id: number;
    created_at: string,
    author: number;
  }
}

export interface ChatWSError extends ChatWSMessageBase {
  message: string;
}

export interface ChatWSSendMessage {
  text: string;
  chat_id: number;
}

export type ChatWSMessage = ChatWSUnreadMessage | ChatWSNewMessage | ChatWSError | ChatWSSendMessage;
