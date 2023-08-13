import { TestBed } from '@angular/core/testing';

import { FormDataService } from './form-data.service';
import { FormBuilder } from '@angular/forms';

describe('FormDataService', () => {
  let service: FormDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FormBuilder],
    });
    service = TestBed.inject(FormDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
