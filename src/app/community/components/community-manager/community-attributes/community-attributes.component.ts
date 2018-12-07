import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/shared/services/country.service';
import { NgOption } from '@ng-select/ng-select';
import { CommunityService } from '../../../services/community.service';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})
export class CommunityAttributesComponent implements OnInit {
  @ViewChild('localForm') formFromLocal;
  form: FormGroup;
  headerHeight = 38;
  communityTypes: any;

  private gridApi;
  private gridColumnApi;
  private rowData;
  private attributesGrid;
  newCount = 1;

  columnDefs = [
    {
      headerName: 'Country',
      field: 'country',
      cellRenderer: params => {
        return `<select>
          <option>option 1</option>
          <option>option 2</option>
        </select>`;
      }
    },
    { headerName: 'District', field: 'district', editable: true },
    { headerName: 'State/Province', field: 'state', editable: true },
    { headerName: 'SLIC Range Low', field: 'slicLow', editable: true },
    { headerName: 'SLIC Range High', field: 'slicHigh', editable: true },
    { headerName: 'Business Unit', field: 'bu', editable: true },
    { headerName: 'GND', field: 'gnd', editable: true },
    { headerName: '3DS', field: 'three', editable: true },
    { headerName: '2DS', field: 'two', editable: true },
    { headerName: '1DA', field: 'one', editable: true },
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private _countriesService: CountryService
    ) {

    this.rowData = [
      { country: 'Toyota', district: 'Celica', state: 35000 },
      { country: 'Ford', district: 'Mondeo', state: 32000 },
      { country: 'Porsche', district: 'Boxter', state: 72000 }
    ];

  }

  countries: NgOption[] = [];
  // communityTypes: NgOption[] = [];
  formIsValid: EventEmitter<boolean>;

  ngOnInit() {

    // We create the form.
    this.form = this._formBuilder.group({
      community_type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // We fill the countries from the countries service.
    this._countriesService.getCountries().forEach(element => {
      this.countries.push({ id: element.country_id, value: element.name });
    });

    // We fill the community types.
    // this._communityService.getCommunityTypes().forEach(element => {
    //  this.communityTypes.push({ id: element.community_type_id, name: element.name });
    //  console.log(element);
    //  console.log(this.communityTypes);
    // });

    // We emit an event if the form changes.
    this.formIsValid = new EventEmitter();
    this.getCommunityType();
  }

  getCommunityType() {
    this._communityService.getCommunityTypes().subscribe(
      data => {
        this.communityTypes = data;
        console.log(this.communityTypes);
    });
  }

  /* AG-Grid */
  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    this.gridApi.setDomLayout('autoHeight');
    this.attributesGrid = document.querySelector('#attributesGrid');

    params.api.sizeColumnsToFit();
  }

  createNewRowData() {
    console.log(this.rowData);
    const newData = {
      country: 'Toyota ' + this.newCount,
      district: 'Celica ' + this.newCount,
      state: 35000 + this.newCount * 17,
      slicLow: 'Headless',
      slicHigh: 'Little',
      bu: 'Airbag'
    };
    // this.newCount++;
    var res = this.gridApi.updateRowData({ add: [newData] });
    console.log(this.rowData);
  }

  onSubmit() {
    debugger;
    if (this.form.invalid) {
      return;
    }
    const communityType: CommunityType = {
      community_type_id: this.form.controls['community_type'].value,
      name: this.form.controls['community_type'].value
    };

    this._communityService.setCommunityAttributes(communityType, this.form.get('name').value, this.form.get('description').value);
    this.formIsValid.emit(true);
  }


}


/**
 *
 *
 * interface Community {
    community_id: number;
    community_type: CommunityType;
    name: string;
    description: string;
    geo_services: GeoService[];
    members: Member[];
    governance: GovernanceLevel[];
}
 */
