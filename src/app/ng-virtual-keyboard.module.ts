import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { KeyboardPopupDirective } from './keyboard-popup.directive';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [VirtualKeyboardComponent,
        KeyboardPopupDirective],
    exports: [VirtualKeyboardComponent,
        KeyboardPopupDirective],
    entryComponents: [
        VirtualKeyboardComponent]
})
export class NgVirtualKeyboardModule {
}
