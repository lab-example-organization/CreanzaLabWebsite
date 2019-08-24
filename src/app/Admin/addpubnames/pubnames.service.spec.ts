import { TestBed } from '@angular/core/testing';

import { PubnamesService } from './pubnames.service';

describe('PubnamesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PubnamesService = TestBed.get(PubnamesService);
    expect(service).toBeTruthy();
  });
});
