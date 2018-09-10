import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NgVirtualKeyboardModule } from './ng-virtual-keyboard.module';
import { LanguagesService } from './languages.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgVirtualKeyboardModule,
    HttpModule
  ],
  providers: [LanguagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
