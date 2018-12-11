import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ups-community-manage-members',
  templateUrl: './community-manage-members.component.html',
  styleUrls: ['./community-manage-members.component.scss']
})

export class CommunityManageMembersComponent implements OnInit {
  private defaultColDef;
  private gridApi;
  private gridColumnApi;
  private membersGrid;
  headerHeight = 38;
  newCount = 1;

  columnDefs = [
    { headerName: 'Member Name', field: 'member_name', editable: true, },
    { headerName: 'Access Level', field: 'access_level', editable: true, },
    { headerName: 'Country', field: 'country', editable: true },
    { headerName: 'District', field: 'district', editable: true },
    { headerName: 'State/Province', field: 'state', editable: true, },
    { headerName: 'SLIC Range Low', field: 'slic_range_low', editable: true, },
    { headerName: 'SLIC Range High', field: 'slic_range_high', editable: true, },
  ];

  rowData = [
    {
      member_name: 'Toyota',
      access_level: 'Celica',
      country: 'USA',
      district: 'District 1',
      state: 'Chicago',
      slic_range_low: 123,
      slic_range_high: 456
    },
    {
      member_name: 'Toyota',
      access_level: 'Celica',
      country: 'USA',
      district: 'District 1',
      state: 'Chicago',
      slic_range_low: 123,
      slic_range_high: 456
    },
    {
      member_name: 'Toyota',
      access_level: 'Celica',
      country: 'USA',
      district: 'District 1',
      state: 'Chicago',
      slic_range_low: 123,
      slic_range_high: 456
    },
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

  constructor() {

    this.defaultColDef = { width: 200 };
  }

  ngOnInit() {

  }


  createNewRowData() {
    console.log(this.rowData);
    const newData = {
      member_name: 'Toyota ' + this.newCount,
      access_level: 'Celica ' + this.newCount,
      country: '35090',
      district: 'Headless',
      state: 'Little',
      slic_range_low: 654,
      slic_range_high: 198
    };
    // this.newCount++;
    var res = this.gridApi.updateRowData({ add: [newData] });
    console.log(res);
  }

  /* AG-Grid */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.membersGrid = document.querySelector('#membersGrid');

    params.api.sizeColumnsToFit();
  }

}
