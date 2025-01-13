import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import translationsRU from '../../public/assets/i18n/ru.json';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    private _translate: TranslateService
  ) {
    this._translate.setTranslation('ru', translationsRU);
    this._translate.setDefaultLang('ru');
  }
}
