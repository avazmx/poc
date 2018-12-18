import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { DistrictSelectComponent } from './components/district-select/district-select.component';
import { StateSelectComponent } from './components/state-select/state-select.component';
import { MemberNameSelectComponent } from './components/member-name-select/member-name-select.component';
import { AccessLevelSelectComponent } from './components/access-level-select/access-level-select.component';
import { BusinessUnitSelectComponent } from './components/business-unit-select/business-unit-select.component';

@NgModule({
  declarations: [
    CountrySelectComponent,
    DistrictSelectComponent,
    StateSelectComponent,
    MemberNameSelectComponent,
    AccessLevelSelectComponent,
    BusinessUnitSelectComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    CountrySelectComponent,
    DistrictSelectComponent,
    StateSelectComponent
  ]
})
export class SharedModule { }
