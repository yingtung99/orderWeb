import { Routes } from '@angular/router';
import { Layout } from './modules/layout/layout';
import { Menu } from './modules/menu/menu';
import { Record } from './modules/record/record';

export const routes: Routes = [
  {
    path: '',
    component: Layout,
    children: [
      { path: '', redirectTo: 'menu', pathMatch: 'full' },
      { path: 'menu', component: Menu },
      { path: 'record', component: Record }
    ]
  }
];
