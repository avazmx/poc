import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';
import { GovernanceLevel } from 'src/app/community/models/governance-level.model';
import { GovernanceLevelService } from 'src/app/community/services/governance-level.service';
import { MemberNameSelectComponent } from 'src/app/shared/components/member-name-select/member-name-select.component';

import { governanceDef } from '../../../models/governance-def';

@Component({
  selector: 'ups-community-governance',
  templateUrl: './community-governance.component.html',
  styleUrls: ['./community-governance.component.scss']
})

export class CommunityGovernanceComponent implements OnInit {

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


  constructor(private governanceService: GovernanceLevelService, private store: Store<Community>) {
    // Row Sample
    this.rowData = [];

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
      selectMemberNameCell: MemberNameSelectComponent,
    };

    this.data = [];

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
            selectedState[0].slicks.push({ id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh });
          } else {

          }

        } else {

        }
      } else {
        const ctry = { 'country': JSON.parse(JSON.stringify(geo.country)) };

        ctry.country['districts'] = [geo.district];
        ctry.country.districts[0]['states'] = [geo.state];
        ctry.country.districts[0].states[0]['slicks'] = [{ id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh }];
        transferObject.push(ctry);
      }
    }
    this.data = transferObject;
  }

  // Selected Community Geography
  onSelected(selected) {
    console.log(selected);
    this.secondData = selected;

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

      if (this.CommunityObject.activeTab === 3) {
        this.gridApi.sizeColumnsToFit();
      }
    });
  }

}
