import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 

import { CommunityService } from './community.service';

describe('CommunityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule]
  }));

  it('should be created', () => {
    const service: CommunityService = TestBed.get(CommunityService);
    expect(service).toBeTruthy();
  });

  it('should have 1 or more community types results from the server', (done: DoneFn) => {
      const service: CommunityService = TestBed.get(CommunityService);
      service.getCommunityTypes().subscribe(value => {
      expect(value.length).toBeGreaterThan(0);
      done();
    });
  });
});
