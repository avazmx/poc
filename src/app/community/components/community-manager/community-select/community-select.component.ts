import { Component, OnInit, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})
export class CommunitySelectComponent implements OnInit, ICellRendererAngularComp {
  altData: any;

  constructor() {
  }

  ngOnInit() {
    this.altData = [
      { country: 'Toyota' },
      { country: 'Ford' },
      { country: 'Porsche' },
      { country: 'Tesla' },
    ];
    console.log(this.altData);
  }

  agInit(params: any) {
    this.altData = params.value;
  }

  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

}
