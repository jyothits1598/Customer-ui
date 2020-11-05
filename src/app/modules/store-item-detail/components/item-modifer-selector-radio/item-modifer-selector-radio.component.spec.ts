import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemModiferSelectorRadioComponent } from './item-modifer-selector-radio.component';

describe('ItemModiferSelectorRadioComponent', () => {
  let component: ItemModiferSelectorRadioComponent;
  let fixture: ComponentFixture<ItemModiferSelectorRadioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemModiferSelectorRadioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModiferSelectorRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
