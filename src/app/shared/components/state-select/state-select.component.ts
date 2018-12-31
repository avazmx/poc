import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Subscription } from 'rxjs';

import { State } from '../../models/state.model';
import { DistrictService } from '../../services/district.service';
import { StateService } from '../../services/state.service';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';

@Component({
  selector: 'ups-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss']
})

export class StateSelectComponent implements OnInit, OnDestroy, ICellRendererAngularComp {

  public cellValue: any;
  public params: any;
  public cell: any;

  currentRow: number;

  states: State[] = [];
  selectedState: State;
  isShow = false;
  communityObject: Community;

  districtIdSubscription: Subscription;
  constructor(private stateService: StateService, private districtService: DistrictService,
    private store: Store<Community>) { }


  ngOnInit() {
    this.currentRow = +this.params.node.id;
    this.store.select('community').subscribe((obj: Community) => {
      this.communityObject = obj;
      if (this.states.length === 0 && this.communityObject.geoServices && this.communityObject.geoServices.length > 0) {
        if (this.communityObject.activeTab === 1) {
          if (this.communityObject.geoServices[this.currentRow]) {
            this.states.push(this.communityObject.geoServices[this.currentRow].state);
            this.selectedState = this.communityObject.geoServices[this.currentRow].state;
            this.isShow = true;
          }
        } else if (this.communityObject.activeTab === 2) {
          if (this.communityObject.members && this.communityObject.members[this.currentRow]) {
            this.states.push(this.communityObject.members[this.currentRow].state);
            this.selectedState = this.communityObject.members[this.currentRow].state;
            this.isShow = true;
          }
        }
      }
    });
  }
  /**
   * When the ag-grid renders the cell this method is called.
   * @param params needed to format the component value.
   */
  agInit(params: any) {
    // Get all the properties needed when the component creates the cell.
    this.cellValue = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };

    // We Subscribe to the district change and we get all the filtered states.
    this.districtIdSubscription = this.districtService.getDistrictId().subscribe(
      (districtId: number) => {
        let filteredStates;
        this.stateService.getStates(districtId).subscribe((states: State[]) => {
          if (this.communityObject.activeTab === 2) {
            filteredStates = this.communityObject.geoServices.filter(geo =>
              districtId === geo.district.id
            );
            filteredStates.forEach(element => {
              const alreadyAdded = this.states.filter(stat =>
                stat.id === element.state.id
              );
              if (alreadyAdded.length < 1) {
                this.states.push(element.state);
              }
            });
          }
          if ((this.communityObject.activeRow === this.currentRow || this.states.length === 0)
            && (!filteredStates || filteredStates.length < 1)) {
            this.states = states;
          }
        }, (error: HttpErrorResponse) => {
          this.states = this.stateService.getHardCodedStates(districtId);
        });
      }
    );
  }

  /**
   * Fires everytime the cell changes value, return true if you dont want to handle any refresh logic.
   * @param params needed to format the component value.
   */
  refresh(params: any) {
    this.cellValue = params.value;
    return true;
  }

  /**
   * This method fires when the state select element changes, I validate that the selected element is bigger than 0.
   * @param selectedCountry the selected state id.
   */
  onStateChange(selectedCountry: string) {
    if (+selectedCountry > 0) {
      this.selectedState = this.states.filter(state => state.id === +selectedCountry)[0];
      this.stateService.setStateId(+this.selectedState);
    }
  }

  /**
   * When the component is not alive we unsubscrive to the district subject.
   */
  ngOnDestroy(): void {
    this.districtIdSubscription.unsubscribe();
  }
}
