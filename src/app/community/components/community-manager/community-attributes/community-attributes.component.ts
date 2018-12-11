import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/shared/services/country.service';
import { NgOption } from '@ng-select/ng-select';
import { CommunityService } from '../../../services/community.service';
import { CommunitySelectComponent } from '../community-select/community-select.component';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})

export class CommunityAttributesComponent implements OnInit, OnChanges {
  @Output() attributesData = new EventEmitter();
  @Input() communityObject;
  @ViewChild('localForm') formFromLocal;
  form: FormGroup;
  headerHeight = 38;
  communityTypes: any;
  newRow: boolean;
  attributesObject: any;

  example = [
    { name: 'hi' }
  ];

  private gridApi;
  private gridColumnApi;
  private frameworkComponents;
  rowData: any;
  altData: any;
  private columnDefs;
  private attributesGrid;
  newCount = 1;

  constructor(
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private _countriesService: CountryService
    ) {

    this.newRow = false;
    this.rowData = [
      { country: 'Toyota', district: 'Celica', state: 35000 },
      { country: 'Ford', district: 'Mondeo', state: 32000 },
      { country: 'Porsche', district: 'Boxter', state: 72000 }
    ];

    this.columnDefs = [
      {
        headerName: 'Country',
        field: this.altData,
        // cellRendererFramework: CommunitySelectComponent,
        cellRenderer: "customizedCountryCell"
        // cellRenderer : params => {
        //   return `
        //   <select>
        //     <option>{{country}}</option>
        //   </select>
        // `;
        // }
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

    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent
    };

  }

  countries: NgOption[] = [];
  // communityTypes: NgOption[] = [];
  formIsValid: EventEmitter<boolean>;

  ngOnChanges() {
    this._communityService.subject
      .subscribe( data => {
        this.communityObject = data;
    });
  }

  ngOnInit() {
    console.log(this.communityObject);

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
    const newData = {
      country: this.altData,
      district: 'Celica ' + this.newCount,
      state: 35000 + this.newCount * 17,
      slicLow: 'Headless',
      slicHigh: 'Little',
      bu: 'Airbag'
    };
    var res = this.gridApi.updateRowData({ add: [newData] });
    this.newRow = true;

    this.communityObject.push(this.example);
    this.attributesData.emit(this.communityObject);
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
