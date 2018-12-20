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

  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
    this.store.select('community').subscribe((obj) => {
      this.communityObject = obj;
      if (this.communityObject.activeTab === 3) {
        this.createObject();
      }
    });
  }

  createObject() {
    const transferObject = [];
    let slicId = 1;
    for (const geo of this.communityObject.geoServices) {
       const selectedCountry = transferObject.filter(countr => countr.country.id === geo.country.id);
      if (selectedCountry.length > 0) {
        const selectedDistrict = selectedCountry[0].country.districts.filter(dst => dst.id === geo.district.id);
          if (selectedDistrict.length > 0) {
            const selectedState = selectedDistrict[0].states.filter(stat => stat.id === geo.state.id);
            if (selectedState.length > 0) {
              selectedState[0].slicks.push({id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh});
            } else {
              let newState = JSON.parse(JSON.stringify(geo.state));
              newState["slicks"] = [{id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh}];
              selectedDistrict[0].states.push(newState);
            }

          } else {
            let newDistrict = JSON.parse(JSON.stringify(geo.district));
            newDistrict.states = [];
            let newState = JSON.parse(JSON.stringify(geo.state));
            newState["slicks"] = [{id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh}];
            newDistrict.states.push(newState);
            selectedCountry[0].country.districts.push(newDistrict);
          }
      } else {
        const ctry = {"country": JSON.parse(JSON.stringify(geo.country))};

        ctry.country["districts"] = [geo.district];
        ctry.country.districts[0]["states"] = [geo.state];
        ctry.country.districts[0].states[0]["slicks"] = [{id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh}];
        transferObject.push(ctry);
      }
    }
    this.data = transferObject;
  }

  // Selected Community Geography
  onSelected(selected) {
    this.secondData = selected;
    // console.log(this.secondData);
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
