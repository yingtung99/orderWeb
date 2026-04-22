import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FoodDetailModal } from '../food-detail-modal/food-detail-modal';
import { CategoryItem, FoodItem } from '../../models/Food';
import { FoodCategory } from '../../models/Enum';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [FormsModule, FoodDetailModal],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {

  protected selectedCategory: string | null = null; // 選擇餐點類別
  protected searchKeyword: string = ''; // 搜尋關鍵字
  protected selectedFood: any = null; // 選擇食物

  // 商品類別列表
  protected categoryList: CategoryItem[] = [
    { name: '漢堡', category: FoodCategory.Burger, icon: 'assets/icons/burger.svg', icon_active: 'assets/icons/burger-active.svg' },
    { name: '炸雞', category: FoodCategory.Chicken, icon: 'assets/icons/chicken.svg', icon_active: 'assets/icons/chicken-active.svg' },
    { name: '炸物', category: FoodCategory.Fries, icon: 'assets/icons/fries.svg', icon_active: 'assets/icons/fries-active.svg' },
    { name: '披薩', category: FoodCategory.Pizza, icon: 'assets/icons/pizza.svg', icon_active: 'assets/icons/pizza-active.svg' },
    { name: '沙拉', category: FoodCategory.Salad, icon: 'assets/icons/salad.svg', icon_active: 'assets/icons/salad-active.svg' },
    { name: '飲料', category: FoodCategory.Drink, icon: 'assets/icons/drink.svg', icon_active: 'assets/icons/drink-active.svg' },
  ];

  // 熱銷餐點列表
  protected popularList: FoodItem[] = [
    { name: '雙層牛肉起司堡', price: 150, star: 4.9, category: FoodCategory.Burger, image: 'assets/images/double-beef-burger.png', category_icon: 'assets/icons/burger-category.svg' },
    { name: '美式臘腸披薩', price: 220, star: 4.8, category: FoodCategory.Pizza, image: 'assets/images/american-sausage-pizza.png', category_icon: 'assets/icons/pizza-category.svg'},
    { name: '香草雞肉沙拉', price: 130, star: 4.6, category: FoodCategory.Salad, image: 'assets/images/chicken-salad.png', category_icon: 'assets/icons/salad-category.svg' }
  ];

  // 餐點列表
  protected foodList: FoodItem[] = [
    { name: '勁辣雞腿堡', price: 110, category: FoodCategory.Burger, image: 'assets/images/chicken-burger.png', category_icon: 'assets/icons/burger.svg' },
    { name: '起司牛肉堡', price: 120, category: FoodCategory.Burger, image: 'assets/images/beef-burger.png', category_icon: 'assets/icons/burger.svg' },
    { name: '雙層牛肉起司堡', price: 150, category: FoodCategory.Burger, image: 'assets/images/double-beef-burger.png', category_icon: 'assets/icons/burger.svg' },
    { name: '香酥鱈魚堡', price: 130, category: FoodCategory.Burger, image: 'assets/images/fish-buger.png', category_icon: 'assets/icons/burger.svg' },

    { name: '蔬果沙拉', price: 100, category: FoodCategory.Salad, image: 'assets/images/salad.png', category_icon: 'assets/icons/salad.svg' },
    { name: '雞肉沙拉', price: 130, category: FoodCategory.Salad, image: 'assets/images/chicken-salad.png', category_icon: 'assets/icons/salad.svg'},

    { name: '雞肉披薩', price: 200, category: FoodCategory.Pizza, image: 'assets/images/chicken-pizza.png', category_icon: 'assets/icons/pizza.svg'},
    { name: '美式臘腸披薩', price: 220, category: FoodCategory.Pizza, image: 'assets/images/american-sausage-pizza.png', category_icon: 'assets/icons/pizza.svg'},
    { name: '牛肉起司披薩', price: 240, category: FoodCategory.Pizza, image: 'assets/images/beef-pizza.png', category_icon: 'assets/icons/pizza.svg'},
    { name: '培根起司披薩', price: 180, category: FoodCategory.Pizza, image: 'assets/images/bacon-pizza.png', category_icon: 'assets/icons/pizza.svg'},
    
    { name: '原味雞腿（2隻）', price: 100, category: FoodCategory.Chicken, image: 'assets/images/chicken.png', category_icon: 'assets/icons/chicken.svg'},
    { name: '辣味雞腿（2隻）', price: 100, category: FoodCategory.Chicken, image: 'assets/images/spicy-chicken.png', category_icon: 'assets/icons/chicken.svg'},
    { name: '雞翅（2隻）', price: 80, category: FoodCategory.Chicken, image: 'assets/images/chicken-wings.png', category_icon: 'assets/icons/chicken.svg'},
    { name: '小棒腿（3隻）', price: 60, category: FoodCategory.Chicken, image: 'assets/images/chicken-legs.png', category_icon: 'assets/icons/chicken.svg'},

    { name: '薯條', price: 50, category: FoodCategory.Fries, image: 'assets/images/fries.png', category_icon: 'assets/icons/fries.svg'},
    { name: '雞塊', price: 65, category: FoodCategory.Fries, image: 'assets/images/chicken-nuggets.png', category_icon: 'assets/icons/fries.svg'},

    { name: '可樂', price: 25, category: FoodCategory.Drink, image: 'assets/images/cola.png', category_icon: 'assets/icons/drink.svg' },
    { name: '雪碧', price: 25, category: FoodCategory.Drink, image: 'assets/images/sprite.png', category_icon: 'assets/icons/drink.svg' },
    { name: '七喜', price: 25, category: FoodCategory.Drink, image: 'assets/images/7up.png', category_icon: 'assets/icons/drink.svg' },
    { name: '芬達', price: 25, category: FoodCategory.Drink, image: 'assets/images/fanta.png', category_icon: 'assets/icons/drink.svg' },
    { name: '立頓紅茶', price: 25, category: FoodCategory.Drink, image: 'assets/images/lipton.png', category_icon: 'assets/icons/drink.svg' },
  ];

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
  protected closeDetail() {
    this.selectedFood = null;
  }
}
