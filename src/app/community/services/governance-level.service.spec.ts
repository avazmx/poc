import { TestBed } from '@angular/core/testing';

import { GovernanceLevelService } from './governance-level.service';
import { CommunityModule } from '../community.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/reducers/app.reducers';

describe('GovernanceLevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([]),
      HttpClientModule,
      CommunityModule
    ]
  }));

  it('should be created', () => {
    const service: GovernanceLevelService = TestBed.get(GovernanceLevelService);
    expect(service).toBeTruthy();
  });
});
