import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackingButtonComponent } from './tracking-button.component';

describe('TrackingButtonComponent', () => {
  let component: TrackingButtonComponent;
  let fixture: ComponentFixture<TrackingButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrackingButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackingButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
