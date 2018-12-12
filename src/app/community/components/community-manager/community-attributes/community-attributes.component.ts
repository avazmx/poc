import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommunityService } from '../../../services/community.service';
import { CommunitySelectComponent } from '../community-select/community-select.component';
import { attributesDef } from '../../../models/attributes-def';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';

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
  newRow: boolean;

  private gridApi;
  private gridColumnApi;
  private frameworkComponents;
  rowData: any;
  altData: any;
  private attributesDef;
  private attributesGrid;
  private countries;
  newCount = 1;

  formIsValid: EventEmitter<boolean>;
  @Output() isInputFilled: EventEmitter<any> = new EventEmitter();

  @Input() CommunityObject: Community;

  @Output() dataReady: EventEmitter<Community> = new EventEmitter();

  community$: Observable<Community>;

  constructor(
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private store: Store<Community>
    ) {
    /*this.community$ = this.store.select('community');
    this.community$.subscribe((obj) => {
      console.log('subscription ', obj);
    });*/
    this.newRow = false;
    this.rowData = [
      // { country: 'Toyota', district: 'Celica', state: 35000 },
      // { country: 'Ford', district: 'Mondeo', state: 32000 },
      // { country: 'Porsche', district: 'Boxter', state: 72000 }
    ];

    //this.columnDefs = columnDef;

    this.CommunityObject = {
      community_id: 100,
      community_type: {} as CommunityType ,
      name: 'Mexico',
      description: 'very good place',
      geo_services: {} as GeoService[],
      members: {} as Member[],
      governance: {} as GovernanceLevel[]
  }
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

    this.attributesDef = attributesDef;
    this.frameworkComponents = {
      customizedCountryCell: CommunitySelectComponent,
    };
    // Get community types
    this._communityService.getCommunityTypes()
      .subscribe(types => {
        this.communityTypes = types;
    });
  }

  ngOnInit() {
    // We create the form.
    this.form = this._formBuilder.group({
      community_type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    // We emit an event if the form changes.
    this.formIsValid = new EventEmitter();

    //console.log("ahh: " , this.store.select('community'));
    //let comOb: Community = {}
    this.community$ = this.store.select('community');
    this.community$.subscribe((obj) => {
      console.log('subscription ', obj);
    });
    //console.log("component payload ahh ",this.CommunityObject)
    //this.getCommunityType();
    //console.log("yeees: " + this.store.s
    //this.store.dispatch();
    //this.store.select('community');
    //this.store.dispatch(new CommunityAttributesActions.CommunityInitialize());
    //console.log("yees: " , type);
  }

  changeName() {
    this.store.dispatch(new CommunityAttributesActions.ChangeName('Thoooo'));
  }

  getCommunityType() {
      this._communityService.getCountries()
      .subscribe(data => {
      this.countries = data;
      return this.countries;
        //console.log(this.countries);

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
    console.log('ahh');
    this.store.dispatch(new CommunityAttributesActions.CommunityInitialize(this.CommunityObject));
    /*const communityType: CommunityType = {
      community_type_id: this.form.controls['community_type'].value,
      name: this.form.controls['community_type'].value,
      description: this.form.controls['description'].value
    };*/
   // this._communityService.setCommunityAttributes(communityType, this.form.get('name').value, this.form.get('description').value);
    this.formIsValid.emit(true);
  }

  checkLength($event) {
    this.isInputFilled.emit($event.target);
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
