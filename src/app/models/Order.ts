import { CartItem } from "./CartItem";

export type OrderStatus = 'pending' | 'preparing' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  totalPrice: number;
  status: OrderStatus;
}