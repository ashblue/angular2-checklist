import {Component} from '@angular/core';

@Component({
  selector: 'input-example',
  templateUrl: 'components/inputs/input-example/index.html'
})

export class FormExample {
  constructor() {
    console.log('input example loaded');
  }
}
