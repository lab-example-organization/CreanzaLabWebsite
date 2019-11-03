import { TestBed } from '@angular/core/testing';

import { ParkerService } from './parker.service';

describe('ParkerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkerService = TestBed.get(ParkerService);
    expect(service).toBeTruthy();
  });
});
