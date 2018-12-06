import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'ups-community-governance',
  templateUrl: './community-governance.component.html',
  styleUrls: ['./community-governance.component.scss']
})
export class CommunityGovernanceComponent implements OnInit, AfterViewInit {

  private gridApi;
  private gridColumnApi;
  headerHeight = 38;
  columnDefs = [
    { headerName: 'Country', field: 'country' },
    { headerName: 'District', field: 'district' },
    { headerName: 'State/Province', field: 'state' },
    { headerName: 'SLIC Range Low', field: 'slic_range_low' },
    { headerName: 'SLIC Range High', field: 'slic_range_high' },
    { headerName: 'Level 1 Approver', field: 'level_one_approver' },
    { headerName: 'Alt Level 1 Approver', field: 'alt_level_one_approver' },
    { headerName: 'Level 2 Approver', field: 'level_two_approver' },
    { headerName: 'Alt Level 2 Approver', field: 'alt_level_two_approver' }
  ];

  rowData = [
    { country: 'Toyota', district: 'Celica', state: 35000, slic_range_low: 123, slic_range_high: 456, level_one_approver: 'level one approver', alt_level_one_approver: 'Alt level two approver', level_two_approver: 'level one approver', alt_level_two_approver: 'Alt level two approver' },
    { country: 'Toyota', district: 'Celica', state: 35000, slic_range_low: 123, slic_range_high: 456, level_one_approver: 'level one approver', alt_level_one_approver: 'Alt level two approver', level_two_approver: 'level one approver', alt_level_two_approver: 'Alt level two approver' },
    { country: 'Toyota', district: 'Celica', state: 35000, slic_range_low: 123, slic_range_high: 456, level_one_approver: 'level one approver', alt_level_one_approver: 'Alt level two approver', level_two_approver: 'level one approver', alt_level_two_approver: 'Alt level two approver' }
  ];

  constructor() { }


  ngAfterViewInit(): void {
  }

  ngOnInit() {

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  sizeToFit() {
    this.gridApi.sizeColumnsToFit();
  }

}
