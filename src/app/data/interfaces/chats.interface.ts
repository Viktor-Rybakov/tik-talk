import { type Profile } from './profile.interface';

export interface Message {
  id: number;
  userFromId: number;
  personalChatId: number;
  text: string;
  createdAt: string;
  isRead: boolean;
  updatedAt: string;
}

export interface Chat {
  id: number;
  userFirst: Profile;
  userSecond: Profile;
  messages: Message[];
}

export interface LastMessage {
  id: number;
  userFrom: Profile;
  message: string | null;
  createdAt: string;
  unreadMessages: number;
}
