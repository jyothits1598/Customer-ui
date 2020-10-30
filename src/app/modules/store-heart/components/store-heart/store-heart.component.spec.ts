import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreHeartComponent } from './store-heart.component';

describe('StoreHeartComponent', () => {
  let component: StoreHeartComponent;
  let fixture: ComponentFixture<StoreHeartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StoreHeartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreHeartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
