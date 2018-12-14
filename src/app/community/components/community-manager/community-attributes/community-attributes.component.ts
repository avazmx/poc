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

  gridApi;
  gridColumnApi;
  frameworkComponents;
  rowData: any;
  altData: any;
  attributesDef;
  attributesGrid;
  countries;
  newCount = 1;

  formIsValid: EventEmitter<boolean>;
  CommunityObject: Community;


  community$: Observable<Community>;

  constructor(
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private store: Store<Community>
  ) {
    this.newRow = false;
    this.rowData = [];

    this.CommunityObject = {
      communityId: 100,
      communityType: {} as CommunityType,
      name: 'Mexico',
      description: 'very good place',
      geoServices: {} as GeoService[],
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
  }

  ngOnInit() {
    console.log(this.communityObject);

    // We create the form.
    /*
    this.form = this._formBuilder.group({
      communityType: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.formIsValid = new EventEmitter();
    */
    this.community$ = this.store.select('community');
    this.community$.subscribe((obj) => {
      console.log('subscription ', obj);
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

    this.communityObject.push(this.example);
    this.attributesData.emit(this.communityObject);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    console.log('ahh');
    this.store.dispatch(new CommunityAttributesActions.CommunityInitialize(this.CommunityObject));
  }

  checkLength($event) {
    this.isInputFilled.emit($event.target);
  }
}
