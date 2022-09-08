import { TestBed } from '@angular/core/testing';

import { CflService } from './cfl.service';

describe('CflService', () => {
  let service: CflService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CflService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
