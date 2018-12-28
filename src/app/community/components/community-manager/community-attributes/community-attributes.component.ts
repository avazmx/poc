import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
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

import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from '../../../services/community.service';
import { CommunityTypeService } from '../../../services/community-type.service';
import * as communityActions from '../../../store/actions/community-attributes.actions';
import * as fromCommunity from '../../../store/reducers/community-attributes.reducers';
import { GroundSelectComponent } from 'src/app/shared/components/ground-select/ground-select.component';
import { OneDaComponent } from 'src/app/shared/components/one-da/one-da.component';
import { TwoDsComponent } from 'src/app/shared/components/two-ds/two-ds.component';
import { ThreeDsComponent } from 'src/app/shared/components/three-ds/three-ds.component';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})

export class CommunityAttributesComponent implements OnInit, OnDestroy {
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
  isBack = false;

  /**
   * Constructor of the component we initialize the framework components.
   * @param formBuilder formBuilder instance to get the form initialization.
   * @param communityService Exposes the methods to load the community types.
   * @param store Ngrx store to get the community object.
   */
  constructor(private formBuilder: FormBuilder, private communityTypeService: CommunityTypeService, private store: Store<fromCommunity.State>) {
    this.newRow = false;
    this.rowData = [];
    this.attributesDef = attributesDef;
    this.agGridSelection = false;
    this.frameworkComponents = {
      threeDsCell: ThreeDsComponent,
      twoDsCell: TwoDsComponent,
      oneDaCell: OneDaComponent,
      groundCell: GroundSelectComponent,
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
    this.communityTypeService.getCommunityTypes().subscribe(types => {
      this.communityTypes = types;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      this.communityTypes = this.communityTypeService.getHardCodedCommunityTypes();
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
      slicLow: '',
      slicHigh: '',
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
    this.gridApi.updateRowData({ add: [newData] });
  }

  /**
   * This method gets all the row data in order to send it to the geoservice store.
   * @param event the ag-grid api.
   */
  onSelectionChanged(event: any) {
    if (event) {
      // debugger;
      // Getting the selected rows of the grid, rows that are checked.
      const selectedData: GeoService[] = this.gridApi.getSelectedNodes().map(node => node.data);

      // Get the nodes of the grid, all the nodes.
      const renderedNodes: any[] = this.gridApi.getRenderedNodes();

      // if we have nodes then iterate thru the selected data.
      if (renderedNodes.length > 0) {
        for (let index = 0; index < selectedData.length; index++) {

          // Get the node parameters.
          const node = renderedNodes[index];

          // Get the instance from the node parameters.
          const countryInstance = this.gridApi.getCellRendererInstances({ columns: ['country'], rowNodes: [node] });
          const districtInstance = this.gridApi.getCellRendererInstances({ columns: ['district'], rowNodes: [node] });
          const stateInstance = this.gridApi.getCellRendererInstances({ columns: ['state'], rowNodes: [node] });
          const businessUnitInstance = this.gridApi.getCellRendererInstances({ columns: ['businessUnit'], rowNodes: [node] });
          const groundInstance = this.gridApi.getCellRendererInstances({ columns: ['ground'], rowNodes: [node] });
          const threeInstance = this.gridApi.getCellRendererInstances({ columns: ['three'], rowNodes: [node] });
          const twoInstance = this.gridApi.getCellRendererInstances({ columns: ['two'], rowNodes: [node] });
          const oneInstance = this.gridApi.getCellRendererInstances({ columns: ['one'], rowNodes: [node] });

          // Validate if we get the instances and fetch the geoservice object.
          if (countryInstance.length > 0) {
            const frameworkCountryInstance = countryInstance[0].getFrameworkComponentInstance();
            selectedData[index].country = frameworkCountryInstance.selectedCountry;
          }

          if (districtInstance.length > 0) {
            const frameworkDistrictInstance = districtInstance[0].getFrameworkComponentInstance();
            selectedData[index].district = frameworkDistrictInstance.selectedDistrict;
          }

          if (stateInstance.length > 0) {
            const frameworkStateInstance = stateInstance[0].getFrameworkComponentInstance();
            selectedData[index].state = frameworkStateInstance.selectedState;
          }

          if (businessUnitInstance.length > 0) {
            const frameworkBusinessUnitInstance = businessUnitInstance[0].getFrameworkComponentInstance();
            selectedData[index].businessUnit = frameworkBusinessUnitInstance.selectedBusinessUnit;
          }

          if (groundInstance.length > 0) {
            const frameworkGroundInstance = groundInstance[0].getFrameworkComponentInstance();
            selectedData[index].ground = frameworkGroundInstance.groundChecked;
          }

          if (threeInstance.length > 0) {
            const frameworkThreeDsInstance = threeInstance[0].getFrameworkComponentInstance();
            selectedData[index].three = frameworkThreeDsInstance.threeChecked;
          }

          if (twoInstance.length > 0) {
            const frameworkTwoDsInstance = twoInstance[0].getFrameworkComponentInstance();
            selectedData[index].two = frameworkTwoDsInstance.twoChecked;
          }

          if (oneInstance.length > 0) {
            const frameworkOneInstance = oneInstance[0].getFrameworkComponentInstance();
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
