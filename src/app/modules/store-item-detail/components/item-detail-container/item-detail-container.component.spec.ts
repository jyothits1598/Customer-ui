import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailContainerComponent } from './item-detail-container.component';

describe('ItemDetailContainerComponent', () => {
  let component: ItemDetailContainerComponent;
  let fixture: ComponentFixture<ItemDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemDetailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
