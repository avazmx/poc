import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import { GeoService } from 'src/app/community/models/geo-services.model';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import { Subscription } from 'rxjs';

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
  public membersCounties: Country[] = [];
  public selectedCountry: Country;
  communitySubscription: Subscription;
  constructor(private countryService: CountryService, private store: Store<Community>) { }

  ngOnInit() {
    // Get countries
    this.countryService.getCountries()
      .subscribe((countries: Country[]) => {
        this.countries = countries;

      }, (error: HttpErrorResponse) => {
        console.log('Error trying to load the coutries list, I will load hardcoded data');
        this.countries = this.countryService.getHardCodedCountries();
      });
  }

  // AG Grid Initialize
  agInit(params: any) {
    // debugger;
    const nodes = params.api.getSelectedNodes();
    const selectedData: GeoService[] = params.api.getSelectedNodes().map(node => node.data);
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };

    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      if (obj.GeoService.countries && obj.GeoService.length > 0) {
        obj.GeoService.forEach(element => {
          this.membersCounties.push(element.country);
        });
      }
    });

  }

  // AG Grid reload
  refresh(params: any): boolean {
    // debugger;
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
