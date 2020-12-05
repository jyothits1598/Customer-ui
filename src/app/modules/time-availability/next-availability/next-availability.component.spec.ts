import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NextAvailabilityComponent } from './next-availability.component';

describe('NextAvailabilityComponent', () => {
  let component: NextAvailabilityComponent;
  let fixture: ComponentFixture<NextAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NextAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NextAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
