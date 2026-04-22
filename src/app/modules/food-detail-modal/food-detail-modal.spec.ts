import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoodDetailModal } from './food-detail-modal';

describe('FoodDetailModal', () => {
  let component: FoodDetailModal;
  let fixture: ComponentFixture<FoodDetailModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FoodDetailModal],
    }).compileComponents();

    fixture = TestBed.createComponent(FoodDetailModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
