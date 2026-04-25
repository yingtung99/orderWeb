import { CartItem } from "./CartItem";

export type OrderStatus = 'pending' | 'preparing' | 'completed' | 'cancelled';

export interface Order {
  id: string;          // 系統用
  displayId: string;   // 畫面用
  createdAt: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
}