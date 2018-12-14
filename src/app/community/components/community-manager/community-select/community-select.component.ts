import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
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
  @ViewChild('ddlDistrict') ddlDistrict: ElementRef;
  @ViewChild('ddlState') ddlState: ElementRef;

  constructor(
    private _communityService: CommunityService,
    private store: Store<Community>
  ) {
    this.community$ = this.store.select('community');
    this.community$.subscribe((obj) => {
      this.CommunityObject = obj;
      console.log('select subscription ', obj.attributes);
      this.districts = this.allDistricts.filter(district => {
        return district.country.id === obj.attributes.country;
      });

      this.states = this.allStates.filter(state => {
        return state.district.id === obj.attributes.state;
      });

    });

    this.attributesDef = attributesDef;
  }

  ngOnInit() {

  }

  changeCtry($evt) {
    this.CommunityObject.attributes.country = $evt.srcElement.value;
    this.store.dispatch(new CommunityAttributesActions.AddCommunityObjectAttributes(this.CommunityObject));
    if (this.ddlDistrict) {
      this.ddlDistrict.nativeElement.value = '';
      this.changeDistrict(this.ddlDistrict.nativeElement);
    }
  }

  changeDistrict($evt) {
    this.CommunityObject.attributes.state = $evt.value;
    this.store.dispatch(new CommunityAttributesActions.AddCommunityObjectAttributes(this.CommunityObject));
    if (this.ddlState) {
      this.ddlState.nativeElement.value = '';
    }
  }

  agInit(params: any) {
    this.altData = params.value;

    if (this.altData === 'country') {
      // this.countries = [{id:1, name:'MX'}, {id:2, name:'US'}];
      this._communityService.getCountries()
        .subscribe(countries => {
          this.countries = countries;
          console.log(this.countries);
        });
    } else if (this.altData === 'district') {
        this._communityService.getDistricts()
          .subscribe(districts => {
            this.allDistricts = districts;
            this.districts = districts;
            console.log(this.districts);
          });
    } else if (this.altData === 'state') {
        this._communityService.getStates()
          .subscribe(states => {
            this.allStates = states;
            this.states = states;
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
