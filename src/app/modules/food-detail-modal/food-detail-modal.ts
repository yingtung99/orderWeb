import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FoodItem, SetOption } from '../../models/Food';
import { FoodCategory } from '../../models/Enum';

@Component({
  selector: 'app-food-detail-modal',
  imports: [],
  templateUrl: './food-detail-modal.html',
  styleUrl: './food-detail-modal.scss',
})
export class FoodDetailModal {
  @Input() food!: FoodItem; // 目前選取的餐點資料
  @Output() close = new EventEmitter<void>(); // 關閉 modal 事件

  @ViewChild('pizzaSection') pizzaSection!: ElementRef;
  @ViewChild('saladSection') saladSection!: ElementRef;

  protected readonly EnumFoodCategory = FoodCategory; // 類別Enum
  protected showValidationError = false; // 是否顯示驗證錯誤

  protected quantity = 1; // 餐點數量
  protected needKetchup = false; // 是否需要番茄醬
  protected selectedSet: string | null = null; // 已選套餐
  protected selectedDrink: string | null = null; // 已選飲料
  protected selectedCustomOptions: string[] = []; // 已選客製化項目（複選）
  protected selectedCrust: string | null = null; // 已選餅皮
  protected selectedSaladSauce: string | null = null; // 已選沙拉醬料
  protected selectedSaladProteins: string[] = []; // 已選沙拉主食（複選）
  protected selectedSaladVeggies: string[] = []; // 已選沙拉蔬菜（複選）

  // 套餐選項
  setOptions: SetOption[] = [
    { name: 'A 套餐（薯條 + 飲料）', price: 70 },
    { name: 'B 套餐（雞塊 + 飲料）', price: 85 },
  ];

  // 飲料選項
  drinkOptions: SetOption[] = [
    { name: '可樂', price: 0 },
    { name: '雪碧', price: 0 },
    { name: '七喜', price: 0 },
    { name: '芬達', price: 0 },
    { name: '立頓紅茶', price: 0 },
  ];

  // 漢堡客製化選項
  customOptions: SetOption[] = [
    { name: '去醬', price: 0 },
    { name: '去生菜', price: 0 },
    { name: '去番茄', price: 0 },
    { name: '加蛋', price: 10 },
    { name: '加起司', price: 10 },
  ];

  // 披薩餅皮選項
  crustOptions: SetOption[] = [
    { name: '薄脆餅皮', price: 0 },
    { name: '厚片餅皮', price: 0 },
    { name: '芝心餅皮', price: 30 },
  ];

  // 沙拉醬料選項
  saladSauceOptions: SetOption[] = [
    { name: '凱薩醬', price: 0 },
    { name: '和風醬', price: 0 },
    { name: '胡麻醬', price: 0 },
    { name: '油醋', price: 0 },
  ];

  // 沙拉主食選項
  saladProteinOptions: SetOption[] = [
    { name: '香草雞肉', price: 30 },
    { name: '水煮蛋', price: 20 },
  ];

  // 沙拉蔬菜選項
  saladVeggieOptions: SetOption[] = [
    { name: '小黃瓜', price: 10 },
    { name: '玉米', price: 10 },
    { name: '紫高麗菜', price: 10 },
    { name: '青木瓜', price: 15 },
    { name: '地瓜泥', price: 15 },
    { name: '堅果麥片', price: 15 },
  ];

  /** 判斷目前餐點是否為指定類別 */
  protected isCategory(category: FoodCategory): boolean {
    return this.food?.category === category;
  }

  /** 是否顯示套餐飲料區塊（選擇套餐後才顯示） */
  get showDrinkSection(): boolean {
    return this.selectedSet !== null;
  }

  /** 計算飲料金額：套餐內飲料免費，炸物加購飲料 +25 */
  get selectedDrinkPrice(): number {
    if (!this.selectedDrink) return 0;
    return this.isCategory(FoodCategory.Fries) ? 25 : 0;
  }

  /** 計算已選套餐價格（未選則為 0） */
  get selectedSetPrice(): number {
    const matched = this.setOptions.find(item => item.name === this.selectedSet);
    return matched ? matched.price : 0;
  }

  /** 計算客製化加價總和（複選項目累加） */
  get selectedCustomPrice(): number {
    return this.customOptions
      .filter(item => this.selectedCustomOptions.includes(item.name))
      .reduce((sum, item) => sum + item.price, 0);
  }

  /** 計算餅皮加價（Pizza 專用，單選） */
  get selectedCrustPrice(): number {
    const found = this.crustOptions.find(c => c.name === this.selectedCrust);
    return found ? found.price ?? 0 : 0;
  }

