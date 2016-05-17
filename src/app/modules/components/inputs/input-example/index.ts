import {Component} from '@angular/core';
import {InputBase} from '../base';

@Component({
  selector: 'input-example',
  templateUrl: 'components/inputs/input-example/index.html'
})

export class FormExample extends InputBase {
  constructor() {
    super();
    console.log('input example loaded');
  }
}
