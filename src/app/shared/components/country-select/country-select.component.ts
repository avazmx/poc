import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import * as communityActions from '../../../community/store/actions/community-attributes.actions';
import { CommunityService } from 'src/app/community/services/community.service';


@Component({
  selector: 'ups-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})

export class CountrySelectComponent implements ICellRendererAngularComp, OnInit {
  public altData;
  public params: any;
  public cell: any;
  public countries: Country[] = [];
  public membersCounties: Country[];
  public selectedCountry: Country;
  public communitySubscription: Subscription;
  public selectedTab: number;
  public currentRow: number;
  public communityObject: Community;

  constructor(private countryService: CountryService, private store: Store<Community>, private coommunityService:CommunityService) { }

  ngOnInit() {
    this.currentRow = +this.params.node.id;
  }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };

    // this.currentRow = +this.params.node.id;
    // Subscribe to the store in order to get the updated object for the countries.
    this.store.select('community').subscribe((obj: Community) => {
      this.communityObject = obj;
      if (obj.activeTab === 1 && this.countries.length === 0) {
        // Get countries
        this.fetchCountries();
      } else if (obj.activeTab === 2 && this.countries.length === 0) {
        if (obj.geoServices && obj.geoServices.length > 0) {
          obj.geoServices.forEach(element => {
            const added = this.countries.filter(c =>
              c.id === element.country.id
            );
            if (added.length === 0) {
              this.countries.push(element.country);
            }
          });
        } else {
          this.fetchCountries();
        }
      }
    });
  }

  fetchCountries() {
    this.countryService.getCountries()
      .subscribe((countries: Country[]) => {
        this.countries = countries;
      }, (error: HttpErrorResponse) => {
        this.countries = this.countryService.getHardCodedCountries();
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
      //this.coommunityService.setCountryValid(true);
      this.selectedCountry = this.countries.filter(state => state.id === +selectedCountry)[0];
      this.countryService.setCountryId(+selectedCountry);
    }
  }

  /*onCountryChange(selectedBusinessUnit: string) {
    this.selectedBusinessUnit = selectedBusinessUnit;
    this.gridColumnApi.setColumnVisible('checkbox', true);
    this.gridApi.sizeColumnsToFit();
  }*/

}
