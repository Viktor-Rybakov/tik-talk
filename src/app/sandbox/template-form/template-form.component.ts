import { Component } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { NoReactValidator } from './no-react.validator';

@Component({
  selector: 'app-template-form',
  imports: [FormsModule, JsonPipe, NoReactValidator, ReactiveFormsModule],
  templateUrl: './template-form.component.html',
  styleUrl: './template-form.component.scss',
})
export class TemplateFormComponent {
  person: {
    firstName: string;
    lastName: string;
    address: {
      street: string;
      building: number;
    };
  } = {
    firstName: '',
    lastName: '',
    address: {
      street: '',
      building: 0,
    },
  };

  hobby: string = '';

  onSubmit(form: NgForm): void {
    console.log('FORM', form);
    console.log('PERSON', this.person);
  }
}
