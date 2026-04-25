import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly storageKey = 'orders'; // localStorage key

  /** 取得所有訂單 */
  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  /** 建立新訂單 */
  createOrder(items: CartItem[]): Order {
    const now = new Date();

    // 產生日期字串（例：20250425）
    const datePart = now.toISOString().slice(0, 10).replace(/-/g, '');

    const orders = this.getOrders();

    // 計算「今天」已有幾筆訂單
    const todayOrders = orders.filter(o =>
      o.displayId?.startsWith(datePart)
    );

    // 產生當天序號（001, 002...）
    const seq = String(todayOrders.length + 1).padStart(3, '0');

    const order: Order = {
      id: `ORD${Date.now()}`,                // 系統用 ID（唯一）
      displayId: `${datePart}-${seq}`,       // 顯示用 ID（給使用者看）
      createdAt: now.toISOString(),          // 建立時間
      items,                                 // 訂單餐點
      totalPrice: items.reduce((s, i) => s + i.price * i.quantity, 0), // 總金額
      status: 'pending'                      // 初始狀態
    };

    // 存入 localStorage（新訂單放最前面）
    localStorage.setItem(this.storageKey, JSON.stringify([order, ...orders]));

    return order;
  }
}