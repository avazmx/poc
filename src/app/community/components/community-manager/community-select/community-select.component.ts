import { Component, OnInit, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from 'src/app/community/services/community.service';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})

export class CommunitySelectComponent implements OnInit, ICellRendererAngularComp {
  private altData;
  private attributesDef;
  countries: any;
  districts: any;
  states: any;
  checkmark: any;

  constructor(
    private _communityService: CommunityService,
  ) {
    this.attributesDef = attributesDef;
    // console.log(this.columnDefs);
  }

  ngOnInit() {

  }

  agInit(params: any) {
    this.altData = params.value;
    // console.log(this.altData);
    
    if(this.altData == 'country') {
      this._communityService.getCountries()
        .subscribe(countries => {
          this.countries = countries;
          console.log(this.countries);
      });
    }

    if(this.altData == 'district') {
      this._communityService.getDistricts()
        .subscribe(districts => {
          this.districts = districts;
          console.log(this.districts);
      });
    }

    if(this.altData == 'state') {
      this._communityService.getStates()
        .subscribe(states => {
          this.states = states;
          console.log(this.states);
      });
    }

  }

  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  selected() {
    this.checkmark = !this.checkmark;
  }

}
