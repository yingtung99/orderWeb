import { Component } from '@angular/core';
import { Sidebar } from '../sidebar/sidebar';
import { Topbar } from '../topbar/topbar';
import { RouterOutlet } from '@angular/router';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [Sidebar, Topbar, RouterOutlet, Cart],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {}
