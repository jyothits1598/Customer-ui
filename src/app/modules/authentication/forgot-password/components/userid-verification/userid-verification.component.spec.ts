import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseridVerificationComponent } from './userid-verification.component';

describe('UseridVerificationComponent', () => {
  let component: UseridVerificationComponent;
  let fixture: ComponentFixture<UseridVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseridVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UseridVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
