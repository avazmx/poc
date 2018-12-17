import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; 

import { DistrictService } from './district.service';

describe('DistrictService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: DistrictService = TestBed.get(DistrictService);
    expect(service).toBeTruthy();
  });
});
