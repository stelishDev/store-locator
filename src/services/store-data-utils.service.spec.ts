import { TestBed } from '@angular/core/testing';

import { StoreDataUtilsService } from './store-data-utils.service';

describe('StoreDataUtilsService', () => {
  let service: StoreDataUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreDataUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
