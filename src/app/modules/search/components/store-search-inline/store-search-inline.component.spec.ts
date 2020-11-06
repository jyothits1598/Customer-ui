import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreSearchInlineComponent } from './store-search-inline.component';

describe('StoreSearchInlineComponent', () => {
  let component: StoreSearchInlineComponent;
  let fixture: ComponentFixture<StoreSearchInlineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreSearchInlineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreSearchInlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
