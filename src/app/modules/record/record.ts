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
  protected orders: Order[] = []; // 所有訂單資料
  protected openedOrderId: string | null = null; // 目前展開的訂單 ID

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    // 初始化時從 service 取得訂單
    this.orders = this.orderService.getOrders();
  }

  /** 切換訂單展開 / 收合 */
  protected toggleOrder(orderId: string): void {
    this.openedOrderId = this.openedOrderId === orderId ? null : orderId;
  }

  /** 將狀態代碼轉成顯示文字 */
  protected getStatusText(status: Order['status']): string {
    const map = {
      pending: '已送出',
      preparing: '製作中',
      completed: '已完成',
      cancelled: '已取消'
    };

    return map[status];
  }

  /** 格式化訂單時間（顯示用） */
  protected getOrderTime(date: string): string {
    return new Date(date).toLocaleString('zh-TW', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}
