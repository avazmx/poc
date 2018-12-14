import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommunityService } from '../../services/community.service';

import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';

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

    this.arrayFilled = [];
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
    let countBooleans: number;
    for (let y = 0; y < this.arrayFilled.length; y++) {
      if (this.arrayFilled[y].value.length > 0) {
        countBooleans++;
      }
    }
    // console.log(this.arrayFilled);
    if (countBooleans === 2) {
      this.isFormFilled = true;
    } else {
      this.isFormFilled = false;
    }


  }

}
