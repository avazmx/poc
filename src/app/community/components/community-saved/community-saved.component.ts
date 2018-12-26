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
  savedDef;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private savedGrid;
  communityObject: Community;
  communityDetails: boolean;

  constructor(private store: Store<Community>) {
    // Row Sample
    this.rowData = [];

    // AG Grid Component Info
    this.savedDef = savedDef;
    this.frameworkComponents = {};

    // More Info Boolean
    this.communityDetails = false;
  }

  ngOnInit() {
    this.store.select('community').subscribe((obj) => {
      this.communityObject = obj;
      console.log(this.communityObject);
    });
  }

  // AG-Grid
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.savedGrid = document.querySelector('#savedGrid');

    const newData = {
      name: this.communityObject.name,
      description: this.communityObject.description
    };

    // We add the row to the ag-grid
    this.gridApi.updateRowData({ add: [newData] });
  }

  onSelectionChanged(e) {
    console.log(e);
    this.communityDetails = !this.communityDetails;
  }

}
