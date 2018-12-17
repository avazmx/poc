import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridModule } from 'ag-grid-angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { HttpAuthInterceptor } from '../../../../shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from '../../../../shared/interceptors/http-error-interceptor';

import { CommunityGovernanceComponent } from './community-governance.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import { CommunityEffects } from '../../../store/effects/community-effects';
import { communityReducer } from '../../../store/reducers/community-attributes.reducers';
import { reducers } from '../../../../store/reducers/app.reducers';

import { CommunitySelectComponent } from '../../../components/community-manager/community-select/community-select.component';
import { CountrySelectComponent } from '../../../../shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from '../../../../shared/components/district-select/district-select.component';
import { StateSelectComponent } from '../../../../shared/components/state-select/state-select.component';

describe('CommunityGovernanceComponent', () => {
  let component: CommunityGovernanceComponent;
  let fixture: ComponentFixture<CommunityGovernanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunityGovernanceComponent,
        MultiSelectComponent,
        CommunitySelectComponent,
        CountrySelectComponent,
        DistrictSelectComponent,
        StateSelectComponent
      ],
      imports: [
        AgGridModule.withComponents([
          CommunitySelectComponent,
          CountrySelectComponent,
          DistrictSelectComponent,
          StateSelectComponent
        ]),
        AngularFontAwesomeModule,
        HttpClientModule,
        StoreModule.forFeature('communityes', communityReducer),
        EffectsModule.forFeature([CommunityEffects]),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot([]),
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpAuthInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGovernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
