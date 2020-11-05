import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemDetailComponent } from './store-item-detail.component';

describe('StoreItemDetailComponent', () => {
  let component: StoreItemDetailComponent;
  let fixture: ComponentFixture<StoreItemDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreItemDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
