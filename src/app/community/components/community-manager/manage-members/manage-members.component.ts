import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ups-manage-members',
  templateUrl: './manage-members.component.html',
  styleUrls: ['./manage-members.component.scss']
})
export class ManageMembersComponent implements OnInit {
  private defaultColDef;
  headerHeight = 38;
  columnDefs = [
    { headerName: 'Member Name', field: 'member_name' },
    { headerName: 'Access Level', field: 'access_level' },
    { headerName: 'Country', field: 'country' },
    { headerName: 'District', field: 'district' },
    { headerName: 'State/Province', field: 'state' },
    { headerName: 'SLIC Range Low', field: 'slic_range_low' },
    { headerName: 'SLIC Range High', field: 'slic_range_high' }
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

  onGridReady(event: any) {

  }
}
