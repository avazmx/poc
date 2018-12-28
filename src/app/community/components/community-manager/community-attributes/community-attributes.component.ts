import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CommunityType } from 'src/app/community/models/community-type.model';
import { Community } from 'src/app/community/models/community.model';
import { GeoService } from 'src/app/community/models/geo-services.model';
import { BusinessUnitSelectComponent } from 'src/app/shared/components/business-unit-select/business-unit-select.component';
import { CommunitySelectComponent } from 'src/app/shared/components/community-select/community-select.component';
import { CountrySelectComponent } from 'src/app/shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from 'src/app/shared/components/district-select/district-select.component';
import { StateSelectComponent } from 'src/app/shared/components/state-select/state-select.component';
import { NgSelectComponent } from '@ng-select/ng-select';
import { AgGridNg2 } from 'ag-grid-angular';

import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from '../../../services/community.service';
import * as communityActions from '../../../store/actions/community-attributes.actions';
import * as fromCommunity from '../../../store/reducers/community-attributes.reducers';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})

export class CommunityAttributesComponent implements OnInit, OnDestroy {

  @ViewChild(NgSelectComponent) ngSelect: NgSelectComponent;
  @ViewChild(AgGridNg2) agGrid: AgGridNg2;

  @Output() isFormValid: EventEmitter<boolean> = new EventEmitter();
  @Output() isRowSelected: EventEmitter<boolean> = new EventEmitter();
  agGridSelection: boolean;

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
  constructor(private formBuilder: FormBuilder, private communityService: CommunityService, private store: Store<fromCommunity.State>) {
    this.newRow = false;
    this.rowData = [];
    this.attributesDef = attributesDef;
    this.agGridSelection = false;
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
      communityType: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
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
    // this.gridColumnApi.setColumnVisible('checkbox', false);
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
      businessUnit: 'businessUnit',
      ground: 'ground',
      three: 'three',
      two: 'two',
      one: 'one',
    };
    // We update the activate row in order to fill and change the new row selects.
    // Hectorf: I commented this because we are managing this with the cellClickEvent
    // this.communityObject.activeRow++;
    // this.store.dispatch(new communityActions.ActiveRow(this.communityObject));
    this.newRow = true;

    // We add the row to the ag-grid
    this.agGrid.api.updateRowData({ add: [newData] });
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
          const slicLowParams = { columns: ['slicLow'], rowNodes: [node] };
          const slicHighParams = { columns: ['slicHigh'], rowNodes: [node] };
          const businessUnitParams = { columns: ['businessUnit'], rowNodes: [node] };
          const groundParams = { columns: ['ground'], rowNodes: [node] };
          const threeParams = { columns: ['three'], rowNodes: [node] };
          const twoParams = { columns: ['two'], rowNodes: [node] };
          const oneParams = { columns: ['one'], rowNodes: [node] };

          // Get the instance from the node parameters.
          const countryInstance = this.gridApi.getCellRendererInstances(countryParams);
          const districtInstance = this.gridApi.getCellRendererInstances(districtParams);
          const stateInstance = this.gridApi.getCellRendererInstances(stateParams);
          const slicLowInstance = this.gridApi.getCellRendererInstances(slicLowParams);
          const slicHighInstance = this.gridApi.getCellRendererInstances(slicHighParams);
          const businessUnitInstance = this.gridApi.getCellRendererInstances(businessUnitParams);
          const groundInstance = this.gridApi.getCellRendererInstances(groundParams);
          const threeInstance = this.gridApi.getCellRendererInstances(threeParams);
          const twoInstance = this.gridApi.getCellRendererInstances(twoParams);
          const oneInstance = this.gridApi.getCellRendererInstances(oneParams);

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

          if (slicLowInstance.length > 0) {
            const wrapperSlicLowInstance = slicLowInstance[0];
            const frameworkSlicLowInstance = wrapperSlicLowInstance.getFrameworkComponentInstance();
            selectedData[index].slicRangeLow = frameworkSlicLowInstance.slicLow;
          }

          if (slicHighInstance.length > 0) {
            const wrapperSlicHighInstance = slicHighInstance[0];
            const frameworkSlicHighInstance = wrapperSlicHighInstance.getFrameworkComponentInstance();
            selectedData[index].slicRangeHigh = frameworkSlicHighInstance.slicHigh;
          }

          if (businessUnitInstance.length > 0) {
            const wrapperBusinessUnitInstance = businessUnitInstance[0];
            const frameworkBusinessUnitInstance = wrapperBusinessUnitInstance.getFrameworkComponentInstance();
            selectedData[index].businessUnit = frameworkBusinessUnitInstance.selectedBusinessUnit;
          }

          if (groundInstance.length > 0) {
            const wrapperGroundInstance = groundInstance[0];
            const frameworkGroundInstance = wrapperGroundInstance.getFrameworkComponentInstance();
            selectedData[index].ground = frameworkGroundInstance.groundChecked;
          }

          if (threeInstance.length > 0) {
            const wrapperThreeDsInstance = threeInstance[0];
            const frameworkThreeDsInstance = wrapperThreeDsInstance.getFrameworkComponentInstance();
            selectedData[index].three = frameworkThreeDsInstance.threeChecked;
          }

          if (twoInstance.length > 0) {
            const wrapperTwoDsInstance = twoInstance[0];
            const frameworkTwoDsInstance = wrapperTwoDsInstance.getFrameworkComponentInstance();
            selectedData[index].two = frameworkTwoDsInstance.twoChecked;
          }

          if (oneInstance.length > 0) {
            const wrapperOneInstance = oneInstance[0];
            const frameworkOneInstance = wrapperOneInstance.getFrameworkComponentInstance();
            selectedData[index].one = frameworkOneInstance.oneChecked;
          }
        }
      }

      // We assign the selected data to the gioservice object in the community and dispatch the action.
      this.communityObject.geoServices = selectedData;
      this.store.dispatch(new communityActions.AddAttributes(this.communityObject));
    }
  }

  /**
   * This method fires when the user select or unselect a row.
   * @param isSelected If the row is selected then the value is true else false,
   */
  onRowSelected(isSelected: boolean) {
    this.isRowSelected.emit(isSelected);
  }

  /**
   * This method is executed every time an ag-grid cell is clicked, we dispatch an action that indicates the row id we are editing.
   * @param rowId the selected row id.
   */
  onCellClicked(rowId: string) {
    this.store.dispatch(new communityActions.ActiveRow(+rowId));
  }

  /**
   * When the component is destroyed then we unsubscribe to the community subscription.
   */
  ngOnDestroy() {
    this.communitySubscription.unsubscribe();
  }
}
