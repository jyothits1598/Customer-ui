import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreDetailsBarComponent } from './store-details-bar.component';

describe('StoreDetailsBarComponent', () => {
  let component: StoreDetailsBarComponent;
  let fixture: ComponentFixture<StoreDetailsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreDetailsBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreDetailsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
