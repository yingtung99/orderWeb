import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  /** 購物車資料 */
  private cartItems = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItems.asObservable();

  /** 控制購物車側邊欄開關狀態 */
  private cartOpen = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpen.asObservable();

  /** 目前正在編輯的購物車項目） */
  private editingItem = new BehaviorSubject<CartItem | null>(null);
  editingItem$ = this.editingItem.asObservable();

  /** 取得目前購物車 */
  get value(): CartItem[] {
    return this.cartItems.value;
  }

  /** 打開購物車 */
  openCart(): void {
    this.cartOpen.next(true);
  }

  /** 關閉購物車 */
  closeCart(): void {
    this.cartOpen.next(false);
  }

  /** 新增餐點 */
  addItem(item: CartItem): void {
    this.cartItems.next([...this.value, item]);
  }

  /** 更新購物車中的單筆餐點 */
  updateItem(updatedItem: CartItem): void {
    this.cartItems.next(
      this.value.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      )
    );
  }

  /** 移除 */
  removeItem(id: number): void {
    this.cartItems.next(this.value.filter(i => i.id !== id));
  }

  /** 更新數量 */
  updateQuantity(id: number, type: 'increase' | 'decrease'): void {
    const updated = this.value.map(item => {
      if (item.id !== id) return item;

      const quantity =
        type === 'increase'
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);

      return { ...item, quantity };
    });

    this.cartItems.next(updated);
  }

  /** 清空 */
  clear(): void {
    this.cartItems.next([]);
  }

  /** 計算數量 */
  getCount(): number {
    return this.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** 開始編輯指定餐點 */
  startEdit(item: CartItem): void {
    this.editingItem.next(item);
  }

  /** 清除編輯中的餐點 */
  clearEditing(): void {
    this.editingItem.next(null);
  }
}