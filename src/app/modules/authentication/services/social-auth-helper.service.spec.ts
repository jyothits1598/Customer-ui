import { TestBed } from '@angular/core/testing';

import { SocialAuthHelperService } from './social-auth-helper.service';

describe('SocialAuthHelperService', () => {
  let service: SocialAuthHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocialAuthHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
