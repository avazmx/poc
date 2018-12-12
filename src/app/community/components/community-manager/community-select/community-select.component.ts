import { Component, OnInit, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { columnDef } from '../../../models/column-def';
import { CommunityService } from 'src/app/community/services/community.service';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})

export class CommunitySelectComponent implements OnInit, ICellRendererAngularComp {
  private altData;
  private columnDefs;
  countries: any;
  districts: any;

  constructor(
    private _communityService: CommunityService,
  ) {
    this.columnDefs = columnDef;

    this._communityService.getCountries()
      .subscribe(countries => {
        this.countries = countries;
        console.log(this.countries);
    });

    this._communityService.getDistricts()
      .subscribe(districts => {
        this.districts = districts;
        console.log(this.districts);
    });

    // console.log(this.columnDefs);
  }

  ngOnInit() {

  }

  agInit(params: any) {
    this.altData = params.value;
    console.log(this.altData);
  }

  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

}
