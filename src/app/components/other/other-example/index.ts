import {Component} from '@angular/core';

@Component({
  selector: 'other-example',
  templateUrl: 'components/other/other-example/index.html'
})

export class FormExample {
  constructor() {
    console.log('other example loaded');
  }
}
