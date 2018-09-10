import { Component, Output, EventEmitter } from '@angular/core';
import { LanguagesService } from './languages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private languageService: LanguagesService) {

  }
  @Output() changeLang = new EventEmitter();
  isChange: boolean;
  title = 'app';
  portLang = '';
  engLang = '';
  frenLang = '';
  portStd = '';
  engStd = '';
  frenStd = '';
  mobileNo = '';

  onToggle() {
    this.changeLang.emit(this.isChange);
    this.languageService.getPortuguese();

  }
}
