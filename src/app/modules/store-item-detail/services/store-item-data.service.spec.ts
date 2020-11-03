import { TestBed } from '@angular/core/testing';

import { StoreItemDataService } from './store-item-data.service';

describe('StoreItemDataService', () => {
  let service: StoreItemDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreItemDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
