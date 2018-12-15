import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { State } from '../../models/state.model';
import { StateService } from '../../services/state.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'ups-state-select',
  templateUrl: './state-select.component.html',
  styleUrls: ['./state-select.component.scss']
})
export class StateSelectComponent implements OnInit, OnDestroy, ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  states: State[];
  constructor(private stateService: StateService) { }

  ngOnInit() {
    this.stateService.getStates()
      .subscribe((countries: State[]) => {
        this.states = countries;
      }, (error: HttpErrorResponse) => {
        console.log('Error trying to load the coutries list, I will load hardcoded data');
        this.states = this.stateService.getHardCodedStates();
      });
  }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  onDistrictChange(selectedCountry: State) {

  }


  ngOnDestroy(): void {
    throw new Error("Method not implemented.");
  }
}
