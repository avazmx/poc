import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';

import * as communityActions from '../../store/actions/community-attributes.actions';
import { CommunityAttributesComponent } from './community-attributes/community-attributes.component';

//Services
import { CountryService } from 'src/app/shared/services/country.service';
import { DistrictService } from 'src/app/shared/services/district.service';
import { MemberNameService } from 'src/app/shared/services/member-name.service';
import { AccessLevelService } from 'src/app/shared/services/access-level.service';
import { StateService } from 'src/app/shared/services/state.service';

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
  CommunityObject: Community;
  gridApi;
  gridColumnApi;
  //Object/model that will authenticate the grid from the second tab
  gridValidator: [
    [
        {
          country: boolean,
          district: boolean,
          state: boolean,
          slickRangeHigh: boolean,
          slickRangeLow: boolean,
          businessUnit: boolean,
          ground: boolean,
          three: boolean,
          two: boolean,
          one: boolean,
        },
        {
          memberName: boolean,
          accessLevel: boolean,
          country: boolean,
          district: boolean,
          state: boolean,
          slicRangeLow: boolean,
          slicRangeHigh: boolean
        },
        {}
    ]
]


  // Hectorf
  @ViewChild(CommunityAttributesComponent) attributeComponent: CommunityAttributesComponent;
  canExitAttributesComponent = false;
  canExitAgGrid = false;
  canExitMembersGrid = false;
  agGridFilled: boolean;
  //Subscription
  communitySubscription: Subscription;
  countryIdSubscription: Subscription;
  districtSubscription: Subscription;
  memberNameSubscription: Subscription;
  accessLevelSubscription: Subscription;
  stateSubscription: Subscription;

  constructor(private districtService: DistrictService,
              private countryService: CountryService,
              private memberNameService: MemberNameService,
              private accessLevelService: AccessLevelService,
              private stateService: StateService,
              private store: Store<Community>) { }

  ngOnInit() {
    //Subscribe to the services subjects
    this.countryIdSubscription = this.countryService.getCountryId().subscribe(
      (countryId: number) => {
        console.log("Country");
        /*if(countryId > 0) {
          this.gridValidator[0][1].country = true;
        }*/
      }, (error: any) => {});

      this.districtSubscription = this.districtService.getDistrictId().subscribe(
        (districtId: number) => {
          console.log("District");
          /*if(districtId > 0) {
            this.gridValidator[0][1].district = true;
          }*/
        }, (error: any) => {});

      this.memberNameSubscription = this.memberNameService.getMemberId().subscribe(
        (memberNameId: number) => {
          console.log('Member Name');
          /*if(memberNameId > 0) {
            this.gridValidator[0][1].memberName = true;
          }*/
        }
      )

      this.stateSubscription = this.stateService.getStateId().subscribe(
        (stateId: number) => {
          console.log('State');
          /*if(stateId > 0) {
            this.gridValidator[0][1].state
          }*/
        }
      )

      this.accessLevelSubscription = this.accessLevelService.getAccessLevelId().subscribe(
        (accessLevelId: number) => {
          console.log('Access Level');
          /*if(accessLevelId > 0) {
            this.gridValidator[0][1].accessLevel = true;
          }*/
        }
      )

      // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;
    });

  }

  stepEnterTab1(event: any) {
    this.CommunityObject.activeTab = 1;
    this.store.dispatch(new communityActions.ActiveTab(this.CommunityObject));
  }

  stepEnterTab2(event: any) {
    this.CommunityObject.activeTab = 2;
    this.store.dispatch(new communityActions.ActiveTab(this.CommunityObject));
  }

  stepEnterTab3(event: any) {
    this.CommunityObject.activeTab = 3;
    this.store.dispatch(new communityActions.ActiveTab(this.CommunityObject));
  }

  stepExitTab1(event: any) {
    if (this.attributeComponent.form.valid && this.canExitAgGrid && this.canExitAttributesComponent) {
      this.CommunityObject.name = this.attributeComponent.form.controls['name'].value;
      this.CommunityObject.description = this.attributeComponent.form.controls['description'].value;

      const communityType = this.attributeComponent.communityTypes.filter(type =>
        type.id === this.attributeComponent.form.controls['communityType'].value
      );

      this.CommunityObject.communityType = communityType[0];
      this.store.dispatch(new communityActions.AddAttributes(this.CommunityObject));
    } else {
      alert(`Please fill out the details mark with * to continue`);
    }
  }

  stepExitTab2(event: any) {
    if(this.canExitMembersGrid) {
      alert('Done');
    } else {
      alert('Please fill this');
    }
    console.log('Step Enter', event);
    // Here we need to save the members that are added.
  }

  stepExitTab3(event: any) {
    console.log('Step Enter', event);
    // Here we need to save all the community object.
  }

  /**
   * This method fires every time the form changes and gets the form validiy.
   * @param isValidForm Emmited variable from community-attributes component.
   */
  checkFormValidity(isValidForm: boolean) {
    this.canExitAttributesComponent = isValidForm;
  }

  /**
   * This method fires when the ag grid validation is emitted.
   * @param isRowSelected Emitted variable from community-attributes component.
   */

  checkAgGridValidity(isRowSelected: boolean) {
    this.canExitAgGrid = isRowSelected;
  }

  checkMemberCheckValidity(isRowSelectedMember: boolean) {
    this.canExitMembersGrid = isRowSelectedMember;
}
}
