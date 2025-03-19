import type {
  ChatWSError,
  ChatWSMessage,
  ChatWSMessageBase,
  ChatWSNewMessage,
  ChatWSSendMessage,
  ChatWSUnreadMessage,
} from './chat-ws-message.interface';
import type { ChatWSConnectionParams, ChatWsService } from './chat-ws-service.interface';
import type { Chat, LastMessage, Message, MessagesGroupByDate } from './chats.interface';
import { isError, isNewMessage, isUnreadMessage } from './type-guard';

export type { ChatWSMessageBase, ChatWSUnreadMessage, ChatWSNewMessage, ChatWSError, ChatWSSendMessage, ChatWSMessage };
export type { ChatWSConnectionParams, ChatWsService };
export type { Message, MessagesGroupByDate, Chat, LastMessage };
export { isUnreadMessage, isNewMessage, isError };
