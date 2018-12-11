import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommunityService } from '../../../services/community.service';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { columnDef } from '../../../models/column-def';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})

export class CommunityAttributesComponent implements OnInit {
  @ViewChild('localForm') formFromLocal;
  form: FormGroup;
  headerHeight = 38;
  countries: any;
  newRow: boolean;

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
    ) {
    this.newRow = false;
    this.rowData = [
      // { country: 'Toyota', district: 'Celica', state: 35000 },
      // { country: 'Ford', district: 'Mondeo', state: 32000 },
      // { country: 'Porsche', district: 'Boxter', state: 72000 }
    ];

    this.columnDefs = columnDef;
/*
    this.columnDefs = [
      {
        headerName: 'Country',
        field: 'country',
        // cellRendererFramework: CommunitySelectComponent,
        cellRenderer: 'customizedCountryCell'
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
    ];*/

    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
    };

  }

  formIsValid: EventEmitter<boolean>;

  ngOnInit() {

    // We create the form.
    this.form = this._formBuilder.group({
      community_type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // We emit an event if the form changes.
    this.formIsValid = new EventEmitter();
    this.getCommunityType();
  }

  getCommunityType() {
    this._communityService.getCountries()
      .subscribe(data => {
        this.countries = data;
        console.log(this.countries);
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
      country: 'country',
      district: 'district',
      state: 'state',
      slicLow: 'slicLow',
      slicHigh: 'slicHigh',
      bu: 'bu'
    };
    var res = this.gridApi.updateRowData({ add: [newData] });
    this.newRow = true;
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
