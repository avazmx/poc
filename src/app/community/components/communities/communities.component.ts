import { Component, OnInit } from '@angular/core';
import { communitiesDef } from '../../models/communities-def';
import { Community } from '../../models/community.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ups-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss']
})
export class CommunitiesComponent implements OnInit {
  rowData;
  communitiesDef;
  private frameworkComponents;
  private gridApi;
  private gridColumnApi;
  private communitiesGrid;
  communityObject: Community;
  communityDetails: boolean;

  constructor(private store: Store<Community>) {
    // Row Sample
    this.rowData = [];

    // AG Grid Component Info
    this.communitiesDef = communitiesDef;
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
    this.communitiesGrid = document.querySelector('#communitiesGrid');

    const newData = {
      name: this.communityObject.name,
      description: this.communityObject.description
    };

    // We add the row to the ag-grid
    this.gridApi.updateRowData({ add: [newData] });
  }

  onSelectionChanged(e) {
    this.communityDetails = !this.communityDetails;
  }

}
