import { TestBed } from '@angular/core/testing';

import { MemberNameService } from './member-name.service';

describe('MemberNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberNameService = TestBed.get(MemberNameService);
    expect(service).toBeTruthy();
  });
});
