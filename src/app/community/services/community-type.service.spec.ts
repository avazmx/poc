import { TestBed } from '@angular/core/testing';

import { CommunityTypeService } from './community-type.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/reducers/app.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CommunityModule } from '../community.module';

describe('CommunityTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([]),
      HttpClientModule,
      CommunityModule
    ]
  }));

  it('should be created', () => {
    const service: CommunityTypeService = TestBed.get(CommunityTypeService);
    expect(service).toBeTruthy();
  });
});
