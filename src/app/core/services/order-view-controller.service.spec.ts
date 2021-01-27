import { TestBed } from '@angular/core/testing';

import { OrderViewControllerService } from './order-view-controller.service';

describe('OrderViewControllerService', () => {
  let service: OrderViewControllerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderViewControllerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
