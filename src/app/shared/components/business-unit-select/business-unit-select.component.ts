import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../../services/business-unit.service';
import { Community } from 'src/app/community/models/community.model';
import { BusinessUnit } from '../../models/business-unit.model';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ups-business-unit-select',
  templateUrl: './business-unit-select.component.html',
  styleUrls: ['./business-unit-select.component.scss']
})

export class BusinessUnitSelectComponent implements OnInit {
  public altData;
  public params: any;
  public cell: any;
  public communitySubscription: Subscription;
  public businessUnits: BusinessUnit[];
  public selectedBusinessUnit: BusinessUnit;

  constructor(private businessUnitService: BusinessUnitService, private store: Store<Community>) { }

  ngOnInit() {
  }
  
  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };


    // Subscribe to the store in order to get the updated object for the countries.
    this.communitySubscription = this.store.select('community').subscribe((obj: Community) => {
      this.businessUnits = [];
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }
  
  // Country selection
  onCountryChange(selectedBusinessUnit: string) {
    if (+selectedBusinessUnit > 0) {
      this.selectedBusinessUnit = this.businessUnits.filter(state => state.id === +selectedBusinessUnit)[0];
    }
  }

}
