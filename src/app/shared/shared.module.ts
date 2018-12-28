import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { DistrictSelectComponent } from './components/district-select/district-select.component';
import { StateSelectComponent } from './components/state-select/state-select.component';
import { MemberNameSelectComponent } from './components/member-name-select/member-name-select.component';
import { AccessLevelSelectComponent } from './components/access-level-select/access-level-select.component';
import { BusinessUnitSelectComponent } from './components/business-unit-select/business-unit-select.component';
import { FormsModule } from '@angular/forms';
import { CommunitySelectComponent } from './components/community-select/community-select.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { GroundSelectComponent } from './components/ground-select/ground-select.component';
import { ThreeDsComponent } from './components/three-ds/three-ds.component';
import { TwoDsComponent } from './components/two-ds/two-ds.component';
import { OneDaComponent } from './components/one-da/one-da.component';

@NgModule({
  declarations: [
    CountrySelectComponent,
    DistrictSelectComponent,
    StateSelectComponent,
    MemberNameSelectComponent,
    AccessLevelSelectComponent,
    BusinessUnitSelectComponent,
    CommunitySelectComponent,
    GroundSelectComponent,
    ThreeDsComponent,
    TwoDsComponent,
    OneDaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    AngularFontAwesomeModule,
  ],
  exports: [
    CountrySelectComponent,
    DistrictSelectComponent,
    StateSelectComponent,
    MemberNameSelectComponent,
    AccessLevelSelectComponent,
    BusinessUnitSelectComponent,
    CommunitySelectComponent,
    ThreeDsComponent,
    TwoDsComponent,
    OneDaComponent,
    GroundSelectComponent
  ]
})
export class SharedModule { }
