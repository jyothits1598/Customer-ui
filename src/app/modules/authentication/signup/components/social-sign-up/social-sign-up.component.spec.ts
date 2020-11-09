import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSignUpComponent } from './social-sign-up.component';

describe('SocialSignUpComponent', () => {
  let component: SocialSignUpComponent;
  let fixture: ComponentFixture<SocialSignUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialSignUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
