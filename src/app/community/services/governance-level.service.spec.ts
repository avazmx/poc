import { TestBed } from '@angular/core/testing';

import { GovernanceLevelService } from './governance-level.service';

describe('GovernanceLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GovernanceLevelService = TestBed.get(GovernanceLevelService);
    expect(service).toBeTruthy();
  });
});
