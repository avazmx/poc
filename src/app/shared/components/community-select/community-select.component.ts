import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})

export class CommunitySelectComponent implements ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;

  public slicLow: number;
  public slicHigh: number;
  public groundChecked = false;
  public threeChecked = false;
  public twoChecked = false;
  public oneChecked = false;

  public currentRow: number;
  community$: Observable<Community>;
  CommunityObject: Community;

  constructor(private store: Store<Community>) { }

  // AG Grid Initialize
  agInit(params: any) {
    this.slicLow = 1000;
    this.slicHigh = 10000;

    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };

    this.currentRow = +this.params.node.id;
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

  // threeCheckedSelected checkmark boolean
  threeCheckedSelected() {
    this.threeChecked = !this.threeChecked;
  }

  // twoCheckedSelected checkmark boolean
  twoCheckedSelected() {
    this.twoChecked = !this.twoChecked;
  }

  // oneCheckedSelected checkmark boolean
  oneCheckedSelected() {
    this.oneChecked = !this.oneChecked;
  }

  // Slic Low set event
  slicLowChange(event) {
    this.slicLow = +event;
    if (this.slicLow > this.slicHigh) {
      return this.slicHigh;
    }
  }

  // Slic High set event
  slicHighChange(event) {
    this.slicHigh = +event;
    if (this.slicHigh < this.slicLow) {
      return this.slicLow;
    }
  }

}
