import {Component} from '@angular/core';
import {FormBase} from '../base';

@Component({
  selector: 'form-example',
  templateUrl: 'components/forms/form-example/index.html'
})

export class FormExample extends FormBase {
  constructor() {
    super();
    console.log('form default loaded');
  }
}
