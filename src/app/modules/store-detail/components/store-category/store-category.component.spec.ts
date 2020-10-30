import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCategoryComponent } from './store-category.component';

describe('StoreCategoryComponent', () => {
  let component: StoreCategoryComponent;
  let fixture: ComponentFixture<StoreCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
