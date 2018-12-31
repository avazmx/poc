import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';

@Component({
  selector: 'ups-ground-select',
  templateUrl: './ground-select.component.html',
  styleUrls: ['./ground-select.component.scss']
})
export class GroundSelectComponent implements ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  public groundChecked = false;
  public communityObject: Community;
  public isShow = false;

  public currentRow: number;

  constructor(private store: Store<Community>) { }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };

    this.currentRow = +this.params.node.id;
    this.store.select('community').subscribe((obj: Community) => {
      if (obj.activeTab === 1 && obj.geoServices && obj.geoServices[this.currentRow]) {
        this.groundChecked = obj.geoServices[this.currentRow].ground;
      }
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }
}
