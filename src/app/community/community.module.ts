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
import { CommunitySelectComponent } from './components/community-manager/community-select/community-select.component';
import { CommunityEffects } from './store/effects/community-effects';
import { communityReducer } from './store/reducers/community-attributes.reducers';

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
    StoreModule.forFeature('communityes', communityReducer),
    // EffectsModule.forFeature([CommunityEffects]),
    CommunityRoutingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    AgGridModule.withComponents([
      CommunitySelectComponent
    ]),
    AngularFontAwesomeModule,
  ],
  entryComponents: [CommunitySelectComponent]
})

export class CommunityModule { }
