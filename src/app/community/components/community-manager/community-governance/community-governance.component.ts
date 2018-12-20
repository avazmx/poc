import { Component, OnInit, AfterViewInit, AfterContentInit } from '@angular/core';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { governanceDef } from '../../../models/governance-def';

import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';
import { GovernanceLevelService } from 'src/app/community/services/governance-level.service';
import { GovernanceLevel } from 'src/app/community/models/governance-level.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ups-community-governance',
  templateUrl: './community-governance.component.html',
  styleUrls: ['./community-governance.component.scss']
})

export class CommunityGovernanceComponent implements OnInit, AfterViewInit {

  rowData;
  private gridApi;
  private gridColumnApi;
  private governanceGrid;
  private governanceDef;
  private frameworkComponents;
  governanceLevels: GovernanceLevel;
  communityObject: Community;
  data = [];
  secondData = [];
  headerHeight = 38;
  communitySubscription: Subscription;
  CommunityObject: Community;

  // AG Grid Header
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
    private governanceService: GovernanceLevelService,
    private store: Store<Community>
  ) {
    // Row Sample
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

    // Get governance level
    this.governanceService.getGovernanceLevel()
      .subscribe((governance: GovernanceLevel) => {
        this.governanceLevels = governance;
        console.log(this.governanceLevels);
      }, error => {
        console.log('backend is not working');
      });

    // AG Grid Component Info
    this.governanceDef = governanceDef;
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
    };

    this.data = [];
    /* this.data = [
      {
        country: {
          id: 1,
          name: 'USA',
          districts: [
            {
              id: 1,
              name: 'dist one',
              states: [
                {
                  id: 1,
                  name: 'state one',
                  slicks: [
                    { id: 1, low: '1', high: '2' },
                    { id: 2, low: '12', high: '22' }
                  ]
                },
                {
                  id: 11,
                  name: 'state two',
                  slicks: [
                    { id: 3, low: '1', high: '2' },
                    { id: 4, low: '1', high: '2' }
                  ]
                }
              ]
            },
            {
              id: 2,
              name: 'dist two',
              states: [
                {
                  id: 2,
                  name: 'state one',
                  slicks: [
                    { id: 5, low: '1', high: '2' },
                    { id: 6, low: '13', high: '23' }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        country: {
          id: 2,
          name: 'MEX',
          districts: [
            {
              id: 3,
              name: 'dist one',
              states: [
                {
                  id: 3,
                  name: 'state one',
                  slicks: [
                    { id: 7, low: '21', high: '22' },
                    { id: 8, low: '31', high: '32' }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]; */

  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.store.select('community').subscribe((obj) => {
      this.communityObject = obj;
      console.log("STORE ",this.communityObject);
      if (this.communityObject.activeTab === 3) {
        this.createObject();
      }
    });
  }

  createObject() {
    let transferObject = [];
    let currentCtry;
    for (const geo of this.communityObject.geoServices) {

      /* let selectedCountry = transferObject.filter(countr => countr.country.id === geo.country.id);
      if (selectedCountry.length > 0) {

        let selectedDistrict = selectedCountry[0].districts.filter(dst => dst.id === geo.district.id);
          if (selectedDistrict.length > 0) {

            let selectedState = selectedDistrict[0].states.filter(stat => stat.id === geo.district.id);
            if (selectedDistrict.length > 0) {
              selectedState.slicks.push({id:1, low: geo.slicLow, high: geo.slicHigh});
            } else {

            }

          } else {

          }
      } else { */


        console.log("GEOSERVICE ",geo);
        let ctry = {"country":JSON.parse(JSON.stringify(geo.country))};

        ctry.country["districts"] = [geo.district];
        ctry.country.districts[0]["states"] = [geo.state];
        ctry.country.districts[0].states[0].slicks = [{id:1, low: geo.slicLow, high: geo.slicHigh}];
        transferObject.push(ctry);
      /*  }*/
    }
    console.log("TRANSFER OBJECT ",transferObject);
    this.data = transferObject;
  }

  // Selected Community Geography
  onSelected(selected) {
    this.secondData = selected;
    console.log(this.secondData);
  }

  // AG-Grid
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.governanceGrid = document.querySelector('#governanceGrid');



    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;

      if (this.CommunityObject.activeTab == 3) {
        this.gridApi.sizeColumnsToFit();
      }
    });
  }

}
