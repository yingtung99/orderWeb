import { Routes } from '@angular/router';
import { Layout } from './modules/layout/layout';
import { Menu } from './modules/menu/menu';
import { Record } from './modules/record/record';
import { Home } from './modules/home/home';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: '',
    component: Layout,
    children: [
      { path: 'menu', component: Menu },
      { path: 'record', component: Record }
    ]
  }
];
