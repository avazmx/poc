import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';

@Component({
  selector: 'ups-two-ds',
  templateUrl: './two-ds.component.html',
  styleUrls: ['./two-ds.component.scss']
})
export class TwoDsComponent implements ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  public twoChecked = false;

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
        this.twoChecked = obj.geoServices[this.currentRow].two;
      }
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }
}