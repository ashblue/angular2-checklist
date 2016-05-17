import {Component} from '@angular/core';
import {PageHome} from './pages/home/index';
import {RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS} from '@angular/router-deprecated';

@Component({
  selector: 'my-app',
  template: `<page-home></page-home>`,
  directives: [
    PageHome,
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
