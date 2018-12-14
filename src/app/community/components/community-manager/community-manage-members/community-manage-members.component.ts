import { Component, OnInit } from '@angular/core';
import { membersDef } from '../../../models/members-def';
import { CommunitySelectComponent } from '../community-select/community-select.component';

@Component({
  selector: 'ups-community-manage-members',
  templateUrl: './community-manage-members.component.html',
  styleUrls: ['./community-manage-members.component.scss']
})

export class CommunityManageMembersComponent implements OnInit {
  defaultColDef;
  gridApi;
  gridColumnApi;
  frameworkComponents;
  membersGrid;
  headerHeight = 38;
  newCount = 1;

  columnDefs = membersDef;
  rowData: any;

  constructor() {
    this.rowData = [];
    this.defaultColDef = { width: 200 };
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
    };
  }

  ngOnInit() {
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
      member_name: 'member_name',
      access_level: 'access_level',
      country: 'country',
      district: 'district',
      state: 'state',
      slic_range_low: 'slic_range_low',
      slic_range_high: 'slic_range_high'
    };
    const res = this.gridApi.updateRowData({ add: [newData] });
    console.log(newData);
  }

}
