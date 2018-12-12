import { Component, OnInit, ViewChild, EventEmitter, Output, Input, OnChanges } from '@angular/core';
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

export class CommunityAttributesComponent implements OnInit, OnChanges {
  @Output() attributesData = new EventEmitter();
  @Output() isInputFilled: EventEmitter<any> = new EventEmitter();
  @Input() communityObject;
  @Output() dataReady: EventEmitter<Community> = new EventEmitter();
  @ViewChild('localForm') formFromLocal;
  form: FormGroup;
  headerHeight = 38;
  communityTypes: any;
  newRow: boolean;
  attributesObject: any;
  example = { name: 'ho' };

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
  CommunityObject: Community;


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

    this.CommunityObject = {
      community_id: 100,
      community_type: {} as CommunityType ,
      name: 'Mexico',
      description: 'very good place',
      geo_services: {} as GeoService[],
      members: {} as Member[],
      governance: {} as GovernanceLevel[],
      attributes: {
        state: {} as State,
        district: {} as District,
        country: {} as Country
      }
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

  ngOnChanges() {
    /* this._communityService.subject
      .subscribe( data => {
        this.communityObject = data;
    }); */
  }

  ngOnInit() {
    console.log(this.communityObject);

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
    this.store.dispatch(new CommunityAttributesActions.ChangeName('Thor'));
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
      bu: 'bu',
      gnd: 'gnd',
      threeDs: 'threeDs',
      twoDs: 'twoDs',
      oneDs: 'oneDs'
    };
    var res = this.gridApi.updateRowData({ add: [newData] });
    this.newRow = true;

    this.communityObject.push(this.example);
    this.attributesData.emit(this.communityObject);
    console.log(this.communityObject);
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
