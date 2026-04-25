import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.scss',
})
export class Topbar {
  protected cartCount = 0; // 購物車總數量
  protected hideCartBtn = false; // 隱藏購物車按鈕

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    // 監聽購物車資料變化（新增 / 刪除 / 修改都會觸發）
    this.cartService.cartItems$.subscribe(items => {
      // 計算所有餐點的數量總和（用於 badge 顯示）
      this.cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
    });

    // 先用「目前網址」判斷一次（處理重整的情況）
    this.updateCartBtnVisible(this.router.url);

    // 監聽路由變化（切頁時會觸發）
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        // 每次切換頁面都重新判斷
        this.updateCartBtnVisible(event.urlAfterRedirects);
      });
  }

  /** 判斷是否要隱藏購物車按鈕 */
  private updateCartBtnVisible(url: string): void {
    // 如果在 /record 頁面 → 隱藏按鈕
    this.hideCartBtn = url.includes('/record');
  }

  /** 打開購物車 */
  openCart(): void {
    this.cartService.openCart();
  }
}
