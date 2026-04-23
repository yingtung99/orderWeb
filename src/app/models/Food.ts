import { FoodCategory } from "./Enum";

export interface CategoryItem {
  name: string;
  category: FoodCategory;
  icon: string;
  icon_active: string;
}

export interface FoodItem {
  id: number;
  name: string;
  price: number;
  category: FoodCategory;
  image: string;
  category_icon: string;
  star?: number;
}

export interface SetOption {
  name: string;
  price: number;
}