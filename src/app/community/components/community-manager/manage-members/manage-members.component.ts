import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ups-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit {
  private gridApi;
  private gridColumnApi;
  private membersGrid;
  newCount = 1;

  columnDefs = [
    { headerName: 'Member Name', field: 'memberName', editable: true, },
    { headerName: 'Access Level', field: 'accessLvl', editable: true, },
    { headerName: 'Country', field: 'country', editable: true },
    { headerName: 'District', field: 'district', editable: true },
    { headerName: 'State/Province', field: 'state', editable: true, },
    { headerName: 'SLIC Range Low', field: 'slicLow', editable: true, },
    { headerName: 'SLIC Range High', field: 'slicHigh', editable: true, },
  ];

  rowData = [
    { country: 'Toyota', district: 'Celica', state: 35000 },
    { country: 'Ford', district: 'Mondeo', state: 32000 },
    { country: 'Porsche', district: 'Boxter', state: 72000 }
  ];

  constructor(

    ) {
  }

  ngOnInit() {

  }


  createNewRowData() {
    console.log(this.rowData);
    const newData = {
      country: 'Toyota ' + this.newCount,
      district: 'Celica ' + this.newCount,
      state: 35000 + this.newCount * 17,
      slicLow: 'Headless',
      slicHigh: 'Little',
      bu: 'Airbag'
    };
    // this.newCount++;
    this.rowData.push(newData);
    console.log(this.rowData);
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
