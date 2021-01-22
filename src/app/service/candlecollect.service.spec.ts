import { TestBed } from '@angular/core/testing';

import { CandlecollectService } from './candlecollect.service';

describe('CandlecollectService', () => {
  let service: CandlecollectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandlecollectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
