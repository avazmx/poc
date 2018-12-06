import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ups-community-governance',
  templateUrl: './community-governance.component.html',
  styleUrls: ['./community-governance.component.scss']
})
export class CommunityGovernanceComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private rowData;
  private governanceGrid;

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
      { country: 'Toyota', district: 'Celica', state: 35000 },
      { country: 'Ford', district: 'Mondeo', state: 32000 },
      { country: 'Porsche', district: 'Boxter', state: 72000 }
    ];

  }

  ngOnInit() {
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
