import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityManagerComponent } from './components/community-manager/community-manager.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CommunityAttributesComponent } from './components/community-manager/community-attributes/community-attributes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { AgGridModule } from 'ag-grid-angular';
import { ManageMembersComponent } from './components/community-manager/manage-members/manage-members.component';
import { CommunityGovernanceComponent } from './components/community-manager/community-governance/community-governance.component';

@NgModule({
  declarations: [
    CommunityManagerComponent,
    CommunityAttributesComponent,
    ManageMembersComponent,
    CommunityGovernanceComponent
  ],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    AgGridModule.withComponents([])
  ]
})

export class CommunityModule { }
