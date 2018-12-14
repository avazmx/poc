import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
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
import { CommunitySelectComponent } from './components/community-manager/community-select/community-select.component';
import { StoreModule } from '@ngrx/store';
import { communityAttributesReducer } from './store/reducers/community-attributes.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CommunityEffects } from './store/effects/community-effects';

@NgModule({
  declarations: [
    CommunityManagerComponent,
    CommunityAttributesComponent,
    CommunityManageMembersComponent,
    CommunityGovernanceComponent,
    CommunitySelectComponent,
    MultiSelectComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    AgGridModule.withComponents([
      CommunitySelectComponent
    ]),
    StoreModule.forFeature('communities', communityAttributesReducer),
    EffectsModule.forFeature([CommunityEffects]),
    AngularFontAwesomeModule,
  ],
  entryComponents: [CommunitySelectComponent]
})

export class CommunityModule { }
