import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CommunityType } from 'src/app/community/models/community-type.model';
import { Community } from 'src/app/community/models/community.model';
import { GeoService } from 'src/app/community/models/geo-services.model';
// Components
import { CountrySelectComponent } from 'src/app/shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from 'src/app/shared/components/district-select/district-select.component';
import { StateSelectComponent } from 'src/app/shared/components/state-select/state-select.component';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { BusinessUnitSelectComponent } from 'src/app/shared/components/business-unit-select/business-unit-select.component';

import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from '../../../services/community.service';
import * as communityActions from '../../../store/actions/community-attributes.actions';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})

export class CommunityAttributesComponent implements OnInit, OnDestroy {
  @Output() attributesData = new EventEmitter();
  @Output() isInputFilled: EventEmitter<any> = new EventEmitter();
  @Output() dataReady: EventEmitter<Community> = new EventEmitter();

  // Hectorf
  @Output() isFormValid: EventEmitter<boolean> = new EventEmitter();
  CommunityObject: Community;
  rowSelection;

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

  // Hectorf
  communitySubscription: Subscription;
  communityGeoServices: GeoService[] = [];

  loading = true;

  constructor(private formBuilder: FormBuilder, private communityService: CommunityService, private store: Store<Community>) {
    this.newRow = false;
    this.rowData = [];

    // AG Grid framework info
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
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;
    });

    // Subscribe to the communitytype service.
    this.communityService.getCommunityTypes().subscribe(types => {
      this.communityTypes = types;
      this.loading = false;
    }, (error: HttpErrorResponse) => {
      console.log('Error trying to lad the community type list, I will load hardcoded data');
      this.communityTypes = this.communityService.getHardCodedCommunityTypes();
      this.loading = false;
    });
  }

  /**
   * When the grid is loaded this method is executed
   * @param params object recived when the grid is ready.
   */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.attributesGrid = document.querySelector('#attributesGrid');

    params.api.sizeColumnsToFit();
  }

  getSelectedRows() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }

  // Add Row Button
  createNewRowData() {
    const newData = {
      country: 'country',
      district: 'district',
      state: 'state',
      slicLow: 'slicLow',
      slicHigh: 'slicHigh',
      businessUnit: 'businessUnit',
      gnd: 'gnd',
      threeDs: 'threeDs',
      twoDs: 'twoDs',
      oneDs: 'oneDs'
    };

    const res = this.gridApi.updateRowData({ add: [newData] });
    this.CommunityObject.activeRow++;
    this.store.dispatch(new communityActions.ActiveRow(this.CommunityObject));
    this.newRow = true;
  }

  onDataChange(event: any) {
  }

  onSelectionChanged(event: any) {
    if (event) {
      const selectedData: GeoService[] = this.gridApi.getSelectedNodes().map(node => node.data);
      // Get the nodes of the grid.
      const renderedNodes: any[] = this.gridApi.getRenderedNodes();

      if (renderedNodes.length > 0) {
        for (let index = 0; index < selectedData.length; index++) {
          const node = renderedNodes[index];
          const countryParams = { columns: ['country'], rowNodes: [node] };
          const districtParams = { columns: ['district'], rowNodes: [node] };
          const stateParams = { columns: ['state'], rowNodes: [node] };
          const slicLowParams = { columns: ['slicLow'], rowNodes: [node] };
          const slicHighParams = { columns: ['slicHigh'], rowNodes: [node] };
          const businessUnitParams = { columns: ['businessUnit'], rowNodes: [node] };
          const groundParams = { columns: ['gnd'], rowNodes: [node] };
          const threeDsParams = { columns: ['threeDs'], rowNodes: [node] };
          const twoDsParams = { columns: ['twoDs'], rowNodes: [node] };
          const oneDsParams = { columns: ['oneDs'], rowNodes: [node] };

          const countryInstance = this.gridApi.getCellRendererInstances(countryParams);
          const districtInstance = this.gridApi.getCellRendererInstances(districtParams);
          const stateInstance = this.gridApi.getCellRendererInstances(stateParams);
          const slicLowInstance = this.gridApi.getCellRendererInstances(slicLowParams);
          const slicHighInstance = this.gridApi.getCellRendererInstances(slicHighParams);
          const businessUnitInstance = this.gridApi.getCellRendererInstances(businessUnitParams);
          const groundInstance = this.gridApi.getCellRendererInstances(groundParams);
          const threeDsInstance = this.gridApi.getCellRendererInstances(threeDsParams);
          const twoDsInstance = this.gridApi.getCellRendererInstances(twoDsParams);
          const oneDsInstance = this.gridApi.getCellRendererInstances(oneDsParams);

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
            selectedData[index].businessUnit = frameworkBusinessUnitInstance.businessUnit;
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
      this.CommunityObject.geoServices = selectedData;
      this.store.dispatch(new communityActions.AddAttributes(this.CommunityObject));
    }
  }

  checkLength($event) {
    this.isInputFilled.emit($event.target);
  }

  ngOnDestroy() {
    this.communitySubscription.unsubscribe();
  }

}
