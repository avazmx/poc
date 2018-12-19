import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';
import { attributesDef } from '../../../models/attributes-def';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})

export class CommunitySelectComponent implements OnInit, ICellRendererAngularComp {
  altData;
  attributesDef;
  allDistricts: District[] = [];
  states: State[];
  allStates: State[] = [];
  public slicLow: number;
  public slicHigh: number;
  public groundChecked: boolean;
  public threeDsChecked: boolean;
  public twoDsChecked: boolean;
  public oneDsChecked: boolean;
  community$: Observable<Community>;
  CommunityObject: Community;

  constructor(private store: Store<Community>) {
    this.groundChecked = false;
    this.threeDsChecked = false;
    this.twoDsChecked = false;
    this.oneDsChecked = false;
    this.attributesDef = attributesDef;
    this.slicLow = 1000;
    this.slicHigh = 6000;
  }

  ngOnInit() { }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  // groundCheckedSelected checkmark boolean
  groundCheckedSelected() {
    this.groundChecked = !this.groundChecked;
  }

  // threeDsCheckedSelected checkmark boolean
  threeDsCheckedSelected() {
    this.threeDsChecked = !this.threeDsChecked;
  }

  // twoDsCheckedSelected checkmark boolean
  twoDsCheckedSelected() {
    this.twoDsChecked = !this.twoDsChecked;
  }

  // oneDsCheckedSelected checkmark boolean
  oneDsCheckedSelected() {
    this.oneDsChecked = !this.oneDsChecked;
  }

  slicLowChange(event) {
    this.slicLow = event;
    console.log(this.slicLow);
    console.log(this.slicHigh);
    if (this.slicLow > this.slicHigh) {
      return this.slicHigh;
    }
  }

  slicHighChange(event) {
    this.slicHigh = event;
    console.log(this.slicHigh);
    console.log(this.slicLow);
    if (this.slicHigh < this.slicLow) {
      return this.slicLow;
    }
  }

}
