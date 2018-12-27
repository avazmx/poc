import { Component, OnInit } from '@angular/core';
import { BusinessUnitService } from '../../services/business-unit.service';
import { BusinessUnit } from '../../models/business-unit.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GeoService } from 'src/app/community/models/geo-services.model';
import { Community } from 'src/app/community/models/community.model';

@Component({
  selector: 'ups-business-unit-select',
  templateUrl: './business-unit-select.component.html',
  styleUrls: ['./business-unit-select.component.scss']
})

export class BusinessUnitSelectComponent implements OnInit {
  public altData;
  public params: any;
  public cell: any;
  public businessUnitSubscription: Subscription;
  public businessUnits: BusinessUnit[];
  public selectedBusinessUnit;
  public CommunityObject: Community;
  gridApi;
  gridColumnApi;

  constructor(private businessUnitService: BusinessUnitService, private store: Store<GeoService>) { }
  ngOnInit() { }

  // AG Grid Initialize
  agInit(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };

    // Subscribe to the store in order to get the updated object for the countries.
    this.businessUnitSubscription = this.store.select('community').subscribe((obj: any) => {
      this.businessUnits = [];

      // Get Business units
      this.businessUnitService.getBusinessUnits()
        .subscribe((businessUnits: BusinessUnit[]) => {
          this.businessUnits = businessUnits;
        }, (error: HttpErrorResponse) => {
          this.businessUnits = this.businessUnitService.getHardCodedBusinessUnits();
        });
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  /**
   * This method fires when the bussines unit dropdown changes the selection.
   * @param selectedBusinessUnit the selected element from the dropdown list
   */
  onBusinessUnitChange(selectedBusinessUnit: string) {
    if (+selectedBusinessUnit > 0) {
      this.selectedBusinessUnit = this.businessUnits.filter(bussinesUnit => bussinesUnit.id === +selectedBusinessUnit)[0];
    }
  }

}
