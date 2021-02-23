import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GRatingStarsComponent } from './g-rating-stars.component';

describe('GRatingStarsComponent', () => {
  let component: GRatingStarsComponent;
  let fixture: ComponentFixture<GRatingStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GRatingStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GRatingStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
