import { TestBed } from '@angular/core/testing';

import { MapkaService } from './mapka.service';

describe('MapkaService', () => {
  let service: MapkaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapkaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
