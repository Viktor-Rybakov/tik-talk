import { Component, signal } from '@angular/core';

import { SvgIconComponent } from '../index';
import { DndDirective } from '../../directives';

const previewUrl: string = '/assets/svg/avatar-placeholder.svg';

@Component({
  selector: 'app-avatar-upload',
  imports: [SvgIconComponent, DndDirective],
  templateUrl: './avatar-upload.component.html',
  styleUrl: './avatar-upload.component.scss',
})
export class AvatarUploadComponent {
  preview = signal<string>(previewUrl);
  file: File | null = null;

  fileBrowserHandler(event: Event) {
    const file = (event.target as HTMLInputElement)?.files?.[0];

    if (!file || !file.type.match('image')) {
      return;
    }

    this.processFile(file);
  }

  onFileDropped(file: File) {
    if (!file || !file.type.match('image')) {
      return;
    }

    this.processFile(file);
  }

  processFile(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.preview.set(event.target?.result?.toString() ?? previewUrl);
    };

    reader.readAsDataURL(file);

    this.file = file;
  }

  onImgClick(event: MouseEvent) {
    event.preventDefault();
  }
}
