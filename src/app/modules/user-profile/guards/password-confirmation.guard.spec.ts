import { TestBed } from '@angular/core/testing';

import { PasswordConfirmationGuard } from './password-confirmation.guard';

describe('PasswordConfirmationGuard', () => {
  let guard: PasswordConfirmationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasswordConfirmationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
