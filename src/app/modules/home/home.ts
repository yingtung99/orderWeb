import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected tableNumber = '';
  protected showError = false;

  constructor(private router: Router) {}

  protected confirmTableNumber(): void {
    const value = this.tableNumber.trim();

    if (!value) {
      this.showError = true;
      return;
    }

    localStorage.setItem('tableNumber', value);
    this.router.navigate(['/menu']);
  }
}