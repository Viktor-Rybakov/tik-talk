import type { ChatWSError, ChatWSMessage, ChatWSNewMessage, ChatWSUnreadMessage } from './chat-ws-message.interface';

export function isUnreadMessage(message: ChatWSMessage): message is ChatWSUnreadMessage {
  return 'action' in message && message.action === 'unread';
}

export function isNewMessage(message: ChatWSMessage): message is ChatWSNewMessage {
  return 'action' in message && message.action === 'message';
}

export function isError(message: ChatWSMessage): message is ChatWSError {
  return 'status' in message && message.status === 'error';
}
