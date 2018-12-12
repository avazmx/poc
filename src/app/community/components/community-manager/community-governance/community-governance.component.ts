import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { CommunityService } from 'src/app/community/services/community.service';

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
  governanceLevels: any;

  secondData = [];
  data: any = [
    {
      country: {
        id: 1,
        name: "US",
        districts: [
          {
            id: 1,
            name: "District 76 - Northwest",
            states: [
              {
                id: 1,
                name:"Washington"
              },
              {
                id: 11,
                name:"Oregon"
              }
            ]
          },
          {
            id: 2,
            name: "District 89 - East",
            states: [
              {
                id: 2,
                name:"Texas"
              }
            ]
          }
        ]
      }
    },
    {
      country: {
        id: 2,
        name: "MX",
        districts: [
          {
            id: 3,
            name: "District 115 - Southwest",
            states: [
              {
                id: 3,
                name:"Jalisco"
              }
            ]
          }
        ]
      }
    }
  ];

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
    private _communityService: CommunityService,
  ) {
    this.rowData = [
      { country: 'Toyota', district: 'Celica', state: 35000, slic_range_low: 123, slic_range_high: 456, level_one_approver: 'level one approver', alt_level_one_approver: 'Alt level two approver', level_two_approver: 'level one approver', alt_level_two_approver: 'Alt level two approver' }
    ];

    this._communityService.getGovernanceLevel()
      .subscribe(governance => {
        this.governanceLevels = governance;
        console.log(this.governanceLevels);
    });

  }


  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }

  onSelected(selected) {
    this.secondData = selected;
  }

  /* AG-Grid */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.governanceGrid = document.querySelector('#governanceGrid');

    params.api.sizeColumnsToFit();
    this.gridApi.sizeColumnsToFit();
  }

}
