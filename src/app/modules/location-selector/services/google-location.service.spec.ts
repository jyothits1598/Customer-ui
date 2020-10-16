import { TestBed } from '@angular/core/testing';

import { GoogleLocationService } from './google-location.service';

describe('GoogleLocationService', () => {
  let service: GoogleLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleLocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
