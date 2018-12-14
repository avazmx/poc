import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { CommunityType } from 'src/app/community/models/community-type.model';
import { Community } from 'src/app/community/models/community.model';
import { GeoService } from 'src/app/community/models/geo-services.model';
import { GovernanceLevel } from 'src/app/community/models/governance-level.model';
import { Member } from 'src/app/community/models/member.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';

import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from '../../../services/community.service';
import { CommunitySelectComponent } from '../community-select/community-select.component';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})

export class CommunityAttributesComponent implements OnInit, OnChanges, OnDestroy {
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
  communitySubscription: Subscription;

  loading = true;
      
  constructor(
    private _formBuilder: FormBuilder,
    private communityService: CommunityService,
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
    this.form = this._formBuilder.group({
      community_type: [null, Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // We emit an event if the form changes.
    this.formIsValid = new EventEmitter();

    console.log(this.communityObject);
    
    this.community$ = this.store.select('community');
    this.community$.subscribe((obj) => {
      console.log('subscription ', obj);
    });

    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      console.log('Subscription => ', obj);
    });

    this.communityService.getCommunityTypes()
      .subscribe(types => {
        this.communityTypes = types;
        this.loading = false;
      }, (error: HttpErrorResponse) => {
        console.log('Error trying to lad the community type list, I will load hardcoded data');
        this.communityTypes = this.communityService.getHardCodedCommunityTypes();
        this.loading = false;
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
    this.store.dispatch(new CommunityAttributesActions.CommunityInitialize(this.CommunityObject));
  }

  checkLength($event) {
    this.isInputFilled.emit($event.target);
  }

  ngOnDestroy() {
    this.communitySubscription.unsubscribe();
  }

}
