export type {
  ChatWSError,
  ChatWSMessage,
  ChatWSMessageBase,
  ChatWSNewMessage,
  ChatWSSendMessage,
  ChatWSUnreadMessage,
} from './chat-ws-message.interface';
export type { ChatWSConnectionParams, ChatWsService } from './chat-ws-service.interface';
export type { Chat, LastMessage, Message, MessagesGroupByDate } from './chats.interface';
export { isError, isNewMessage, isUnreadMessage } from './type-guard';
