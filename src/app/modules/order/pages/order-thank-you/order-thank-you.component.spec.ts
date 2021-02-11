import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderThankYouComponent } from './order-thank-you.component';

describe('OrderThankYouComponent', () => {
  let component: OrderThankYouComponent;
  let fixture: ComponentFixture<OrderThankYouComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderThankYouComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderThankYouComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
