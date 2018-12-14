import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';

import { AccessLevel } from '../../models/access-level.model';
import { BussinesUnit } from '../../models/bussines-unit.model';
import { CommunityType } from '../../models/community-type.model';
import { GeoService } from '../../models/geo-services.model';
import { GovernanceLevel } from '../../models/governance-level.model';
import { Member } from '../../models/member.model';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'ups-community-manager',
  templateUrl: './community-manager.component.html',
  styleUrls: ['./community-manager.component.scss']
})

export class CommunityManagerComponent implements OnInit, OnChanges {
  communityObject = [];

  /**
   * 	small | large-filled | large-empty | large-filled-symbols | large-empty-symbols
   */
  wizzardLayout = 'large-empty-symbols';
  formNotValid = true;
  @Input() CommunityObject: Community;
  @Input() GovernanceLevelObject: GovernanceLevel;
  @Input() MembersObject: Member;
  @Input() GeoServiceObject: GeoService;
  @Input() BussinessUnitObject: BussinesUnit;
  @Input() AccessLevelObject: AccessLevel;
  @Input() CountryObject: Country;
  @Input() DistrictObject: District;
  @Input() StateObject: State;

  attributesObject: any;
  arrayFilled: Array<any>;
  isFormFilled: boolean;

  constructor(
    private communityService: CommunityService,
    private store: Store<Community>
  ) {
    this.communityObject.push(
      { name: 'hi' }
    );
    console.log(this.communityObject);

    this.arrayFilled = []
    this.isFormFilled = false;

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
    }

    this.CountryObject = {
      id: 0,
      name: ''
    }

    this.DistrictObject = {
      id: 0,
      name: ''
    }

    this.StateObject = {
      id: 0,
      name: ''
    }

    this.AccessLevelObject = {
      accessLevelId: 0,
      name: '',
      description: ''
    }

    this.GovernanceLevelObject = {
      governanceLevelId: 0,
      name: ''
    }

    this.MembersObject = {
      memberId: 0,
      name: '',
      lastname: '',
      email: '',
      accessLevel: {} as AccessLevel,
      country: {} as Country,
      district: {} as District,
      state: {} as State,
      slicRangeLow: 0,
      slicRangeHigh: 0
    }

    this.GeoServiceObject = {
      geoServiceId: 0,
      state: {} as State,
      slicRangeLow: 0,
      slicRangeHigh: 0,
      bussinesUnit: {} as BussinesUnit,
      ground: 0,
      treeds: 0,
      twods: 0,
      oneds: 0
    }

    this.BussinessUnitObject = {
      bussinesUnitId: 0,
      name: ''
    }
  }

  ngOnChanges() {
    this.communityService.subject.next(this.communityObject);
  }

  ngOnInit() {
  }

  onChangeFormValidity(event) {
    if (event === true) {
      this.formNotValid = false;
    }
  }

  selectedAttributes(e) {
    this.communityObject = e;
    console.log(this.communityObject);
  }

  selectedMembers(e) {
  }

  communityAttributesAction() {
    console.log('Attributes');
    // this.store.dispatch(new CommunityAttributesActions.CommunityAddAttributes(this.CommunityObject));
  }

  communityMembersAction() {
    console.log('Members');
    // this.store.dispatch(new CommunityAttributesActions.CommunityAddMembers(this.CommunityObject));
  }

  communityGovernanceAction() {
    console.log('Governance');
    // this.store.dispatch(new CommunityAttributesActions.CommunityAddGovernance(this.CommunityObject));
  }

  /**
   * OscarFix
   * Every time the inputs from the child component trigger the (keyup) angular 2 listener this method will be
   * triggered
   * line 1 checks if the element it's already filtering into another array
   * line 2 if there's no duplicate found then the element will be pushed into the array
   * line 3 filters the inputs into another array if they're not empty
   * line 4 checks if the previous filtered array length equals the array with all the inputs length
   * @param $event it's the param that EventEmitter sent from the child component which in this case send the
   * input component to check it's length
   */
  onInputChange($event){
    let result = this.arrayFilled.filter(element => element === $event);
    if (result.length == 0) this.arrayFilled.push($event);
    let result2 = this.arrayFilled.filter(element => element.value.length > 0);
    result2.length == this.arrayFilled.length ? this.isFormFilled = true : this.isFormFilled = false;
  }

}
