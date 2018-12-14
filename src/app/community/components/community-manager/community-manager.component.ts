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
    private _communityService: CommunityService,
    private store: Store<Community>
  ) {
    this.communityObject.push(
      { name: 'hi' }
    );
    console.log(this.communityObject);

    this.arrayFilled = new Array();
    this.isFormFilled = false;

    this.CommunityObject = {
      community_id: 0,
      community_type: {} as CommunityType,
      name: '',
      description: '',
      geo_services: {} as GeoService[],
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
      access_level_id: 0,
      name: '',
      description: ''
    }

    this.GovernanceLevelObject = {
      governance_level_id: 0,
      name: ''
    }

    this.MembersObject = {
      member_id: 0,
      name: '',
      lastname: '',
      email: '',
      access_level: {} as AccessLevel,
      country: {} as Country,
      district: {} as District,
      state: {} as State,
      slic_range_low: 0,
      slic_range_high: 0
    }

    this.GeoServiceObject = {
      geo_service_id: 0,
      state: {} as State,
      slic_range_low: 0,
      slic_range_high: 0,
      bussines_unit: {} as BussinesUnit,
      ground: 0,
      treeds: 0,
      twods: 0,
      oneds: 0
    }

    this.BussinessUnitObject = {
      bussines_unit_id: 0,
      name: ''
    }
  }

  ngOnChanges() {
    this._communityService.subject.next(this.communityObject);
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
   * @param $event add description
   */
  onInputChange($event) {
    let isInside = false;
    for (let x = 0; x < this.arrayFilled.length; x++) {
      if (this.arrayFilled[x] === $event) {
        isInside = true;
        break;
      }
    }
    if (!isInside) {
      this.arrayFilled.push($event);
    }
    let countBooleans = 0;
    for (let y = 0; y < this.arrayFilled.length; y++) {
      if (this.arrayFilled[y].value.length > 0) {
        countBooleans++;
      }
    }
    this.isFormFilled = countBooleans === 2 ? true : false;
  }

}
