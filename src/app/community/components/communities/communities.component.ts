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
  communityDetails: boolean;
  communities: Community;

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
    // Loading of the community object
    this.store.select('community').subscribe((obj) => {
      this.communities = obj;
      console.log(this.communities);
    });
  }

  // AG-Grid Initialize
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // Necessary info for the loading of AG Grid
    this.gridApi.setDomLayout('autoHeight');
    this.communitiesGrid = document.querySelector('#communitiesGrid');

    // Info of the new ag-grid row
    const newData = {
      name: this.communityObject.name,
      description: this.communityObject.description
    };

    // We add the row to the ag-grid
    this.gridApi.updateRowData({ add: [newData] });
  }

/**
 * When you click on the plus sign below "More info",
 * it will show more information about the specific community that has been selected.
 * "communityDetails" is a boolean that will hide and show the info about GeoServices, Members and Governance.
 */
  showMore() {
    this.communityDetails = !this.communityDetails;
  }

}
