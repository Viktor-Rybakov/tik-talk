import { Component } from '@angular/core';
import { ChatWorkspaceHeaderComponent } from './chat-workspace-header/chat-workspace-header.component';
import { ChatMessagesListComponent } from './chat-messages-list/chat-messages-list.component';
import { MessageInputComponent } from '../../../common-ui/message-input/message-input.component';

@Component({
  selector: 'app-chat-workspace',
  imports: [ChatWorkspaceHeaderComponent, ChatMessagesListComponent, MessageInputComponent],
  templateUrl: './chat-workspace.component.html',
  styleUrl: './chat-workspace.component.scss',
})
export class ChatWorkspaceComponent {}
