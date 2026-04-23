import { Component } from '@angular/core';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  protected isOpen = false; // 控制購物車是否顯示
  protected isClosing = false; // 控制購物車離場動畫
  protected cartItems: CartItem[] = []; // 當前購物車所有餐點資料
  protected expandedItemIds = new Set<number>(); // 控制每筆餐點詳細資訊展開狀態

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // 監聽購物車開關狀態（由 Topbar 控制）
    this.cartService.cartOpen$.subscribe(open => {
      this.isOpen = open;

      if (open) {
        this.isClosing = false;
      }
    });

    // 監聽購物車資料（新增 / 刪除 / 修改都會更新）
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  /** 關閉購物車（先播放離場動畫，再真正關閉） */
  protected closeCart(): void {
    this.isClosing = true;

    setTimeout(() => {
      this.cartService.closeCart();
      this.isClosing = false;
    }, 500);
  }

  /** 減少餐點數量（最少為 1） */
  protected onDecrease(item: CartItem): void {
    this.cartService.updateQuantity(item.id, 'decrease');
  }

  /** 增加餐點數量 */
  protected onIncrease(item: CartItem): void {
    this.cartService.updateQuantity(item.id, 'increase');
  }

  /** 點擊修改：將該筆資料送到 Menu → 打開 modal 編輯 */
  protected onEdit(item: CartItem): void {
    this.cartService.startEdit(item); // 設定目前編輯項目
    this.closeCart();
  }


  removingIds = new Set<number>();

  isRemoving(cartItemId: number): boolean {
    return this.removingIds.has(cartItemId);
  }

  /** 刪除購物車中的餐點 */
  onRemove(item: any) {
    if (this.removingIds.has(item.cartItemId)) return;

    this.removingIds.add(item.cartItemId);

    setTimeout(() => {
      this.cartItems = this.cartItems.filter(cartItem => cartItem.cartItemId !== item.cartItemId);
      this.removingIds.delete(item.cartItemId);
    }, 350);
  }

  /** 確認送出（目前先 console，之後可串 API） */
  protected onCheckout(): void {
    console.log('確認送出');
  }

  /** 計算總金額（單價 × 數量 加總） */
  protected get totalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }

  /** 是否有加購資訊可顯示 */
  protected hasOptionGroups(item: CartItem): boolean {
    return !!item.optionGroups?.length;
  }

  /** 切換詳細資訊展開 / 收合 */
  protected toggleDetails(itemId: number): void {
    if (this.expandedItemIds.has(itemId)) {
      this.expandedItemIds.delete(itemId);
      return;
    }

    this.expandedItemIds.add(itemId);
  }

  /** 判斷該筆餐點詳細資訊是否展開 */
  protected isExpanded(itemId: number): boolean {
    return this.expandedItemIds.has(itemId);
  }
}
