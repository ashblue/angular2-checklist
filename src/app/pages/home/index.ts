import {PageBase} from '../base';
import {Component} from '@angular/core';
import {Hero} from '../../modules/models/hero';
import {FormExample} from '../../modules/components/forms/form-example/index';
import helpers from '../../utilities/helpers';

@Component({
  selector: 'page-home',
  templateUrl: 'pages/home/index.html',
  directives: [
    FormExample
  ]
})

export class PageHome extends PageBase {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor() {
    super();
    console.log('Environmental configuration', ENV);
    helpers.myHelper();
  }
}