  /** 計算沙拉主食加購金額（複選累加） */
  get selectedSaladProteinPrice(): number {
    return this.saladProteinOptions
      .filter(item => this.selectedSaladProteins.includes(item.name))
      .reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  /** 計算沙拉蔬菜加購金額（複選累加） */
  get selectedSaladVeggiePrice(): number {
    return this.saladVeggieOptions
      .filter(item => this.selectedSaladVeggies.includes(item.name))
      .reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  /** 計算總金額（基礎價格 + 所有加購項目，再乘數量） */
  get totalPrice(): number {
    const basePrice = this.food?.price ?? 0;

    return (
      basePrice +
      this.selectedSetPrice +
      this.selectedCustomPrice +
      this.selectedDrinkPrice +
      this.selectedCrustPrice +
      this.selectedSaladProteinPrice +
      this.selectedSaladVeggiePrice
    ) * this.quantity;
  }

  /** 是否通過必選檢查 */
  get isValidSelection(): boolean {
    // 披薩 → 必選餅皮
    if (this.isCategory(FoodCategory.Pizza) && !this.selectedCrust) {
      return false;
    }

    // 沙拉 → 必選醬料
    if (this.isCategory(FoodCategory.Salad) && !this.selectedSaladSauce) {
      return false;
    }

    return true;
  }
  
  /** 取得分類圖示（統一轉為 *-category.svg，若已是則直接使用） */
  protected getCategoryDetailIcon(): string {
    const icon = this.food?.category_icon ?? '';

    if (!icon) return '';

    return icon.includes('-category.svg')
      ? icon
      : icon.replace('.svg', '-category.svg');
  }

  /** 減少餐點數量（最少為 1） */
  protected decreaseQty(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  /** 增加餐點數量 */
  protected increaseQty(): void {
    this.quantity++;
  }

  /** 選擇套餐（單選，可取消；切換時重置已選飲料） */
  protected selectSet(name: string): void {
    if (this.selectedSet === name) {
      this.selectedSet = null;
      this.selectedDrink = null;
      return;
    }

    this.selectedSet = name;
    this.selectedDrink = null;
  }

  /** 選擇飲料（單選，可取消） */
  protected selectDrink(name: string): void {
    if (this.selectedDrink === name) {
      this.selectedDrink = null;
      return;
    }

    this.selectedDrink = name;
  }

  /** 選擇餅皮（Pizza 專用，單選，可取消） */
  protected selectCrust(name: string): void {
    if (this.selectedCrust === name) {
      this.selectedCrust = null;
      return;
    }

    this.selectedCrust = name;
  }

  /** 選擇沙拉醬料（單選，可取消） */
  protected selectSaladSauce(name: string): void {
    if (this.selectedSaladSauce === name) {
      this.selectedSaladSauce = null;
      return;
    }

    this.selectedSaladSauce = name;
  }

  /** 切換番茄醬需求（單一布林開關） */
  protected toggleKetchup(): void {
    this.needKetchup = !this.needKetchup;
  }

  /** 切換沙拉主食（複選：加入或移除） */
  protected toggleSaladProtein(name: string): void {
    if (this.selectedSaladProteins.includes(name)) {
      this.selectedSaladProteins = this.selectedSaladProteins.filter(item => item !== name);
      return;
    }

    this.selectedSaladProteins = [...this.selectedSaladProteins, name];
  }

  /** 切換沙拉蔬菜（複選：加入或移除） */
  protected toggleSaladVeggie(name: string): void {
    if (this.selectedSaladVeggies.includes(name)) {
      this.selectedSaladVeggies = this.selectedSaladVeggies.filter(item => item !== name);
      return;
    }

    this.selectedSaladVeggies = [...this.selectedSaladVeggies, name];
  }

  /** 切換客製化選項（複選：加入或移除） */
  protected toggleCustomOption(name: string): void {
    if (this.selectedCustomOptions.includes(name)) {
      this.selectedCustomOptions = this.selectedCustomOptions.filter(item => item !== name);
      return;
    }

    this.selectedCustomOptions = [...this.selectedCustomOptions, name];
  }

  /** 判斷某個客製化選項是否已被選取（用於 UI 顯示） */
  protected isCustomOptionSelected(name: string): boolean {
    return this.selectedCustomOptions.includes(name);
  }

  /** 滾動到第一個未通過必選驗證的區塊（披薩餅皮 / 沙拉醬料） */
  protected scrollToError(): void {
    // 披薩：未選餅皮 → 捲動到餅皮區塊
    if (this.isCategory(FoodCategory.Pizza) && !this.selectedCrust) {
      this.pizzaSection?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
      return;
    }

    // 沙拉：未選醬料 → 捲動到醬料區塊
    if (this.isCategory(FoodCategory.Salad) && !this.selectedSaladSauce) {
      this.saladSection?.nativeElement.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }

  /** 點擊加入購物車：先進行必選驗證，未通過則顯示錯誤並捲動到對應區塊 */
  protected onAddCart(): void {
    // 開啟驗證狀態（顯示紅框 / 錯誤訊息）
    this.showValidationError = true;

    // 未通過驗證 → 捲動到錯誤位置並中止流程
    if (!this.isValidSelection) {
      this.scrollToError();
      return;
    }

    // 通過驗證 → 執行加入購物車邏輯
    console.log('加入購物車');
  }
}
