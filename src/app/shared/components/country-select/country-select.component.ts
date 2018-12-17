import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'ups-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})

export class CountrySelectComponent implements OnInit, ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  public countries: Country[];
  public membersCounties: Country[];
  public selectedCountry: Country;
  public communitySubscription: Subscription;
  public selectedTab: number;
  constructor(private countryService: CountryService, private store: Store<Community>) { }

  ngOnInit() { }

  // AG Grid Initialize
  agInit(params: any) {
    debugger;
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };


    // Subscribe to the store in order to get the updated object for the countries.
    this.communitySubscription = this.store.select('community').subscribe((obj: Community) => {
      debugger;
      this.countries = [];
      if (obj.activeTab === 1) {
        // Get countries
        this.countryService.getCountries()
          .subscribe((countries: Country[]) => {
            this.countries = countries;
          }, (error: HttpErrorResponse) => {
            this.countries = this.countryService.getHardCodedCountries();
          });
      } else if (obj.activeTab === 2) {
        if (obj.geoServices && obj.geoServices.length > 0) {
          obj.geoServices.forEach(element => {
            this.countries.push(element.country);
          });
          console.log(this.countries);
        }
      }
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  // Country selection
  onCountryChange(selectedCountry: string) {
    if (+selectedCountry > 0) {
      this.selectedCountry = this.countries.filter(state => state.id === +selectedCountry)[0];
      this.countryService.setCountryId(+selectedCountry);
    }
  }

}
