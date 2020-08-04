import { TestBed } from '@angular/core/testing';

import { RegistrationFormValidationService } from './registration-form-validation.service';

describe('RegistrationFormValidationService', () => {
  let service: RegistrationFormValidationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationFormValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
