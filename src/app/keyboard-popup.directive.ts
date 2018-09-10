import { Directive,
  Input,
  Output,
  ViewChild,
   EventEmitter,
   ViewContainerRef,
   ComponentRef,
   ComponentFactoryResolver,
   ElementRef,
   AfterViewInit,
   HostListener,
   Renderer2} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { VirtualKeyboardComponent } from './virtual-keyboard/virtual-keyboard.component';
import { specialKeys } from './specialKeysEnum';
import { LanguagesService } from './languages.service';

@Directive({
  selector: '[appVirtualKeyboard]'
})
export class KeyboardPopupDirective implements AfterViewInit {
  @Input() appVirtualKeyboard;
  @Input() isKeyboardDirectiveActive;
  @Input() language: string;
  @Input() search;
  @Output() appVirtualKeyboardChange = new EventEmitter();
  @Input() kboardType: String = 'alphaNumeric';
  @ViewChild('childComp', {read: ViewContainerRef}) childComp;
  keyPressedSubscription: Subscription;
  closeKeyboardSubscription: Subscription;
  specialKeyPressedSubscription: Subscription;
  private vkbCompRef: ComponentRef<VirtualKeyboardComponent>;
  factory: any;
  languageArray: any = [];
  engInput: any;

  constructor(private viewContainerRef: ViewContainerRef,
              private resolver: ComponentFactoryResolver,
              private elRef: ElementRef,
              private languageService: LanguagesService, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    // factory comp resolver
    this.factory = this.resolver.resolveComponentFactory(VirtualKeyboardComponent);
  }

  @HostListener('click') onclick() {
    this.addKB();
  }

  // @HostListener('mouseleave') onMouseLeave(Event) {
  //   this.removeKB();
  //   }
  addKB() {
    if (this.isKeyboardDirectiveActive) {
      this.vkbCompRef = this.viewContainerRef.createComponent(this.factory);
      this.vkbCompRef.instance.kboardType = this.kboardType;
      if (this.language === 'french') {
        this.languageArray = this.languageService.getFrench();
        this.vkbCompRef.instance.languageSelected = this.languageArray;
        this.vkbCompRef.instance.isFrench = true;
      } else if (this.language === 'portuguese') {
        this.languageArray = this.languageService.getPortuguese();
        this.vkbCompRef.instance.languageSelected = this.languageArray;
        this.vkbCompRef.instance.isPortuguese = true;
      } else {
        this.vkbCompRef.instance.isDefault = true;
      }
      if (this.search) {
        this.vkbCompRef.instance.isSearchKeyboard = true;
      }
      this.keyPressedSubscription = this.vkbCompRef.instance.keyPressed.subscribe(
        (data) => {
          this.appendPressedKeyValue(data);
          this.elRef.nativeElement.focus();
        },
        (err) => console.log(err),
      );
      this.closeKeyboardSubscription = this.vkbCompRef.instance.shouldKeyboardBeOpen.subscribe(
        (data) => {
          if (data) {
            this.removeKB();
          }
        },
        (err) => console.log(err),
      );
      this.specialKeyPressedSubscription = this.vkbCompRef.instance.specialKeyPressed.subscribe(
        (data) => {
          this.specialKeyPressed(data);
          this.elRef.nativeElement.focus();
        },
        (err) => console.log(err),
      );
    }
  }

  removeKB() {
    this.vkbCompRef.destroy();
    this.viewContainerRef.clear();
    this.keyPressedSubscription.unsubscribe();
    this.closeKeyboardSubscription.unsubscribe();
    this.specialKeyPressedSubscription.unsubscribe();

  }

  private appendPressedKeyValue(data: any) {
    this.appVirtualKeyboard = this.appVirtualKeyboard + data;
    this.appVirtualKeyboardChange.emit(this.appVirtualKeyboard);
  }

  private specialKeyPressed(data: any) {
    switch (data) {
      case specialKeys.clear :
        this.appVirtualKeyboard = '';
        this.appVirtualKeyboardChange.emit(this.appVirtualKeyboard);
        break;
      case specialKeys.backspace :
        this.appVirtualKeyboard = this.appVirtualKeyboard.slice(0, -1);
        this.appVirtualKeyboardChange.emit(this.appVirtualKeyboard);
      //   break;
      // case specialKeys.leftArrow :
      //   this.appVirtualKeyboard = this.moveCursorToEnd();
      //   this.appVirtualKeyboardChange.emit(this.appVirtualKeyboard);
    }
  }
//   private moveCursorToEnd() {
//     const inputElem = this.elRef.nativeElement.querySelector();
//     if (inputElem) {
//       const caretPos = inputElem.selectionStart;
//       console.log(caretPos);
//     }
//     const inputElem = document.getElementsByName('english');
//     const engInput = this.englishInput;
//     this.setCaretToPos(input,);
//     const selection = window.getSelection();
//     selection.modify('move', 'backward', 'character');
//     const inputElem = this.renderer.setElementP(this.elRef.nativeElement);
//     const caretPos = inputElem.selectionStart;
//     console.log(inputElem);
//     if (typeof inputElem.selectionStart === 'number') {
//       inputElem.selectionStart = inputElem.selectionEnd = inputElem.value.length;
//     } else if (typeof inputElem.createTextRange !== 'undefined') {
//       inputElem.focus();
//         const range = inputElem.createTextRange();
//         range.collapse(false);
//         range.select();
//     }
//     if (typeof inputElem.selectionStart === 'number') {
//       inputElem.selectionStart = inputElem.selectionEnd = inputElem.value.length;
//       inputElem.selectionEnd = inputElem.selectionEnd - 1;
//       inputElem.focus();
//     }
// }
// setSelectionRange(input, selectionStart, selectionEnd) {
//   if (input.setSelectionRange) {
//   input.focus();
//   input.setSelectionRange(selectionStart, selectionEnd);
//   } else if (input.createTextRange) {
//   const range = input.createTextRange();
//   range.collapse(true);
//   range.moveEnd('character', selectionEnd);
//   range.moveStart('character', selectionStart);
//   range.select();
//   }
// }
// setCaretToPos (input, pos) {
//   this.setSelectionRange(input, pos, pos);
//   }

}
