import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailMobSignupComponent } from './email-mob-signup.component';

describe('EmailMobSignupComponent', () => {
  let component: EmailMobSignupComponent;
  let fixture: ComponentFixture<EmailMobSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailMobSignupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailMobSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
