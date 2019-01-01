import { TestBed } from '@angular/core/testing';

import { AccessLevelService } from './access-level.service';
import { HttpClientModule } from '@angular/common/http';

describe('AccessLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: AccessLevelService = TestBed.get(AccessLevelService);
    expect(service).toBeTruthy();
  });
});
