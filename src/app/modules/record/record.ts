import { Component } from '@angular/core';
import { Order } from '../../models/Order';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-record',
  standalone: true,
  imports: [],
  templateUrl: './record.html',
  styleUrl: './record.scss',
})
export class Record {
  protected orders: Order[] = [];
  protected openedOrderId: string | null = null;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orders = this.orderService.getOrders();
  }

  protected toggleOrder(orderId: string): void {
    this.openedOrderId = this.openedOrderId === orderId ? null : orderId;
  }

  protected getStatusText(status: Order['status']): string {
    const map = {
      pending: '已送出',
      preparing: '製作中',
      completed: '已完成',
      cancelled: '已取消'
    };

    return map[status];
  }

  protected getOrderTime(date: string): string {
    return new Date(date).toLocaleString('zh-TW', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
