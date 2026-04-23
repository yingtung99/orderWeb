import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  cartCount = 0; // 購物車總數量

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // 監聽購物車資料變化（新增 / 刪除 / 修改都會觸發）
    this.cartService.cartItems$.subscribe(items => {
      // 計算所有餐點的數量總和（用於 badge 顯示）
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });
  }

  /** 打開購物車 */
  openCart(): void {
    this.cartService.openCart();
  }
}
