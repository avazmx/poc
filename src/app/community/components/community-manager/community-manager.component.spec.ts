import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from 'ag-grid-angular';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'; 
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { communityReducer } from '../../store/reducers/community-attributes.reducers';
import { CommunityEffects } from '../../store/effects/community-effects';
import { reducers } from '../../../store/reducers/app.reducers';

import { ArchwizardModule } from 'angular-archwizard';

import { HttpAuthInterceptor } from '../../../shared/interceptors/http-auth-interceptor';
import { HttpErrorInterceptor } from '../../../shared/interceptors/http-error-interceptor';
import { CommunityManagerComponent } from './community-manager.component';
import { CommunityAttributesComponent } from './community-attributes/community-attributes.component';
import { CommunityManageMembersComponent } from './community-manage-members/community-manage-members.component';
import { CommunityGovernanceComponent } from './community-governance/community-governance.component';
import { MultiSelectComponent } from '../community-manager/community-governance/multi-select/multi-select.component';

import { CommunitySelectComponent } from '../../components/community-manager/community-select/community-select.component';
import { CountrySelectComponent } from '../../../shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from '../../../shared/components/district-select/district-select.component';
import { StateSelectComponent } from '../../../shared/components/state-select/state-select.component';

describe('CommunityManagerComponent', () => {
  let component: CommunityManagerComponent;
  let fixture: ComponentFixture<CommunityManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommunityManagerComponent,
        CommunityAttributesComponent,
        CommunityManageMembersComponent,
        CommunityGovernanceComponent,
        MultiSelectComponent,
        CommunitySelectComponent,
        CountrySelectComponent,
        DistrictSelectComponent,
        StateSelectComponent
      ],
      imports: [
        HttpClientModule,
        ArchwizardModule,
        FormsModule,
        ReactiveFormsModule,
        NgSelectModule,
        AgGridModule.withComponents([
          CommunitySelectComponent,
          CountrySelectComponent,
          DistrictSelectComponent,
          StateSelectComponent
        ]),
        AngularFontAwesomeModule,
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
    fixture = TestBed.createComponent(CommunityManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
