import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CommunityType } from 'src/app/community/models/community-type.model';
import { Community } from 'src/app/community/models/community.model';
import { GeoService } from 'src/app/community/models/geo-services.model';
import { BusinessUnitSelectComponent } from 'src/app/shared/components/business-unit-select/business-unit-select.component';
import { CountrySelectComponent } from 'src/app/shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from 'src/app/shared/components/district-select/district-select.component';
import { StateSelectComponent } from 'src/app/shared/components/state-select/state-select.component';

import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from '../../../services/community.service';
import * as communityActions from '../../../store/actions/community-attributes.actions';
import { CommunitySelectComponent } from '../community-select/community-select.component';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})

export class CommunityAttributesComponent implements OnInit, OnDestroy {
  @Output() isFormValid: EventEmitter<boolean> = new EventEmitter();
  communityObject: Community;
  communitySubscription: Subscription;
  loading = true;

  form: FormGroup;
  headerHeight = 38;
  communityTypes: CommunityType[];
  newRow: boolean;
  attributesObject: any;

  gridApi;
  gridColumnApi;
  frameworkComponents;
  rowData: any;
  altData: any;
  attributesDef;
  attributesGrid;
  countries;
  newCount = 1;
  colorError: string;

  /**
   * Constructor of the component we initialize the framework components.
   * @param formBuilder formBuilder instance to get the form initialization.
   * @param communityService Exposes the methods to load the community types.
   * @param store Ngrx store to get the community object.
   */
  constructor(private formBuilder: FormBuilder, private communityService: CommunityService, private store: Store<Community>) {
    this.newRow = false;
    this.rowData = [];
    this.attributesDef = attributesDef;
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
      selectCountryCell: CountrySelectComponent,
      selectDistrictCell: DistrictSelectComponent,
      selectStateCell: StateSelectComponent,
      selectBusinessUnitCell: BusinessUnitSelectComponent,
    };
  }

  /**
   * Create the form and subscribe to the store so we can use the community object.
   */
  ngOnInit() {
    // Build the form.
    this.form = this.formBuilder.group({
      community_type: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // Subscribe to the form changes.
    this.form.valueChanges.subscribe(() => {
      this.isFormValid.emit(this.form.valid);
    });

    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((communityUpdated) => {
      this.communityObject = communityUpdated;
    });

    // Subscribe to the communitytype service.
    this.communityService.getCommunityTypes().subscribe(types => {
      this.communityTypes = types;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.communityTypes = this.communityService.getHardCodedCommunityTypes();
      this.loading = false;
    });
  }

  /**
   * When the grid is loaded this method is executed
   * @param params object recived when the grid is ready.
   */
  onGridReady(params) {
    // Fill the api properties.
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    // Renderize the ag-grid size.
    this.gridApi.setDomLayout('autoHeight');
    this.attributesGrid = document.querySelector('#attributesGrid');
    params.api.sizeColumnsToFit();
  }

  /**
   * Creates a new row in the ag-grid.
   */
  createNewRowData() {
    // Initial row status.
    const newData = {
      country: 'country',
      district: 'district',
      state: 'state',
      slicLow: 'slicLow',
      slicHigh: 'slicHigh',
      bu: 'bu',
      gnd: 'gnd',
      threeDs: 'threeDs',
      twoDs: 'twoDs',
      oneDs: 'oneDs'
    };
    const res = this.gridApi.updateRowData({ add: [newData] });
    this.communityObject.activeRow++;
    this.store.dispatch(new communityActions.ActiveRow(this.communityObject));
    this.newRow = true;

    // We add the row to the ag-grid
    this.gridApi.updateRowData({ add: [newData] });

    // We update the activate row in order to fill and change the new row selects.
    this.communityObject.activeRow++;
    this.store.dispatch(new communityActions.ActiveRow(this.communityObject));
    this.newRow = true;
  }

  /**
   * This method gets all the row data in order to send it to the geoservice store.
   * @param event the ag-grid api.
   */
  onSelectionChanged(event: any) {
    if (event) {
      // Getting the selected rows of the grid, rows that are checked.
      const selectedData: GeoService[] = this.gridApi.getSelectedNodes().map(node => node.data);

      // Get the nodes of the grid, all the nodes.
      const renderedNodes: any[] = this.gridApi.getRenderedNodes();

      // if we have nodes then iterate thru the selected data.
      if (renderedNodes.length > 0) {
        for (let index = 0; index < selectedData.length; index++) {

          // Get the node parameters.
          const node = renderedNodes[index];
          const countryParams = { columns: ['country'], rowNodes: [node] };
          const districtParams = { columns: ['district'], rowNodes: [node] };
          const stateParams = { columns: ['state'], rowNodes: [node] };
          const groundParams = { columns: ['gnd'], rowNodes: [node] };
          const threeDsParams = { columns: ['threeDs'], rowNodes: [node] };
          const twoDsParams = { columns: ['twoDs'], rowNodes: [node] };
          const oneDsParams = { columns: ['oneDs'], rowNodes: [node] };

          // Get the instance from the node parameters.
          const countryInstance = this.gridApi.getCellRendererInstances(countryParams);
          const districtInstance = this.gridApi.getCellRendererInstances(districtParams);
          const stateInstance = this.gridApi.getCellRendererInstances(stateParams);
          const groundInstance = this.gridApi.getCellRendererInstances(groundParams);
          const threeDsInstance = this.gridApi.getCellRendererInstances(threeDsParams);
          const twoDsInstance = this.gridApi.getCellRendererInstances(twoDsParams);
          const oneDsInstance = this.gridApi.getCellRendererInstances(oneDsParams);

          // Validate if we get the instances and fetch the geoservice object.
          if (countryInstance.length > 0) {
            const wapperCountryInstance = countryInstance[0];
            const frameworkCountryInstance = wapperCountryInstance.getFrameworkComponentInstance();
            selectedData[index].country = frameworkCountryInstance.selectedCountry;
          }

          if (districtInstance.length > 0) {
            const wapperDistrictInstance = districtInstance[0];
            const frameworkDistrictInstance = wapperDistrictInstance.getFrameworkComponentInstance();
            selectedData[index].district = frameworkDistrictInstance.selectedDistrict;
          }

          if (stateInstance.length > 0) {
            const wrapperStateInstance = stateInstance[0];
            const frameworkStateInstance = wrapperStateInstance.getFrameworkComponentInstance();
            selectedData[index].state = frameworkStateInstance.selectedState;
          }

          if (groundInstance.length > 0) {
            const wrapperGroundInstance = groundInstance[0];
            const frameworkGroundInstance = wrapperGroundInstance.getFrameworkComponentInstance();
            selectedData[index].ground = frameworkGroundInstance.groundChecked;
          }

          if (threeDsInstance.length > 0) {
            const wrapperThreeDsInstance = threeDsInstance[0];
            const frameworkThreeDsInstance = wrapperThreeDsInstance.getFrameworkComponentInstance();
            selectedData[index].threeDs = frameworkThreeDsInstance.threeDsChecked;
          }

          if (twoDsInstance.length > 0) {
            const wrapperTwoDsInstance = twoDsInstance[0];
            const frameworkTwoDsInstance = wrapperTwoDsInstance.getFrameworkComponentInstance();
            selectedData[index].twoDs = frameworkTwoDsInstance.twoDsChecked;
          }

          if (oneDsInstance.length > 0) {
            const wrapperOneDsInstance = oneDsInstance[0];
            const frameworkOneDsInstance = wrapperOneDsInstance.getFrameworkComponentInstance();
            selectedData[index].oneDs = frameworkOneDsInstance.oneDsChecked;
          }
        }
      }

      // We asign the selected data to the gioservice object in the community and dispatch the action.
      this.communityObject.geoServices = selectedData;
      this.store.dispatch(new communityActions.AddAttributes(this.communityObject));
    }
  }

  /**
   * When the component is destroyed then we unsubscribe to the community subscription.
   */
  ngOnDestroy() {
    this.communitySubscription.unsubscribe();
  }
}
