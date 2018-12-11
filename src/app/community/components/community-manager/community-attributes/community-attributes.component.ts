import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
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
  newCount = 1;
  
  formIsValid: EventEmitter<boolean>;
  @Output() isInputFilled: EventEmitter<any> = new EventEmitter();

  community$: Observable<Community>;

  constructor(
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private store: Store<Community>
    ) {
    this.community$ = this.store.select('community');
    this.community$.subscribe((obj) => {
      console.log('subscription ', obj);
    });
    this.newRow = false;
    this.rowData = [
      // { country: 'Toyota', district: 'Celica', state: 35000 },
      // { country: 'Ford', district: 'Mondeo', state: 32000 },
      // { country: 'Porsche', district: 'Boxter', state: 72000 }
    ];

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
  }

  changeName() {
    this.store.dispatch(new CommunityAttributesActions.ChangeName('Thoooo'));
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
