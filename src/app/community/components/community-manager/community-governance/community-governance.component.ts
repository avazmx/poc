import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { CommunityService } from 'src/app/community/services/community.service';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { governanceDef } from '../../../models/governance-def';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';

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
  private governanceDef;
  private frameworkComponents;
  governanceLevels: any;

  secondData = [];
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
    private store: Store<Community>
  ) {
    this.rowData = [
      {
        country: 'Toyota',
        district: 'Celica',
        state: 35000,
        slicRangeLow: 123,
        slicRangeHigh: 456,
        levelOneApprover: 'level one approver',
        altLevelOneApprover: 'Alt level two approver',
        levelTwoApprover: 'level one approver',
        altLevelTwoApprover: 'Alt level two approver'
      }
    ];

    this._communityService.getGovernanceLevel()
      .subscribe(governance => {
        this.governanceLevels = governance;
        console.log(this.governanceLevels);
    }, error => {
      console.log('backend is not working');
    });

    this.governanceDef = governanceDef;
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
    };

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
  }

}
