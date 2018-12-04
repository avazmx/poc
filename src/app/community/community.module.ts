import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityManagerComponent } from './components/community-manager/community-manager.component';
import { ArchwizardModule } from 'angular-archwizard';
import { CommunityAttributesComponent } from './components/community-attributes/community-attributes.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [CommunityManagerComponent, CommunityAttributesComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule,
    ArchwizardModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule
  ]
})
export class CommunityModule { }
