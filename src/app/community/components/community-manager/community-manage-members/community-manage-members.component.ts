import { Component, OnInit } from '@angular/core';
import { membersDef } from '../../../models/members-def';
import { CommunitySelectComponent } from '../community-select/community-select.component';

@Component({
  selector: 'ups-community-manage-members',
  templateUrl: './community-manage-members.component.html',
  styleUrls: ['./community-manage-members.component.scss']
})

export class CommunityManageMembersComponent implements OnInit {
  private defaultColDef;
  private gridApi;
  private gridColumnApi;
  private frameworkComponents;
  private membersGrid;
  headerHeight = 38;
  newCount = 1;

  columnDefs = membersDef;
  rowData: any;

  /* 
  rowData = [
    {
      member_name: 'Toyota',
      access_level: 'Celica',
      country: 'USA',
      district: 'District 1',
      state: 'Chicago',
      slic_range_low: 123,
      slic_range_high: 456
    }
  ];
 */

  /*
  columnDefs = [
    { headerName: 'Member Name', field: 'member_name', editable: true, },
    { headerName: 'Access Level', field: 'access_level', editable: true, },
    { headerName: 'Country', field: 'country', editable: true },
    { headerName: 'District', field: 'district', editable: true },
    { headerName: 'State/Province', field: 'state', editable: true, },
    { headerName: 'SLIC Range Low', field: 'slic_range_low', editable: true, },
    { headerName: 'SLIC Range High', field: 'slic_range_high', editable: true, },
  ];
  */

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
  
      params.api.sizeColumnsToFit();
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
    // const newData = this.columnDefs;
    let res = this.gridApi.updateRowData({ add: [newData] });
    console.log(newData);
  }

}
