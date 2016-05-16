import {Component} from '@angular/core';

@Component({
  selector: 'form-example',
  templateUrl: 'components/forms/form-example/index.html'
})

export class FormExample {
  constructor() {
    console.log('form default loaded');
  }
}
