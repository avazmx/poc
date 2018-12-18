import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';

import { Country } from '../../models/country.model';
import { CountryService } from '../../services/country.service';
import * as communityActions from '../../../community/store/actions/community-attributes.actions';


@Component({
  selector: 'ups-country-select',
  templateUrl: './country-select.component.html',
  styleUrls: ['./country-select.component.scss']
})

export class CountrySelectComponent implements OnInit, ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  public countries: Country[] = [];
  public membersCounties: Country[];
  public selectedCountry: Country;
  public communitySubscription: Subscription;
  public selectedTab: number;
  public currentRow: number;
  public CommunityObject: Community;
  constructor(private countryService: CountryService, private store: Store<Community>) { }

  ngOnInit() { }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.currentRow = +this.params.node.id;
    this.cell = { row: params.value, col: params.colDef.headerName };


    // Subscribe to the store in order to get the updated object for the countries.
    this.store.select('community').subscribe((obj: Community) => {

      this.CommunityObject = obj;
      if (obj.activeTab === 1 && this.countries.length === 0) {
        // Get countries
        this.countryService.getCountries()
          .subscribe((countries: Country[]) => {
            this.countries = countries;
          }, (error: HttpErrorResponse) => {
            this.countries = this.countryService.getHardCodedCountries();
          });
      } else if (obj.activeTab === 2 && this.countries.length === 0) {
        if (obj.geoServices && obj.geoServices.length > 0) {
          obj.geoServices.forEach(element => {
            this.countries.push(element.country);
          });
        }
      }
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return false;
  }

  // Country selection
  onCountryChange(selectedCountry: string) {
    if (+selectedCountry > 0) {
      this.selectedCountry = this.countries.filter(state => state.id === +selectedCountry)[0];
      this.countryService.setCountryId(+selectedCountry);
      this.CommunityObject.activeRow = +this.params.node.id;
      this.store.dispatch(new communityActions.ActiveRow(this.CommunityObject));
    }
  }

}
