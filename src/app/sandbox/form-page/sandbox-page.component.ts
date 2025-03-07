import { Component } from '@angular/core';
import { TemplateFormComponent } from '../template-form/template-form.component';

@Component({
  selector: 'app-sandbox-page',
  imports: [TemplateFormComponent],
  templateUrl: './sandbox-page.component.html',
  styleUrl: './sandbox-page.component.scss',
})
export class SandboxPageComponent {}
