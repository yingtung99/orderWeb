import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryItem, FoodItem } from '../../models/Food';
import { FoodCategory } from '../../models/Enum';
import { CartItem } from '../../models/CartItem';
import { CartService } from '../../service/cart.service';
import { FoodDetailModal } from '../food-detail-modal/food-detail-modal';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, FoodDetailModal],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  protected editingCartItem: CartItem | null = null; // 當前正在編輯的購物車項目
  protected selectedCategory: string | null = null; // 選擇餐點類別
  protected searchKeyword: string = ''; // 搜尋關鍵字
  protected selectedFood: any = null; // 選擇食物

  // 商品類別列表
  protected categoryList: CategoryItem[] = [
    { name: '漢堡', category: FoodCategory.Burger, icon: 'assets/icons/burger.svg' },
    { name: '炸雞', category: FoodCategory.Chicken, icon: 'assets/icons/chicken.svg' },
    { name: '炸物', category: FoodCategory.Fries, icon: 'assets/icons/fries.svg' },
    { name: '披薩', category: FoodCategory.Pizza, icon: 'assets/icons/pizza.svg' },
    { name: '沙拉', category: FoodCategory.Salad, icon: 'assets/icons/salad.svg' },
    { name: '飲料', category: FoodCategory.Drink, icon: 'assets/icons/drink.svg' },
  ];

  // 熱銷餐點列表
  protected popularList: FoodItem[] = [
    { id: 1, name: '雙層牛肉起司堡', price: 150, star: 4.9, category: FoodCategory.Burger, image: 'assets/images/double-beef-burger.png', category_icon: 'assets/icons/burger.svg' },
    { id: 2, name: '美式臘腸披薩', price: 220, star: 4.8, category: FoodCategory.Pizza, image: 'assets/images/american-sausage-pizza.png', category_icon: 'assets/icons/pizza.svg' },
    { id: 3, name: '香草雞肉沙拉', price: 130, star: 4.6, category: FoodCategory.Salad, image: 'assets/images/chicken-salad.png', category_icon: 'assets/icons/salad.svg' }
  ];

  // 餐點列表
  protected foodList: FoodItem[] = [
    { id: 101, name: '勁辣雞腿堡', price: 110, category: FoodCategory.Burger, image: 'assets/images/chicken-burger.png', category_icon: 'assets/icons/burger.svg' },
    { id: 102, name: '起司牛肉堡', price: 120, category: FoodCategory.Burger, image: 'assets/images/beef-burger.png', category_icon: 'assets/icons/burger.svg' },
    { id: 103, name: '雙層牛肉起司堡', price: 150, category: FoodCategory.Burger, image: 'assets/images/double-beef-burger.png', category_icon: 'assets/icons/burger.svg' },
    { id: 104, name: '香酥鱈魚堡', price: 130, category: FoodCategory.Burger, image: 'assets/images/fish-buger.png', category_icon: 'assets/icons/burger.svg' },

    { id: 201, name: '蔬果沙拉', price: 100, category: FoodCategory.Salad, image: 'assets/images/salad.png', category_icon: 'assets/icons/salad.svg' },
    { id: 202, name: '雞肉沙拉', price: 130, category: FoodCategory.Salad, image: 'assets/images/chicken-salad.png', category_icon: 'assets/icons/salad.svg' },

    { id: 301, name: '雞肉披薩', price: 200, category: FoodCategory.Pizza, image: 'assets/images/chicken-pizza.png', category_icon: 'assets/icons/pizza.svg' },
    { id: 302, name: '美式臘腸披薩', price: 220, category: FoodCategory.Pizza, image: 'assets/images/american-sausage-pizza.png', category_icon: 'assets/icons/pizza.svg' },
    { id: 303, name: '牛肉起司披薩', price: 240, category: FoodCategory.Pizza, image: 'assets/images/beef-pizza.png', category_icon: 'assets/icons/pizza.svg' },
    { id: 304, name: '培根起司披薩', price: 180, category: FoodCategory.Pizza, image: 'assets/images/bacon-pizza.png', category_icon: 'assets/icons/pizza.svg' },

    { id: 401, name: '原味雞腿（2隻）', price: 100, category: FoodCategory.Chicken, image: 'assets/images/chicken.png', category_icon: 'assets/icons/chicken.svg' },
    { id: 402, name: '辣味雞腿（2隻）', price: 100, category: FoodCategory.Chicken, image: 'assets/images/spicy-chicken.png', category_icon: 'assets/icons/chicken.svg' },
    { id: 403, name: '雞翅（2隻）', price: 80, category: FoodCategory.Chicken, image: 'assets/images/chicken-wings.png', category_icon: 'assets/icons/chicken.svg' },
    { id: 404, name: '小棒腿（3隻）', price: 60, category: FoodCategory.Chicken, image: 'assets/images/chicken-legs.png', category_icon: 'assets/icons/chicken.svg' },

    { id: 501, name: '薯條', price: 50, category: FoodCategory.Fries, image: 'assets/images/fries.png', category_icon: 'assets/icons/fries.svg' },
    { id: 502, name: '雞塊', price: 65, category: FoodCategory.Fries, image: 'assets/images/chicken-nuggets.png', category_icon: 'assets/icons/fries.svg' },

    { id: 601, name: '可樂', price: 25, category: FoodCategory.Drink, image: 'assets/images/cola.png', category_icon: 'assets/icons/drink.svg' },
    { id: 602, name: '雪碧', price: 25, category: FoodCategory.Drink, image: 'assets/images/sprite.png', category_icon: 'assets/icons/drink.svg' },
    { id: 603, name: '七喜', price: 25, category: FoodCategory.Drink, image: 'assets/images/7up.png', category_icon: 'assets/icons/drink.svg' },
    { id: 604, name: '芬達', price: 25, category: FoodCategory.Drink, image: 'assets/images/fanta.png', category_icon: 'assets/icons/drink.svg' },
    { id: 605, name: '立頓紅茶', price: 25, category: FoodCategory.Drink, image: 'assets/images/lipton.png', category_icon: 'assets/icons/drink.svg' },
  ];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // 監聽編輯購物車項目，當使用者在購物車點修改時，會觸發這裡
    this.cartService.editingItem$.subscribe(item => {
      if (!item) return;

      const matchedFood = this.foodList.find(food => food.name === item.name)
        ?? this.popularList.find(food => food.name === item.name);

      if (!matchedFood) return;

      this.selectedFood = matchedFood;
      this.editingCartItem = item;
    });
  }
  
  /** 篩選後的食物列表 */
  get filteredFoodList() {
    let list = this.foodList;

    // 分類篩選
    if (this.selectedCategory) {
      list = list.filter(item => item.category === this.selectedCategory);
    }

    // 關鍵字搜尋
    if (this.searchKeyword.trim()) {
      list = list.filter(item =>
        item.name.includes(this.searchKeyword.trim())
      );
    }

    return list;
  }

  /** 點擊類別 */
  protected onClickCategory(category: string): void {
    this.selectedCategory = this.selectedCategory === category ? null : category;
  }

  /** 開啟詳細 */
  protected openDetail(item: FoodItem) {
    this.selectedFood = item;
  }

  /** 關閉詳細 */
  protected closeDetail(): void {
    this.selectedFood = null;
    this.editingCartItem = null;
    this.cartService.clearEditing();
  }

  /** 新增購物車 */
  protected onAddCart(item: CartItem): void {
    this.cartService.addItem(item);
    this.closeDetail();
  }

  /** 更新購物車 */
  protected onUpdateCart(item: CartItem): void {
    this.cartService.updateItem(item);
    this.closeDetail();
  }
}
