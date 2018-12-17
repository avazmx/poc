import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CommunityType } from 'src/app/community/models/community-type.model';
import { Community } from 'src/app/community/models/community.model';
import { GeoService } from 'src/app/community/models/geo-services.model';
import { GovernanceLevel } from 'src/app/community/models/governance-level.model';
import { Member } from 'src/app/community/models/member.model';
import { CountrySelectComponent } from 'src/app/shared/components/country-select/country-select.component';
import { DistrictSelectComponent } from 'src/app/shared/components/district-select/district-select.component';
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';

import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from '../../../services/community.service';
import * as communityActions from '../../../store/actions/community-attributes.actions';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { StateSelectComponent } from 'src/app/shared/components/state-select/state-select.component';

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

    this.CommunityObject = {
      communityId: 0,
      communityType: {} as CommunityType,
      name: '',
      description: '',
      geoServices: {} as GeoService[],
      members: {} as Member[],
      governance: {} as GovernanceLevel[],
      attributes: {
        state: {} as State,
        district: {} as District,
        country: {} as Country
      }
    };

    // AG Grid framework info
    this.attributesDef = attributesDef;
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
      selectCountryCell: CountrySelectComponent,
      selectDistrictCell: DistrictSelectComponent,
      selectStateCell: StateSelectComponent
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

  changeColor() {
    // If form is invalid (red)
    this.colorError = 'colorError';
    // if (this.form.get('community_type').hasError('required') && this.form.get('community_type').touched) {
    //   this.colorError = 'colorError';
    // } else {
    //   this.colorError = '';
    // }
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
      slicLow: '1000',
      slicHigh: '6000',
      bu: 'bu',
      gnd: 'gnd',
      threeDs: 'threeDs',
      twoDs: 'twoDs',
      oneDs: 'oneDs'
    };
    const res = this.gridApi.updateRowData({ add: [newData] });
    this.newRow = true;
    const nodes = this.gridApi.getSelectedNodes();

    this.communityGeoServices.push();
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

          const countryInstance = this.gridApi.getCellRendererInstances(countryParams);
          const districtInstance = this.gridApi.getCellRendererInstances(districtParams);
          const stateInstance = this.gridApi.getCellRendererInstances(stateParams);

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
