import { Component, OnInit, Input, Output} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';
import * as CommunityAttributesActions from 'src/app/community/store/actions/community-attributes.actions';
@Component({
  selector: 'ups-community-manager',
  templateUrl: './community-manager.component.html',
  styleUrls: ['./community-manager.component.scss']
})
export class CommunityManagerComponent implements OnInit {

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

  arrayFilled: Array<any>;
  isFormFilled: boolean;
  constructor(
    private store: Store<Community>
    ) {
    this.arrayFilled = new Array();
    this.isFormFilled = false;

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

    this.AccessLevelObject ={
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

  ngOnInit() {
  }

  onChangeFormValidity(event) {
    if (event === true) {
      this.formNotValid = false;
    }
  }

  communityAttributesAction() {
    console.log('Attributes');
    //this.store.dispatch(new CommunityAttributesActions.CommunityAddAttributes(this.CommunityObject));
  }

  communityMembersAction() {
    console.log('Members');
    //this.store.dispatch(new CommunityAttributesActions.CommunityAddMembers(this.CommunityObject));
  }

  communityGovernanceAction() {
    console.log('Governance');
    //this.store.dispatch(new CommunityAttributesActions.CommunityAddGovernance(this.CommunityObject));
  }

  onInputChange($event){
    let isInside: boolean = false;
    for(let x=0; x<this.arrayFilled.length; x++){
      if(this.arrayFilled[x] === $event){
        isInside = true;
        break;
      }
    }
    if(!isInside){
      this.arrayFilled.push($event);
    }
    let countBooleans: number = 0;
    for(let y=0; y<this.arrayFilled.length; y++){
      if(this.arrayFilled[y].value.length > 0)
        countBooleans++;
    }
    console.log(this.arrayFilled);
    if(countBooleans == 2)
      this.isFormFilled = true;
    else
      this.isFormFilled = false;
  }

}
