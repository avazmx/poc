import { Component, OnInit, Input } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { attributesDef } from '../../../models/attributes-def';
import { CommunityService } from 'src/app/community/services/community.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})

export class CommunitySelectComponent implements OnInit, ICellRendererAngularComp {
  private altData;
  private attributesDef;
  countries: any;
  districts: any;
  states: any;
  checkmark: any;
  allDistricts: any = [];
  allStates: any = [];
  community$: Observable<Community>;
  CommunityObject: Community;

  constructor(
    private _communityService: CommunityService,
    private store: Store<Community>
  ) {
    this.community$ = this.store.select('community');
    this.community$.subscribe((obj) => {
      console.log('select subscription ', obj.attributes);
    });

    this.attributesDef = attributesDef;
    this.CommunityObject = {
      community_id: 0,
      community_type: {} as CommunityType ,
      name: '',
      description: '',
      geo_services: {} as GeoService[],
      members: {} as Member[],
      governance: {} as GovernanceLevel[],
      attributes: {
        state: {} as State,
        district: {} as District,
        country: 0 as number
      } as any
    };
    // console.log(this.columnDefs);
  }

  ngOnInit() {
  }
  
  changeCtry($evt) {
    this.CommunityObject.attributes.country = $evt.srcElement.value;
    this.store.dispatch(new CommunityAttributesActions.AddCommunityObjectAttributes(this.CommunityObject));

  }

  agInit(params: any) {
    this.altData = params.value;
    // console.log(this.altData);
    
    if (this.altData == 'country') {
      this.countries = [{id:1, name:'MX'}, {id:2, name:'US'}];
      /* this._communityService.getCountries()
        .subscribe(countries => {
          this.countries = countries;
          console.log(this.countries);
      }); */
    }

    if(this.altData == 'district') {
      this._communityService.getDistricts()
        .subscribe(districts => {
          this.allDistricts = districts;
          console.log(this.districts);
      });
    }

    if(this.altData == 'state') {
      this._communityService.getStates()
        .subscribe(states => {
          this.allStates = states;
          console.log(this.states);
      });
    }

  }

  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  selected() {
    this.checkmark = !this.checkmark;
  }

  onChange(e) {
    console.log(e);
  }

}
