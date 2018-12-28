import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

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
