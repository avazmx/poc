import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'ups-community-governance',
  templateUrl: './community-governance.component.html',
  styleUrls: ['./community-governance.component.scss']
})
export class CommunityGovernanceComponent implements OnInit, AfterViewInit {

  private rowData;
  private gridApi;
  private gridColumnApi;
  private governanceGrid;

  headerHeight = 38;
  columnDefs = [
    { headerName: 'Country', field: 'country', editable: true },
    { headerName: 'District', field: 'district', editable: true },
    { headerName: 'State', field: 'state', editable: true },
    { headerName: 'SLIC Range Low', field: 'slicLow', editable: true },
    { headerName: 'SLIC Range High', field: 'slicHigh', editable: true },
    { headerName: 'Level 1 Approver', field: 'lvl1approver', editable: true },
    { headerName: 'Alt Level 1 Approver', field: 'altlvl1approver', editable: true },
    { headerName: 'Level 2 Approver', field: 'lvl2approver', editable: true },
    { headerName: 'Alt Level 2 Approver', field: 'altlvl2approver', editable: true },
  ];

  constructor(

  ) {
    this.rowData = [
      { country: 'Toyota', district: 'Celica', state: 35000, slic_range_low: 123, slic_range_high: 456, level_one_approver: 'level one approver', alt_level_one_approver: 'Alt level two approver', level_two_approver: 'level one approver', alt_level_two_approver: 'Alt level two approver' },
      { country: 'Toyota', district: 'Celica', state: 35000, slic_range_low: 123, slic_range_high: 456, level_one_approver: 'level one approver', alt_level_one_approver: 'Alt level two approver', level_two_approver: 'level one approver', alt_level_two_approver: 'Alt level two approver' },
      { country: 'Toyota', district: 'Celica', state: 35000, slic_range_low: 123, slic_range_high: 456, level_one_approver: 'level one approver', alt_level_one_approver: 'Alt level two approver', level_two_approver: 'level one approver', alt_level_two_approver: 'Alt level two approver' }
    ];

  }


  ngAfterViewInit(): void {
  }

  ngOnInit() {

  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

  /* AG-Grid */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.governanceGrid = document.querySelector('#governanceGrid');

    params.api.sizeColumnsToFit();
  }

}
