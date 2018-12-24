import { Component, OnInit } from '@angular/core';
import { savedDef } from '../../models/saved-def';
import { Community } from '../../models/community.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ups-community-saved',
  templateUrl: './community-saved.component.html',
  styleUrls: ['./community-saved.component.scss']
})
export class CommunitySavedComponent implements OnInit {
  rowData;
  private savedDef;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private savedGrid;
  communityObject: Community;

  constructor(private store: Store<Community>) {
    // Row Sample
    this.rowData = [];

    // AG Grid Component Info
    this.savedDef = savedDef;
    this.frameworkComponents = {};

  }

  ngOnInit() {
    this.store.select('community').subscribe((obj) => {
      this.communityObject = obj;
    });
  }

  // AG-Grid
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.savedGrid = document.querySelector('#savedGrid');
  }

}
