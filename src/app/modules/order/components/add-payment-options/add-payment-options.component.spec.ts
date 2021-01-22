import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentOptionsComponent } from './add-payment-options.component';

describe('AddPaymentOptionsComponent', () => {
  let component: AddPaymentOptionsComponent;
  let fixture: ComponentFixture<AddPaymentOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPaymentOptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
