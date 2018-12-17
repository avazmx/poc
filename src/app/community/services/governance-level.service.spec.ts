import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 

import { GovernanceService } from './governance-level.service';

describe('GovernanceLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: GovernanceService = TestBed.get(GovernanceService);
    expect(service).toBeTruthy();
  });
});
