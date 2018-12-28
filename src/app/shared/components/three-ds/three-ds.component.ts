import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ups-three-ds',
  templateUrl: './three-ds.component.html',
  styleUrls: ['./three-ds.component.scss']
})
export class ThreeDsComponent implements ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  public threeChecked = false;
  public currentRow: number;

  constructor() { }

  // AG Grid Initialize
  agInit(params: any) {
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
}
