import { TestBed } from '@angular/core/testing';

import { CommunityService } from './community.service';
import { CommunityModule } from '../community.module';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers } from 'src/app/store/reducers/app.reducers';

describe('CommunityService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      StoreModule.forRoot(reducers),
      EffectsModule.forRoot([]),
      HttpClientModule,
      CommunityModule
    ]
  }));

  it('should be created', () => {
    const service: CommunityService = TestBed.get(CommunityService);
    expect(service).toBeTruthy();
  });
});
