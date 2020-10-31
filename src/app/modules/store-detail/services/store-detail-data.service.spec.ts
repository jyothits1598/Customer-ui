import { TestBed } from '@angular/core/testing';

import { StoreDetailDataService } from './store-detail-data.service';

describe('StoreDetailDataService', () => {
  let service: StoreDetailDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDetailDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
