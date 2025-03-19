import { ChangeDetectionStrategy, Component } from '@angular/core';

import { TemplateFormComponent } from '../template-form/template-form.component';
import { ReactiveFormComponent } from '../reactive-form/reactive-form.component';

@Component({
  selector: 'app-sandbox-page',
  imports: [TemplateFormComponent, ReactiveFormComponent],
  templateUrl: './sandbox-page.component.html',
  styleUrl: './sandbox-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SandboxPageComponent {}
