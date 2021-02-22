import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleRatingComponent } from './google-rating.component';

describe('GoogleRatingComponent', () => {
  let component: GoogleRatingComponent;
  let fixture: ComponentFixture<GoogleRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoogleRatingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
