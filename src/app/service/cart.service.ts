import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly storageKey = 'cartItems';

  /** 購物車資料（初始化就從 localStorage 讀） */
  private cartItems = new BehaviorSubject<CartItem[]>(this.loadCartItems());
  cartItems$ = this.cartItems.asObservable();

  /** 控制購物車側邊欄開關狀態 */
  private cartOpen = new BehaviorSubject<boolean>(false);
  cartOpen$ = this.cartOpen.asObservable();

  /** 目前正在編輯的購物車項目 */
  private editingItem = new BehaviorSubject<CartItem | null>(null);
  editingItem$ = this.editingItem.asObservable();

  /** 取得目前購物車 */
  get value(): CartItem[] {
    return this.cartItems.value;
  }

  /** localStorage 處理 */
  /** 讀取 localStorage */
  private loadCartItems(): CartItem[] {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  }

  /** 寫入 localStorage */
  private saveCartItems(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  /** 統一更新（一定要走這裡） */
  private setCartItems(items: CartItem[]): void {
    this.cartItems.next(items);
    this.saveCartItems(items);
  }

  /** UI 控制 */
  openCart(): void {
    this.cartOpen.next(true);
  }

  closeCart(): void {
    this.cartOpen.next(false);
  }

  /** 購物車操作 */
  /** 新增餐點 */
  addItem(newItem: CartItem): void {
    const matchedItem = this.value.find(item =>
      this.isSameCartItem(item, newItem)
    );

    if (matchedItem) {
      this.setCartItems(
        this.value.map(item =>
          item.cartItemId === matchedItem.cartItemId
            ? {
                ...item,
                quantity: item.quantity + newItem.quantity,
              }
            : item
        )
      );

      return;
    }

    this.setCartItems([...this.value, newItem]);
  }

  /** 更新單筆 */
  updateItem(updatedItem: CartItem): void {
    const otherItems = this.value.filter(
      item => item.cartItemId !== updatedItem.cartItemId
    );

    const matchedItem = otherItems.find(item =>
      this.isSameCartItem(item, updatedItem)
    );

    if (matchedItem) {
      this.setCartItems(
        otherItems.map(item =>
          item.cartItemId === matchedItem.cartItemId
            ? {
                ...item,
                quantity: item.quantity + updatedItem.quantity,
              }
            : item
        )
      );

      return;
    }

    this.setCartItems(
      this.value.map(item =>
        item.cartItemId === updatedItem.cartItemId ? updatedItem : item
      )
    );
  }

  /** 移除 */
  removeItem(cartItemId: number): void {
    this.setCartItems(
      this.value.filter(item => item.cartItemId !== cartItemId)
    );
  }

  /** 更新數量 */
  updateQuantity(cartItemId: number, type: 'increase' | 'decrease'): void {
    const updated = this.value.map(item => {
      if (item.cartItemId !== cartItemId) return item;

      const quantity =
        type === 'increase'
          ? item.quantity + 1
          : Math.max(1, item.quantity - 1);

      return { ...item, quantity };
    });

    this.setCartItems(updated);
  }

  /** 清空 */
  clear(): void {
    this.setCartItems([]);
  }

  /** 計算總數量 */
  getCount(): number {
    return this.value.reduce((sum, item) => sum + item.quantity, 0);
  }

  /** 編輯功能 */
  startEdit(item: CartItem): void {
    this.editingItem.next(item);
  }

  /** 清除目前編輯中的購物車項目，重置為新增模式 */
  clearEditing(): void {
    this.editingItem.next(null);
  }

  /** 產生餐點內容比對用 key */
  private getCartItemKey(item: CartItem): string {
    const optionGroups = (item.optionGroups ?? []).map(group => ({
      title: group.title,
      items: [...group.items].sort(),
    }));

    optionGroups.sort((a, b) => a.title.localeCompare(b.title));

    return JSON.stringify({
      id: item.id,
      summary: item.summary ?? '',
      optionGroups,
    });
  }

  /** 判斷兩筆餐點內容是否完全相同 */
  private isSameCartItem(a: CartItem, b: CartItem): boolean {
    return this.getCartItemKey(a) === this.getCartItemKey(b);
  }
}