import { TestBed } from '@angular/core/testing';

import { StoresDataService } from './stores-data.service';

describe('StoresDataService', () => {
  let service: StoresDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoresDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
