import { TestBed } from '@angular/core/testing';

import { AvailibilityService } from './availibility.service';

describe('AvailibilityService', () => {
  let service: AvailibilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailibilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
