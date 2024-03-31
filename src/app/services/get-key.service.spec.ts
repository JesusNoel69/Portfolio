import { TestBed } from '@angular/core/testing';

import { GetKeyService } from './get-key.service';

describe('GetKeyService', () => {
  let service: GetKeyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetKeyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
