import { Component } from '@angular/core';
export class Hero {
  id: number;
  name: string;
}

@Component({
  selector: 'my-app',
  template:`
    <h1>{{title}} <span class="glyphicon glyphicon-search" aria-hidden="true"></span></h1>
    <h2>{{hero.name}} details! <i class="fa fa-camera-retro" aria-hidden="true"></i></h2>
    <div><label>id: </label>{{hero.id}}</div>
    <div>
      <label>name: </label>
      <input [(ngModel)]="hero.name" placeholder="name">
    </div>
    `
})

export class Index {
  title = 'Tour of Heroes';
  hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };

  constructor () {
    console.log('hit');
  }
}
