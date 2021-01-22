import { TestBed } from '@angular/core/testing';

import { SubscribedstratService } from './subscribedstrat.service';

describe('SubscribedstratService', () => {
  let service: SubscribedstratService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscribedstratService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
