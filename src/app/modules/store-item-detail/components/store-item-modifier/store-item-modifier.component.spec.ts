import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreItemModifierComponent } from './store-item-modifier.component';

describe('StoreItemModifierComponent', () => {
  let component: StoreItemModifierComponent;
  let fixture: ComponentFixture<StoreItemModifierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreItemModifierComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreItemModifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
