import {PageBase} from './base';
import {Component} from '@angular/core';
import {Hero} from '../components/models/hero';
import {FormExample} from '../components/forms/form-example/index';
import helpers from '../utilities/helpers';

@Component({
  selector: 'page-index',
  templateUrl: 'pages/index.html',
  directives: [
    FormExample
  ]
})

export class PageIndex extends PageBase {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() {
    super();
    console.log('hit');
    helpers.myHelper();
  }
}
