import { TestBed } from '@angular/core/testing';

import { GridBlowUpService } from './grid-blow-up.service';

describe('GridBlowUpService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GridBlowUpService = TestBed.get(GridBlowUpService);
    expect(service).toBeTruthy();
  });
});
