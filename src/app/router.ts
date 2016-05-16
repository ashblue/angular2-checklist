import {Component} from '@angular/core';
import {PageIndex} from './pages/index';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

@Component({
  selector: 'my-app',
  template: `<page-index></page-index>`,
  directives: [
    PageIndex,
    ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS
  ]
})

@RouteConfig([
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   component: DashboardComponent,
  //   useAsDefault: true
  // },
  // {
  //   path: '/detail/:id',
  //   name: 'HeroDetail',
  //   component: HeroDetailComponent
  // }
])

export class Router {
  title = 'Consumer Portal';
}
