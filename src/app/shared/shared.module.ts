import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountrySelectComponent } from './components/country-select/country-select.component';
import { DistrictSelectComponent } from './components/district-select/district-select.component';
import { StateSelectComponent } from './components/state-select/state-select.component';

@NgModule({
  declarations: [
    CountrySelectComponent,
    DistrictSelectComponent,
    StateSelectComponent
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
