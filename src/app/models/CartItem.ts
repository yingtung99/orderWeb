export interface CartItemOptionGroup {
  title: string;
  items: string[];
}

export interface CartItem {
  cartItemId: number;
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  summary?: string;
  optionGroups?: CartItemOptionGroup[];
}