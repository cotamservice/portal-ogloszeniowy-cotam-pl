import { TestBed } from '@angular/core/testing';

import { GusService } from './gus.service';

describe('NipService', () => {
  let service: GusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
