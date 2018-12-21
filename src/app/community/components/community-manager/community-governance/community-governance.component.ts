import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';
import { GovernanceLevel } from 'src/app/community/models/governance-level.model';
import { GovernanceLevelService } from 'src/app/community/services/governance-level.service';
import { MemberNameSelectComponent } from 'src/app/shared/components/member-name-select/member-name-select.component';
import * as communityActions from '../../../store/actions/community-attributes.actions';

import { governanceDef } from '../../../models/governance-def';
import { Governance } from 'src/app/community/models/governance.model';

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
  timesEmitted = 0;


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
            let newState = JSON.parse(JSON.stringify(geo.state));
            newState['slicks'] = [{ id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh }];
            selectedDistrict[0].states.push(newState);
          }

        } else {
          let newDistrict = JSON.parse(JSON.stringify(geo.district));
          newDistrict.states = [];
          let newState = JSON.parse(JSON.stringify(geo.state));
          newState['slicks'] = [{ id: slicId++, low: geo.slicRangeLow, high: geo.slicRangeHigh }];
          newDistrict.states.push(newState);
          selectedCountry[0].country.districts.push(newDistrict);
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

    // I removed the rows that were in the ag grid.
    this.gridApi.setRowData([]);

    for (let indexCountry = 0; indexCountry < selected.length; indexCountry++) {
      const country = selected[indexCountry].country;

      for (let indexDistrict = 0; indexDistrict < country.districts.length; indexDistrict++) {
        const district = country.districts[indexDistrict];

        for (let indexState = 0; indexState < district.states.length; indexState++) {
          const state = district.states[indexState];

          for (let indexSlic = 0; indexSlic < state.slicks.length; indexSlic++) {
            const slic = state.slicks[indexSlic];

            const newData = {
              country: country.description,
              district: district.name,
              state: state.name,
              slicRangeLow: slic.low,
              slicRangeHigh: slic.high,
              levelApproverOne: '',
              levelApproverTwo: '',
              AtllevelApproverTwo: ''
            };

            // We add the row to the ag-grid
            this.gridApi.updateRowData({ add: [newData] });
          }
        }
      }
    }
    this.secondData = selected;
  }

  onSelectionChanged(event: any) {
    if (event) {
      const selectedData: Governance[] = this.gridApi.getSelectedNodes().map(node => node.data);
      // Get the nodes of the grid.
      const renderedNodes: any[] = this.gridApi.getRenderedNodes();

      if (renderedNodes.length > 0) {
        for (let index = 0; index < selectedData.length; index++) {
          const node = renderedNodes[index];

          const levelApproverOne = { columns: ['levelApproverOne'], rowNodes: [node] };
          const levelApproverTwo = { columns: ['levelApproverTwo'], rowNodes: [node] };
          const atlLevelApproverTwo = { columns: ['AtlLevelApproverTwo'], rowNodes: [node] };

          const levelApproverOneInstance = this.gridApi.getCellRendererInstances(levelApproverOne);
          const levelApproverTwoInstance = this.gridApi.getCellRendererInstances(levelApproverTwo);
          const atlLevelApproverTwoInstance = this.gridApi.getCellRendererInstances(atlLevelApproverTwo);

          if (levelApproverOneInstance.length > 0) {
            const wrapperLevelOneApprover = levelApproverOneInstance[0];
            const frameworkLevelApproverOneInstance = wrapperLevelOneApprover.getFrameworkComponentInstance();
            selectedData[index].levelOneApprover = frameworkLevelApproverOneInstance.selectedLevelApproverOne;
          }

          if (levelApproverTwoInstance.length > 0) {
            const wrapperLevelTwoApprover = levelApproverTwoInstance[0];
            const frameworkLevelApproverTwoInstance = wrapperLevelTwoApprover.getFrameworkComponentInstance();
            selectedData[index].levelOTwoApprover = frameworkLevelApproverTwoInstance.selectedLevelApproverTwo;
          }

          if (atlLevelApproverTwoInstance.length > 0) {
            const wrapperAtlLevvelTwoApproverInstance = atlLevelApproverTwoInstance[0];
            const frameworkAtlLevvelTwoApproverInstance = wrapperAtlLevvelTwoApproverInstance.getFrameworkComponentInstance();
            selectedData[index].atlLevelTwoApprover = frameworkAtlLevvelTwoApproverInstance.selectedAtlLevelApproverTwo;
          }
        }
      }
      console.log('selected data', selectedData);
      this.CommunityObject.governance = selectedData;
      this.store.dispatch(new communityActions.AddMembers(this.CommunityObject));
    }
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
