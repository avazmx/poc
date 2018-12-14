import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { attributesDef } from '../../../models/attributes-def';
import { StateService } from 'src/app/shared/services/state.service';
import { DistrictService } from 'src/app/shared/services/district.service';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})

export class CommunitySelectComponent implements OnInit, ICellRendererAngularComp {
  altData;
  attributesDef;
  countries: Country;
  districts: District;
  allDistricts: any = [];
  states: State;
  allStates: any = [];
  checkmark: any;
  community$: Observable<Community>;
  CommunityObject: Community;
  
  @ViewChild('ddlDistrict') ddlDistrict: ElementRef;
  @ViewChild('ddlState') ddlState: ElementRef;
  @ViewChild('ddlCountry') ddlCountry: ElementRef;

  constructor(
    private countryService: CountryService,
    private districtService: DistrictService,
    private stateService: StateService,
    private store: Store<Community>
  ) {
    this.community$ = this.store.select('community');
    this.community$.subscribe((currentCommunty: Community) => {
      this.CommunityObject = currentCommunty;

      this.districts = this.allDistricts.filter(district => {
        return district.country.id == currentCommunty.attributes.country;
      });

      this.states = this.allStates.filter(state => {
        return state.district.id == currentCommunty.attributes.state;
      });

    });

    this.attributesDef = attributesDef;
  }

  ngOnInit() {

  }

  changeCtry($evt) {
    this.CommunityObject.attributes.country = $evt.srcElement.value;
    this.store.dispatch(new CommunityAttributesActions.AddCommunityObjectAttributes(this.CommunityObject));
    this.ddlCountry.nativeElement.value = '';
  }

  changeDistrict($evt) {
    this.CommunityObject.attributes.state = $evt.value;
    this.store.dispatch(new CommunityAttributesActions.AddCommunityObjectAttributes(this.CommunityObject));
    this.ddlState.nativeElement.value = '';
  }

  agInit(params: any) {
    this.altData = params.value;

    if (this.altData === 'country') {
      this.countryService.getCountries()
        .subscribe((countries: Country) => {
          this.countries = countries;
        }, (err: any) => {
          console.log('No database found... ' + err);
        });
    } else if (this.altData === 'district') {
      this.districtService.getDistricts()
        .subscribe((districts: District) => {
          this.allDistricts = districts;
          this.districts = districts;
        }, (err: any) => {
          console.log('No database found... ' + err);
        });
    } else if (this.altData === 'state') {
      this.stateService.getStates()
        .subscribe((states: State) => {
          this.allStates = states;
          this.states = states;
        }, (err: any) => {
          console.log('No database found... ' + err);
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

}
