import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AgGridModule } from 'ag-grid-angular';
import { ArchwizardModule } from 'angular-archwizard';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommunityRoutingModule } from './community-routing.module';
import {
  CommunityAttributesComponent,
} from './components/community-manager/community-attributes/community-attributes.component';
import {
  CommunityGovernanceComponent,
} from './components/community-manager/community-governance/community-governance.component';
import {
  MultiSelectComponent,
} from './components/community-manager/community-governance/multi-select/multi-select.component';
import {
  CommunityManageMembersComponent,
} from './components/community-manager/community-manage-members/community-manage-members.component';
import { CommunityManagerComponent } from './components/community-manager/community-manager.component';
import { CommunityEffects } from './store/effects/community-effects';
import { communityReducer } from './store/reducers/community-attributes.reducers';
import * as fromCommunity from './store/reducers/community-attributes.reducers';
import { CountrySelectComponent } from '../shared/components/country-select/country-select.component';
import { SharedModule } from '../shared/shared.module';
import { DistrictSelectComponent } from '../shared/components/district-select/district-select.component';
import { StateSelectComponent } from '../shared/components/state-select/state-select.component';
import { BusinessUnitSelectComponent } from '../shared/components/business-unit-select/business-unit-select.component';
import { MemberNameSelectComponent } from '../shared/components/member-name-select/member-name-select.component';
import { AccessLevelSelectComponent } from '../shared/components/access-level-select/access-level-select.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { CommunitySelectComponent } from '../shared/components/community-select/community-select.component';
import { ThreeDsComponent } from '../shared/components/three-ds/three-ds.component';
import { TwoDsComponent } from '../shared/components/two-ds/two-ds.component';
import { OneDaComponent } from '../shared/components/one-da/one-da.component';
import { GroundSelectComponent } from '../shared/components/ground-select/ground-select.component';

@NgModule({
  declarations: [
    CommunitiesComponent,
    CommunityManagerComponent,
    CommunityAttributesComponent,
    CommunityManageMembersComponent,
    CommunityGovernanceComponent,
    MultiSelectComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature('community', fromCommunity.communityReducer),
    EffectsModule.forFeature([CommunityEffects]),
    CommunityRoutingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    AngularFontAwesomeModule,
    AgGridModule.withComponents([
      CommunitySelectComponent,
      CountrySelectComponent,
      DistrictSelectComponent,
      StateSelectComponent,
      BusinessUnitSelectComponent,
      MemberNameSelectComponent,
      AccessLevelSelectComponent,
      ThreeDsComponent,
      TwoDsComponent,
      OneDaComponent,
      GroundSelectComponent
    ]),
  ],
  entryComponents: [
    CommunitySelectComponent,
    CountrySelectComponent,
    DistrictSelectComponent,
    StateSelectComponent,
    BusinessUnitSelectComponent,
    MemberNameSelectComponent,
    AccessLevelSelectComponent
  ]
})

export class CommunityModule { }
