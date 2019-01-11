import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';
import { GovernanceLevel } from 'src/app/community/models/governance-level.model';
import { Governance } from 'src/app/community/models/governance.model';
import { GovernanceLevelService } from 'src/app/community/services/governance-level.service';
import { MemberNameSelectComponent } from 'src/app/shared/components/member-name-select/member-name-select.component';
import { MemberNameService } from 'src/app/shared/services/member-name.service';

import { governanceDef } from '../../../models/governance-def';
import * as communityActions from '../../../store/actions/community-attributes.actions';
import swal from 'sweetalert2';


@Component({
  selector: 'ups-community-governance',
  templateUrl: './community-governance.component.html',
  styleUrls: ['./community-governance.component.scss']
})

export class CommunityGovernanceComponent implements OnInit {

  rowData;
  public gridApi;
  private gridColumnApi;
  private governanceGrid;
  private governanceDef;
  private frameworkComponents;
  governanceLevels;
  communityObject: Community;
  data = [];
  secondData = [];
  headerHeight = 38;
  communitySubscription: Subscription;
  timesEmitted = 0;
  loading = true;
  @Output() memberSelected: EventEmitter<any>;
  @Output() governanceLevelChange: EventEmitter<GovernanceLevel>;
  @Output() isGovernanceGridSelected: EventEmitter<number>;
  @ViewChild('governanceGrid') agGrid: CommunityGovernanceComponent;


  constructor(private governanceService: GovernanceLevelService, private store: Store<Community>,
    private memberService: MemberNameService) {
    // Row Sample
    this.rowData = [];

    // Get governance level
    this.governanceService.getGovernanceLevel()
      .subscribe((governance: GovernanceLevel) => {
        this.governanceLevels = governance;
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        this.governanceLevels = this.governanceService.getHardCodedGovernanceLevels();
        this.loading = false;
      });

    // AG Grid Component Info
    this.governanceDef = governanceDef;
    this.frameworkComponents = {
      selectMemberNameCell: MemberNameSelectComponent,
    };

    this.data = [];

    this.memberSelected = new EventEmitter<any>();
    this.governanceLevelChange = new EventEmitter<GovernanceLevel>();
    this.isGovernanceGridSelected = new EventEmitter<number>();

  }

  /**
   * Fires when the component is created.
   */
  ngOnInit() {
    this.store.select('community').subscribe((obj) => {
      this.communityObject = obj;
      if (this.communityObject.activeTab === 3) {
        this.createObject();
        this.gridApi.sizeColumnsToFit();
      }
    });
  }

  resetGrid() {
    this.gridApi.setRowData([]);
  }

