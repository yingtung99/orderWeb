import { Injectable } from '@angular/core';
import { CartItem } from '../models/CartItem';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private readonly storageKey = 'orders';

  getOrders(): Order[] {
    return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  createOrder(items: CartItem[]): Order {
    const totalPrice = items.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const order: Order = {
      id: `ORD${Date.now()}`,
      createdAt: new Date().toISOString(),
      items,
      totalPrice,
      status: 'pending'
    };

    const orders = this.getOrders();
    orders.unshift(order);

    localStorage.setItem(this.storageKey, JSON.stringify(orders));

    return order;
  }
}