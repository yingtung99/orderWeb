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

    const fullId = `ORD${Date.now()}`; // 系統ID

    // 取後 6 碼當顯示用
    const displayId = fullId.slice(-6);

    const orders = this.getOrders();

    const order: Order = {
      id: fullId,             // 系統用
      displayId,              // 顯示用（短ID）
      createdAt: now.toISOString(),
      items,
      totalPrice: items.reduce((s, i) => s + i.price * i.quantity, 0),
      status: 'pending'
    };

    localStorage.setItem(this.storageKey, JSON.stringify([order, ...orders]));

    return order;
  }
}