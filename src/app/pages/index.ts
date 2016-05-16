import { Component } from '@angular/core';
export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'page-index',
  templateUrl: 'pages/index.html'
})

export class PageIndex {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor () {
    console.log('hit');
  }
}
