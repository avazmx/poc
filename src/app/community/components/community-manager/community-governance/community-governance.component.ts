import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ups-community-governance',
  templateUrl: './community-governance.component.html',
  styleUrls: ['./community-governance.component.scss']
})
export class CommunityGovernanceComponent implements OnInit {

  columnDefs = [
    { headerName: 'Country', field: 'country' },
    { headerName: 'District', field: 'district' },
    { headerName: 'State/Province', field: 'state' },
    { headerName: 'SLIC Range Low', field: 'slicLow' },
    { headerName: 'SLIC Range High', field: 'slicHigh' },
    { headerName: 'Business Unit', field: 'bu' },
    { headerName: 'GND', field: 'gnd' },
    { headerName: '3DS', field: 'three' },
    { headerName: '2DS', field: 'two' },
    { headerName: '1DA', field: 'one' }
  ];

  rowData = [
    { country: 'Toyota', district: 'Celica', state: 35000 },
    { country: 'Ford', district: 'Mondeo', state: 32000 },
    { country: 'Porsche', district: 'Boxter', state: 72000 }
  ];

  constructor() { }

  ngOnInit() {
  }

}
