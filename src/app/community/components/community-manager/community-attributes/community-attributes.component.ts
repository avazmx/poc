import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { CommunityType } from 'src/app/community/models/community-type.model';
import { Community } from 'src/app/community/models/community.model';
import { GeoService } from 'src/app/community/models/geo-services.model';
import { GovernanceLevel } from 'src/app/community/models/governance-level.model';
import { Member } from 'src/app/community/models/member.model';
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

export class CommunityAttributesComponent implements OnInit, OnDestroy {
  @Output() attributesData = new EventEmitter();
  @Output() isInputFilled: EventEmitter<any> = new EventEmitter();
  @Input() communityObject;
  @Output() dataReady: EventEmitter<Community> = new EventEmitter();

  // Hectorf
  @Output() isFormValid: EventEmitter<boolean> = new EventEmitter();

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
  CommunityObject: Community;

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
      console.log('community store Subscription => ', obj);
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
  }

  checkLength($event) {
    this.isInputFilled.emit($event.target);
  }

  ngOnDestroy() {
    this.communitySubscription.unsubscribe();
  }

}
