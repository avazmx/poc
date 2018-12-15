import { Component, OnInit, OnDestroy } from '@angular/core';
import { membersDef } from '../../../models/members-def';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import { Subscription } from 'rxjs';

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
      console.log('community store Subscription => ', obj);
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
