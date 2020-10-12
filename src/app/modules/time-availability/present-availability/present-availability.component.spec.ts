import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentAvailabilityComponent } from './present-availability.component';

describe('PresentAvailabilityComponent', () => {
  let component: PresentAvailabilityComponent;
  let fixture: ComponentFixture<PresentAvailabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresentAvailabilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresentAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