  /**
   * Creates the json object for the transfer.
   */
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
            selectedState[0].slicks.push({ id: slicId++, low: geo.slicLow, high: geo.slicHigh });
          } else {
            let newState = JSON.parse(JSON.stringify(geo.state));
            newState['slicks'] = [{ id: slicId++, low: geo.slicLow, high: geo.slicHigh }];
            selectedDistrict[0].states.push(newState);
          }

        } else {
          let newDistrict = JSON.parse(JSON.stringify(geo.district));
          newDistrict.states = [];
          let newState = JSON.parse(JSON.stringify(geo.state));
          newState['slicks'] = [{ id: slicId++, low: geo.slicLow, high: geo.slicHigh }];
          newDistrict.states.push(newState);
          selectedCountry[0].country.districts.push(newDistrict);
        }
      } else {
        const ctry = { 'country': JSON.parse(JSON.stringify(geo.country)) };

        ctry.country['districts'] = [geo.district];
        ctry.country.districts[0]['states'] = [geo.state];
        ctry.country.districts[0].states[0]['slicks'] = [{ id: slicId++, low: geo.slicLow, high: geo.slicHigh }];
        transferObject.push(ctry);
      }
    }
    this.data = transferObject;
  }

  /**
   * We get the transfer data in order to add rows to the ag-grid.
   * @param selected get the selected data from the transfer.
   */
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
              atllevelApproverOne: '',
              levelApproverTwo: '',
              atllevelApproverTwo: '',
              checkbox: ''
            };

            // We add the row to the ag-grid
            this.gridApi.updateRowData({ add: [newData] });
          }
        }
      }
    }
    this.secondData = selected;
  }

  /**
   * Fires when the user adds a new approver to the grid.
   * @param event the row object.
   */
  onSelectionChanged(event: any) {
    if (event) {
      const selectedData: Governance[] = this.gridApi.getSelectedNodes().map(node => node.data);
      const renderedNodes: any[] = this.gridApi.getRenderedNodes();

      let idMember1 = 0;
      let idMember2 = 0;
      let valiate = 0;
      if (renderedNodes.length > 0) {
        for (let index = 0; index < selectedData.length; index++) {
          const node = renderedNodes[index];

          const levelApproverOne = { columns: ['levelApproverOne'], rowNodes: [node] };
          const atlLevelApproverOne = { columns: ['atllevelApproverOne'], rowNodes: [node] };
          const levelApproverTwo = { columns: ['levelApproverTwo'], rowNodes: [node] };
          const atlLevelApproverTwo = { columns: ['atllevelApproverTwo'], rowNodes: [node] };

          const levelApproverOneInstance = this.gridApi.getCellRendererInstances(levelApproverOne);
          const altlevelApproverOneInstance = this.gridApi.getCellRendererInstances(atlLevelApproverOne);
          const levelApproverTwoInstance = this.gridApi.getCellRendererInstances(levelApproverTwo);
          const atlLevelApproverTwoInstance = this.gridApi.getCellRendererInstances(atlLevelApproverTwo);

          if (levelApproverOneInstance.length > 0) {
            const wrapperLevelOneApprover = levelApproverOneInstance[0];
            const frameworkLevelApproverOneInstance = wrapperLevelOneApprover.getFrameworkComponentInstance();
            selectedData[index].levelOneApprover = frameworkLevelApproverOneInstance.selectedMember;
            idMember1 = selectedData[index].levelOneApprover.id;
          }

          if (altlevelApproverOneInstance.length > 0) {
            const wrapperAltLevelOneApprover = altlevelApproverOneInstance[0];
            const frameworkAtlLevelApproverOneInstance = wrapperAltLevelOneApprover.getFrameworkComponentInstance();
            selectedData[index].altlevelOneApprover = frameworkAtlLevelApproverOneInstance.selectedMember;
          }

          if (levelApproverTwoInstance.length > 0) {
            const wrapperLevelTwoApprover = levelApproverTwoInstance[0];
            const frameworkLevelApproverTwoInstance = wrapperLevelTwoApprover.getFrameworkComponentInstance();
            selectedData[index].levelOTwoApprover = frameworkLevelApproverTwoInstance.selectedMember;
            idMember2 = selectedData[index].levelOTwoApprover.id;
          }

          if (atlLevelApproverTwoInstance.length > 0) {
            const wrapperAtlLevvelTwoApproverInstance = atlLevelApproverTwoInstance[0];
            const frameworkAtlLevvelTwoApproverInstance = wrapperAtlLevvelTwoApproverInstance.getFrameworkComponentInstance();
            selectedData[index].atlLevelTwoApprover = frameworkAtlLevvelTwoApproverInstance.selectedMember;
          }
          if (idMember1 === idMember2) {
            valiate++;
          }
        }

        if (valiate === 0 && selectedData.length > 0) {
          this.communityObject.governance = selectedData;
          this.store.dispatch(new communityActions.AddGovernance(this.communityObject));
          this.isGovernanceGridSelected.emit(selectedData.length);
        } else {
          if (valiate > 0) {
            swal({
              type: 'warning',
              title: 'The Approver one and Approver two must be different!'
            });
            this.gridApi.deselectAll();
            this.isGovernanceGridSelected.emit(0);
          }
        }
      }
    }
  }

  /**
   * Fires when the user clicks in the cell this method help us to identify which user has been added to the governance approvers.
   * @param event  the cell clicked.
   */
  onCellClicked(event: any) {
    if (event.column.colDef.field === 'levelApproverOne' || event.column.colDef.field === 'atllevelApproverOne'
      || event.column.colDef.field === 'levelApproverTwo' || event.column.colDef.field === 'atllevelApproverTwo') {
      // Get the nodes of the grid.
      const renderedNodes = this.gridApi.getRenderedNodes().filter(x => x.id === event.node.id)[0];

      if (renderedNodes) {
        const levelApproverOne = { columns: ['levelApproverOne'], rowNodes: [renderedNodes] };
        const atlLevelApproverOne = { columns: ['atllevelApproverOne'], rowNodes: [renderedNodes] };
        const levelApproverTwo = { columns: ['levelApproverTwo'], rowNodes: [renderedNodes] };
        const atlLevelApproverTwo = { columns: ['atllevelApproverTwo'], rowNodes: [renderedNodes] };

        const levelApproverOneInstance = this.gridApi.getCellRendererInstances(levelApproverOne);
        const altlevelApproverOneInstance = this.gridApi.getCellRendererInstances(atlLevelApproverOne);
        const levelApproverTwoInstance = this.gridApi.getCellRendererInstances(levelApproverTwo);
        const atlLevelApproverTwoInstance = this.gridApi.getCellRendererInstances(atlLevelApproverTwo);

        if (event.column.colDef.field === 'levelApproverOne') {
          if (levelApproverOneInstance.length > 0) {
            const wrapperLevelOneApprover = levelApproverOneInstance[0];
            const frameworkLevelApproverOneInstance = wrapperLevelOneApprover.getFrameworkComponentInstance();

            // if (this.memberService.isMemberOneSelected) {
            this.memberService.setMemberOne(true);
            this.memberService.isMemberOneSelected = true;
            // } else {
            // this.memberService.setMemberOne(false);
            // this.memberService.isMemberOneSelected = false;
            // }

          }
        } else if (event.column.colDef.field === 'atllevelApproverOne') {
          if (altlevelApproverOneInstance.length > 0) {
            const wrapperAltLevelOneApprover = altlevelApproverOneInstance[0];
            const frameworkAtlLevelApproverOneInstance = wrapperAltLevelOneApprover.getFrameworkComponentInstance();
            // if (frameworkAtlLevelApproverOneInstance.selectedAltLevelApproverOne === null) {
            this.memberService.setAltMemberOne(true);
            // }
          }
        } else if (event.column.colDef.field === 'levelApproverTwo') {
          if (levelApproverTwoInstance.length > 0) {
            const wrapperLevelTwoApprover = levelApproverTwoInstance[0];
            const frameworkLevelApproverTwoInstance = wrapperLevelTwoApprover.getFrameworkComponentInstance();
            // if (this.memberService.isMemberTwoSelected) {

            this.memberService.setMemberTwo(true);
            this.memberService.isMemberTwoSelected = true;
            // } else {
            // this.memberService.setMemberTwo(false);
            // this.memberService.isMemberTwoSelected = false;

            // }
          }
        } else if (event.column.colDef.field === 'atllevelApproverTwo') {
          if (atlLevelApproverTwoInstance.length > 0) {
            const wrapperAtlLevvelTwoApproverInstance = atlLevelApproverTwoInstance[0];
            const frameworkAtlLevvelTwoApproverInstance = wrapperAtlLevvelTwoApproverInstance.getFrameworkComponentInstance();
            // if (frameworkAtlLevvelTwoApproverInstance.selectedAtlLevelApproverTwo === null) {
            this.memberService.setAltMemberTwo(true);
            // }
          }
        }
      }
    }
  }

  /**
   * Fires when the ag-grid is loaded.
   * @param params the ag-grid api.
   */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.governanceGrid = document.querySelector('#governanceGrid');
    this.gridApi.sizeColumnsToFit();
  }

  /**
   * Emitts the community governance level to de parent component.
   * @param selectedGovernance the community governance level to be emitted.
   */
  onGovernanceLevelChange(selectedGovernance: GovernanceLevel) {
    // if (selectedGovernance !== undefined && selectedGovernance !== null) {
    this.governanceLevelChange.emit(selectedGovernance);
    // }
  }

}
