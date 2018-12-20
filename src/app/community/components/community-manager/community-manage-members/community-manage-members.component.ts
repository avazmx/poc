import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Components
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { CountrySelectComponent } from 'src/app/shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from 'src/app/shared/components/district-select/district-select.component';
import { StateSelectComponent } from 'src/app/shared/components/state-select/state-select.component';
// Models
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';
import { membersDef } from '../../../models/members-def';
import { Community } from 'src/app/community/models/community.model';
import { MemberNameSelectComponent } from 'src/app/shared/components/member-name-select/member-name-select.component';
import { AccessLevelSelectComponent } from 'src/app/shared/components/access-level-select/access-level-select.component';
import { ManageMember } from 'src/app/shared/models/manage-member.model';

import * as communityActions from '../../../store/actions/community-attributes.actions';
import { BusinessUnitSelectComponent } from 'src/app/shared/components/business-unit-select/business-unit-select.component';

@Component({
  selector: 'ups-community-manage-members',
  templateUrl: './community-manage-members.component.html',
  styleUrls: ['./community-manage-members.component.scss']
})

export class CommunityManageMembersComponent implements OnInit, OnDestroy {
  gridApi;
  gridColumnApi;
  frameworkComponents;
  membersGrid;
  headerHeight = 38;
  newCount = 1;
  columnDefs;
  rowData: any;
  @Input() step2;

  // Hectorf
  communitySubscription: Subscription;
  CommunityObject: Community;
  countries: Country[] = [];
  districts: District[] = [];
  states: State[] = [];

  constructor(private store: Store<Community>) {
    this.rowData = [];
    // AG Grid framework info
    this.columnDefs = membersDef;
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
      selectCountryCell: CountrySelectComponent,
      selectDistrictCell: DistrictSelectComponent,
      selectStateCell: StateSelectComponent,
      selectMemberNameCell: MemberNameSelectComponent,
      selectAccessLevelCell: AccessLevelSelectComponent
    };
  }

  ngOnInit() {
    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;
      console.log(this.CommunityObject);
      // debugger;
      if (this.CommunityObject.geoServices) {
        if (this.CommunityObject.geoServices.length > 0) {
          this.CommunityObject.geoServices.forEach(geoService => {
            this.countries.push(geoService.country);
            console.log('Countries from members => ' + this.countries.length);
          });
        }
      }
    });
  }

  /* AG-Grid */
  onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;

      this.gridApi.setDomLayout('autoHeight');
      this.membersGrid = document.querySelector('#membersGrid');

    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;

      if (this.CommunityObject.activeTab == 2) {
        this.gridApi.sizeColumnsToFit();
      }
    });
  }

  createNewRowMembersData() {
    const newData = {
      memberName: 'memberName',
      accessLevel: 'accessLevel',
      country: 'country',
      district: 'district',
      state: 'state',
      slicRangeLow: 'slicRangeLow',
      slicRangeHigh: 'slicRangeHigh'
    };
    this.gridApi.updateRowData({ add: [newData] });
  }

  onSelectionChanged(event: any) {
    if (event) {

      const selectedData: ManageMember[] = this.gridApi.getSelectedNodes().map(node => node.data);
      // Get the nodes of the grid.
      const renderedNodes: any[] = this.gridApi.getRenderedNodes();

      if (renderedNodes.length > 0) {
        for (let index = 0; index < selectedData.length; index++) {
          const node = renderedNodes[index];
          const memberNameParams = { columns: ['memberName'], rowNodes: [node] };
          const accessLevelParams = { columns: ['accessLevel'], rowNodes: [node] };
          const countryParams = { columns: ['country'], rowNodes: [node] };
          const districtParams = { columns: ['district'], rowNode: [node] };
          const stateParams = { columns: ['state'], rowNode: [node] };
          const slicLowParams = { columns: ['slicRangeLow'], rowNode: [node] };
          const slicHighParams = { columns: ['slicRangeHigh'], rowNode: [node] };

          const memberNameInstance = this.gridApi.getCellRendererInstances(memberNameParams);
          const accessLevelInstance = this.gridApi.getCellRendererInstances(accessLevelParams);
          const countryInstance = this.gridApi.getCellRendererInstances(countryParams);
          const districtInstance = this.gridApi.getCellRendererInstances(districtParams);
          const stateInstance = this.gridApi.getCellRendererInstances(stateParams);
          const slicLowInstance = this.gridApi.getCellRendererInstances(slicLowParams);
          const slicHighInstance = this.gridApi.getCellRendererInstances(slicHighParams);

          if (memberNameInstance.length > 0) {
            debugger;
            const wapperMemberNameInstance = memberNameInstance[0];
            const frameworkMemberNameInstance = wapperMemberNameInstance.getFrameworkComponentInstance();
            selectedData[index].name = frameworkMemberNameInstance.selectedMemberName;
          }

          if (accessLevelInstance.length > 0) {
            const wapperAccessLevelInstance = accessLevelInstance[0];
            const frameworkAccessLevelInstance = wapperAccessLevelInstance.getFrameworkComponentInstance();
            selectedData[index].accessLevel = frameworkAccessLevelInstance.selectedAccessLevel;
          }

          if (countryInstance.length > 0) {
            const wrapperCountryInstance = countryInstance[0];
            const frameworkCountryInstance = wrapperCountryInstance.getFrameworkComponentInstance();
            selectedData[index].country = frameworkCountryInstance.selectedCountry;
          }

          if(districtInstance.length > 0) {
            const wrapperDistrictInstance = districtInstance[0];
            const frameworkDistrictInstance = wrapperDistrictInstance.getFrameworkComponentInstance();
            selectedData[index].district = frameworkDistrictInstance.selectedDistrict;
          }

          if(stateInstance.length > 0) {
            const wrapperStateInstance = stateInstance[0];
            const frameworkStateInstance = wrapperStateInstance.getFrameworkComponentInstance();
            selectedData[index].state = frameworkStateInstance.selectedState;
          }

          if(slicLowInstance.length > 0) {
            const wrapperSlicLowInstance = slicLowInstance[0];
            const frameworkSlicLowInstance = wrapperSlicLowInstance.getFrameworkComponentInstance();
            selectedData[index].slicRangeLow = frameworkSlicLowInstance.selectedSlicLow;
          }

          if(slicHighInstance.length > 0) {
            const wrapperSlicHighInstance = slicHighInstance[0];
            const frameworkSlicHighInstance = wrapperSlicHighInstance.getFrameworkComponentInstance();
            selectedData[index].slicRangeHigh = frameworkSlicHighInstance.selectedSlicHigh;
          }
        }
      }
      console.log('selected data' , selectedData);
      this.CommunityObject.members = selectedData;
      this.store.dispatch(new communityActions.AddMembers(this.CommunityObject));
    }
  }

  ngOnDestroy(): void {
    this.communitySubscription.unsubscribe();
  }

}
