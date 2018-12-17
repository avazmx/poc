import { Component, OnInit, OnDestroy } from '@angular/core';
import { membersDef } from '../../../models/members-def';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import { Subscription } from 'rxjs';
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';

@Component({
  selector: 'ups-community-manage-members',
  templateUrl: './community-manage-members.component.html',
  styleUrls: ['./community-manage-members.component.scss']
})

export class CommunityManageMembersComponent implements OnInit, OnDestroy {
  defaultColDef;
  gridApi;
  gridColumnApi;
  frameworkComponents;
  membersGrid;
  headerHeight = 38;
  newCount = 1;

  columnDefs = membersDef;
  rowData: any;

  // Hectorf
  communitySubscription: Subscription;
  CommunityObject: Community;
  countries: Country[] = [];
  districts: District[] = [];
  states: State[] = [];

  constructor(private store: Store<Community>) {
    this.rowData = [];
    this.defaultColDef = { width: 200 };
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
    };
  }

  ngOnInit() {
    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;
      // debugger;
      if (this.CommunityObject.geoServices) {
        if (this.CommunityObject.geoServices.length > 0) {
          this.CommunityObject.geoServices.forEach(geoService => {
            this.countries.push(geoService.country);
            console.log('Countries from members => ' + this.countries.length);
          });
        }
      }
    });
  }

  /* AG-Grid */
  onGridReady(params) {
    // if(!this.step2) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.membersGrid = document.querySelector('#membersGrid');
    // params.api.sizeColumnsToFit();
    // }


    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;
    });

  }

  createNewRowMembersData() {
    const newData = {
      memberName: 'memberName',
      accessLevel: 'accessLevel',
      country: 'country',
      district: 'district',
      state: 'state',
      slicRangeLow: 'slicRangeLow',
      slicRangeHigh: 'slicRangeHigh'
    };
    const res = this.gridApi.updateRowData({ add: [newData] });
    console.log(newData);
  }


  ngOnDestroy(): void {
    this.communitySubscription.unsubscribe();
  }

}
