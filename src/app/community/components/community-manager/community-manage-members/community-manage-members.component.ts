import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

// Components
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
import { CommunitySelectComponent } from 'src/app/shared/components/community-select/community-select.component';

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
  newRow: boolean;
  @Input() step2;
  @Output() isRowSelected: EventEmitter<boolean> = new EventEmitter();
  @Output() isMemberCheckBoxSet: EventEmitter<boolean> = new EventEmitter();

  // Hectorf
  communitySubscription: Subscription;
  communityObject: Community;
  countries: Country[] = [];
  districts: District[] = [];
  states: State[] = [];

  constructor(private store: Store<Community>) {
    this.rowData = [];
    // AG Grid framework info
    this.columnDefs = membersDef;
    this.frameworkComponents = {
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
      this.communityObject = obj;
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
      this.communityObject = obj;
      if (this.communityObject.activeTab === 2) {

        this.gridApi.sizeColumnsToFit();
      }
    });

    // We create two rows ones the grid is ready.
    this.createNewRowMembersData();
    this.createNewRowMembersData();
  }

  createNewRowMembersData() {
    const newData = {
      memberName: 'memberName',
      accessLevel: 'accessLevel',
      country: 'country',
      district: 'district',
      state: 'state',
      slicLow: '',
      slicHigh: ''
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

          const memberNameInstance = this.gridApi.getCellRendererInstances({ columns: ['memberName'], rowNodes: [node] });
          const accessLevelInstance = this.gridApi.getCellRendererInstances({ columns: ['accessLevel'], rowNodes: [node] });
          const countryInstance = this.gridApi.getCellRendererInstances({ columns: ['country'], rowNodes: [node] });
          const districtInstance = this.gridApi.getCellRendererInstances({ columns: ['district'], rowNode: [node] });
          const stateInstance = this.gridApi.getCellRendererInstances({ columns: ['state'], rowNode: [node] });

          if (memberNameInstance.length > 0) {
            const frameworkMemberNameInstance = memberNameInstance[0].getFrameworkComponentInstance();
            selectedData[index].id = frameworkMemberNameInstance.selectedMember.id;
            selectedData[index].name = frameworkMemberNameInstance.selectedMember.name;
          }

          if (accessLevelInstance.length > 0) {
            const frameworkAccessLevelInstance = accessLevelInstance[0].getFrameworkComponentInstance();
            selectedData[index].accessLevel = frameworkAccessLevelInstance.selectedAccessLevel;
          }

          if (countryInstance.length > 0) {
            const frameworkCountryInstance = countryInstance[0].getFrameworkComponentInstance();
            selectedData[index].country = frameworkCountryInstance.selectedCountry;
          }

          if (districtInstance.length > 0) {
            const frameworkDistrictInstance = districtInstance[0].getFrameworkComponentInstance();
            selectedData[index].district = frameworkDistrictInstance.selectedDistrict;
          }

          if (stateInstance.length > 0) {
            const frameworkStateInstance = stateInstance[0].getFrameworkComponentInstance();
            selectedData[index].state = frameworkStateInstance.selectedState;
          }
        }
      }

      this.communityObject.members = selectedData;
      this.store.dispatch(new communityActions.AddMembers(this.communityObject));
    }
  }

  onRowSelected(isSelected: boolean) {
    this.isRowSelected.emit(isSelected);
  }

  onMemberNameSet(isMemberCheckBoxSet: boolean) {
    this.isMemberCheckBoxSet.emit(isMemberCheckBoxSet);
  }

  /**
   * This method is executed every time an ag-grid cell is clicked, we dispatch an action that indicates the row id we are editing.
   * @param rowId the selected row id.
   */
  onCellClicked(rowId: string) {
    if (this.communityObject.activeRow !== +rowId) {
      this.store.dispatch(new communityActions.ActiveRow(+rowId));
    }
  }

  ngOnDestroy(): void {
    this.communitySubscription.unsubscribe();
  }

}
