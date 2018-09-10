import {
  Component,
  OnInit, HostListener,
  ChangeDetectorRef,
  ElementRef
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { specialKeys } from '../specialKeysEnum';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-virtual-keyboard',
  templateUrl: './virtual-keyboard.component.html',
  styleUrls: ['./virtual-keyboard.component.css']
})
export class VirtualKeyboardComponent implements OnInit {
  keyPressed = new Subject();
  shouldKeyboardBeOpen = new Subject();
  specialKeyPressed = new Subject();
  isKeyBoardOpen = false;
  langSubscription: Subscription;
  alphaArray = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'a', 's',
    'd', 'f', 'g', 'h', 'j', 'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm'];
  numArray = new Array('7', '8', '9', '4', '5', '6', '1', '2', '3', '0');
  numArraySorted = new Array('1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-');
  SpCharArray = ['~', '!', '@', '#', '$', '^', '&', '*', '(', ')', '-', '`',
    '_', '=', '{', '}', '|', ':', '`', '*', '?', '[', ']', '.', '/', ', '];

  alphaArrayDisp;
  numArrayDisp;
  frenchArrayDisp;
  portugueseArrayDisp;
  frenchArr;
  portArr;
  temp: any;
  isFrench: boolean;
  isDefault: boolean;
  isPortuguese: boolean;
  customArrayDisp;
  SpCharArrayDisp;
  isShuffleOn: boolean;
  languageSelected: any;
  isHoverOn: boolean;
  isSpecialChar: boolean;
  isSearchKeyboard: boolean;
  isCapsLockOn: boolean;
  hoveredOrMouseDown: boolean;
  langToggle: boolean;
  kboardType: String;
  numericRowsCount = new Array(3);
  numTableCount = new Array(9);
  now: any = [];

  constructor(private cdRef: ChangeDetectorRef,
    private eRef: ElementRef) {
  }

  ngOnInit() {
    this.resetCharacterArrays();
    this.setToUpperCase();
    this.isShuffleOn = false;
    this.isHoverOn = false;
    this.hoveredOrMouseDown = false;
    this.langToggle = false;
    // this.isPortuguese = false;
    // this.isFrench = false;
    // this.isDefault = false;
  }

  // Logic To Shuffle A
  shuffleArrayAlgo(arr) {
    let currentIndex = arr.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
  }

  shuffleDisplayArray() {
    // Shuffle All Arrays
    this.shuffleArrayAlgo(this.alphaArrayDisp);
    this.shuffleArrayAlgo(this.numArrayDisp);
    this.shuffleArrayAlgo(this.SpCharArrayDisp);
  }

  onCharacterKeyClick(i) {
    if (this.isShuffleOn === true) {
      this.shuffleDisplayArray();
    }
    this.keyPressed.next(i);
  }

  toggleCapsLock() {
    this.isCapsLockOn = !this.isCapsLockOn;
    if (this.isCapsLockOn) {
      if (this.isDefault) {
        this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
          return x.toUpperCase();
        });
      }
      if (this.isFrench) {
        this.frenchArrayDisp = this.frenchArrayDisp.map(function (x) {
          return x.toUpperCase();
        });
      }
      if (this.isPortuguese) {
        this.portugueseArrayDisp = this.portugueseArrayDisp.map(function (x) {
          return x.toUpperCase();
        });
      }
    } else if (!this.isCapsLockOn) {
      if (this.isDefault) {
        this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
          return x.toLowerCase();
        });
      }
      if (this.isFrench) {
        this.frenchArrayDisp = this.frenchArrayDisp.map(function (x) {
          return x.toLowerCase();
        });
      }
      if (this.isPortuguese) {
        this.portugueseArrayDisp = this.portugueseArrayDisp.map(function (x) {
          return x.toLowerCase();
        });
      }
    }
  }
  setToUpperCase() {
    if (this.isDefault) {
      this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
        return x.toUpperCase();
      });
    }
    if (this.isFrench) {
      this.frenchArrayDisp = this.frenchArrayDisp.map(function (x) {
        return x.toUpperCase();
      });
    }
    if (this.isPortuguese) {
      this.portugueseArrayDisp = this.portugueseArrayDisp.map(function (x) {
        return x.toUpperCase();
      });
    }
  }

  // toggleShuffle() {
  //   this.isShuffleOn = !this.isShuffleOn;
  //   if (this.isShuffleOn) {
  //     this.shuffleDisplayArray();
  //   } else {
  //     this.resetCharacterArrays();
  //   }
  //   if (this.isCapsLockOn) {
  //     this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
  //       return x.toUpperCase();
  //     });
  //   }
  // }
  toggleSpecialCharacters() {
    this.isSpecialChar = !this.isSpecialChar;
    if (this.isCapsLockOn) {
      this.alphaArrayDisp = this.alphaArrayDisp.map(function (x) {
        return x.toUpperCase();
      });
    }
    if (this.isSpecialChar) {
      this.langToggle = true;
      // this.SpCharArrayDisp = this.SpCharArray.slice();
    } else {
      this.langToggle = false;
      // this.SpCharArrayDisp.splice();
      this.customArrayDisp = this.temp.slice();
    }
  }

  resetCharacterArrays() {
    this.alphaArrayDisp = this.alphaArray.slice();
    if (this.kboardType === 'alphaNumeric') {
      this.numArrayDisp = this.numArraySorted.slice();
    } else {
      this.numArrayDisp = this.numArray.slice();
    }
    if (this.isFrench) {
      this.frenchArr = this.languageSelected;
      this.frenchArrayDisp = this.frenchArr.slice();
    }
    if (this.isPortuguese) {
      this.portArr = this.languageSelected;
      this.portugueseArrayDisp = this.portArr.slice();
    }
  }

  backspaceKeyPressed() {
    this.specialKeyPressed.next(specialKeys.backspace);
  }
  arrowKeyPressed() {
    this.specialKeyPressed.next(specialKeys.leftArrow);
  }
  onArrowLeft(event: string) {
    console.log(event);
  }

  clearButtonPressed() {
    this.specialKeyPressed.next(specialKeys.clear);
  }
  onSpecialCharacter() {
    this.keyPressed.next('.');
  }
  atSignPressed() {
    this.keyPressed.next('@');
  }
  commaPressed() {
    this.keyPressed.next(',');
  }
  hyphenPressed() {
    this.keyPressed.next('-');
  }
  slashPressed() {
    this.keyPressed.next('/');
  }
  quotePressed() {
    // tslint:disable-next-line:quotemark
    this.keyPressed.next("'");
  }

  spacebarKeyPressed() {
    this.keyPressed.next(' ');
  }

  toggleHover() {
    this.isHoverOn = !this.isHoverOn;
    console.log(this.isHoverOn);
  }

  @HostListener('document:click', ['$event'])
  whereDidUserClick(event) {
    this.cdRef.detectChanges();
    if (this.eRef.nativeElement.contains(event.target) || event.target.classList.contains('donotRemove')) {
      this.shouldKeyboardBeOpen.next(false);
    } else {
      if (this.isKeyBoardOpen) {
        this.shouldKeyboardBeOpen.next(true);
      }
      this.isKeyBoardOpen = true;
    }
  }
}
