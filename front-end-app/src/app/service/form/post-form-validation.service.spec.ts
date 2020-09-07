import { TestBed } from '@angular/core/testing';

import { PostFormValidationService } from './post-form-validation.service';

describe('PostFormValidationService', () => {
  let service: PostFormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostFormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
