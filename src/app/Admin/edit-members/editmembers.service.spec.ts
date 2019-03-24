import { TestBed } from '@angular/core/testing';

import { EditmembersService } from './editmembers.service';

describe('EditmembersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditmembersService = TestBed.get(EditmembersService);
    expect(service).toBeTruthy();
  });
});
