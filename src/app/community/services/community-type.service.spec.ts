import { TestBed } from '@angular/core/testing';

import { CommunityTypeService } from './community-type.service';

describe('CommunityTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunityTypeService = TestBed.get(CommunityTypeService);
    expect(service).toBeTruthy();
  });
});
