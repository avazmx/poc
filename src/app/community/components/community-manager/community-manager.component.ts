import { Component, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
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
import * as communityActions from '../../store/actions/community-attributes.actions';
import { CommunityAttributesComponent } from './community-attributes/community-attributes.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ups-community-manager',
  templateUrl: './community-manager.component.html',
  styleUrls: ['./community-manager.component.scss']
})

export class CommunityManagerComponent implements OnInit, OnChanges {

  /**
   * 	small | large-filled | large-empty | large-filled-symbols | large-empty-symbols
   */
  wizzardLayout = 'large-empty-symbols';
  formNotValid = true;
  CommunityObject: Community;
  @Input() GovernanceLevelObject: GovernanceLevel;
  @Input() MembersObject: Member;
  @Input() GeoServiceObject: GeoService;
  @Input() BussinessUnitObject: BussinesUnit;
  @Input() AccessLevelObject: AccessLevel;
  @Input() CountryObject: Country;
  @Input() DistrictObject: District;
  @Input() StateObject: State;

  // Hectorf
  @ViewChild(CommunityAttributesComponent) attributeComponent: CommunityAttributesComponent;
  canExitAttributesComponent = false;
  communitySubscription: Subscription;

  attributesObject: any;
  arrayFilled = [];
  isFormFilled: boolean;
  step2: boolean;

  constructor(private communityService: CommunityService, private store: Store<Community>) {

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
    };

    this.CountryObject = {
      id: 0,
      name: ''
    };

    this.DistrictObject = {
      id: 0,
      name: ''
    };

    this.StateObject = {
      id: 0,
      name: ''
    };

    this.AccessLevelObject = {
      id: 0,
      name: '',
      description: ''
    };

    this.GovernanceLevelObject = {
      id: 0,
      name: ''
    };

    this.MembersObject = {
      id: 0,
      name: '',
      lastName: '',
      email: '',
      accessLevel: {} as AccessLevel,
      country: {} as Country,
      district: {} as District,
      state: {} as State,
      slicRangeLow: 0,
      slicRangeHigh: 0
    };

    this.BussinessUnitObject = {
      id: 0,
      name: ''
    };
  }

  ngOnChanges() {
    this.communityService.subject.next(this.CommunityObject);
  }

  ngOnInit() {
    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;
    });

  }

  onChangeFormValidity(event) {
    if (event === true) {
      this.formNotValid = false;
    }
  }

  selectedAttributes(e) {
    this.CommunityObject = e;
    console.log('community object: ' + this.CommunityObject);
  }

  goToMembers() {
    this.step2 = true;
    console.log(this.step2);
  }

  selectedMembers(e) {
  }

  communityAttributesAction() {

    console.log(this.attributeComponent);
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

  stepEnter(event: any) { }

  stepAtributesExit(event: any) {
    if (this.attributeComponent.form.valid) {
      this.CommunityObject.name = this.attributeComponent.form.controls['name'].value;
      this.CommunityObject.description = this.attributeComponent.form.controls['description'].value;

      const communityType = this.attributeComponent.communityTypes.filter(type =>
        type.communityTypeId === this.attributeComponent.form.controls['community_type'].value
      );

      this.CommunityObject.communityType = communityType[0];
      this.store.dispatch(new communityActions.AddAttributes(this.CommunityObject));

      console.log(event);
      this.store.dispatch(new communityActions.ActiveTab(event));
    } else {
      alert(`Please fill out the details mark with * to continue`);
    }

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
    let countBooleans: number;
    for (let y = 0; y < this.arrayFilled.length; y++) {
      if (this.arrayFilled[y].value.length > 0) {
        countBooleans++;
      }
    }

    this.isFormFilled = countBooleans === 2 ? true : false;
  }

  checkFormValidity(event: boolean) {
    this.canExitAttributesComponent = event;
  }

}
