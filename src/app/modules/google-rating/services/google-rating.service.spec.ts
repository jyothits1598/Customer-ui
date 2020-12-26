import { TestBed } from '@angular/core/testing';

import { GoogleRatingService } from './google-rating.service';

describe('GoogleRatingService', () => {
  let service: GoogleRatingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoogleRatingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
