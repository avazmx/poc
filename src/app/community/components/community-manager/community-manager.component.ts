import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';

import { GovernanceLevel } from '../../models/governance-level.model';
import { CommunityService } from '../../services/community.service';
import * as communityActions from '../../store/actions/community-attributes.actions';
import { CommunityAttributesComponent } from './community-attributes/community-attributes.component';


//Services
import { CountryService } from 'src/app/shared/services/country.service';
import { DistrictService } from 'src/app/shared/services/district.service';
import { MemberNameService } from 'src/app/shared/services/member-name.service';
import { AccessLevelService } from 'src/app/shared/services/access-level.service';
import { StateService } from 'src/app/shared/services/state.service';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';


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
  communityObject: Community;

  gridApi;
  gridColumnApi;
  //Object/model that will authenticate the grid from the second tab
  //Galdino
  gridValidator =
        {
          tab1Country: false,
          tab1District: false,
          tab1State: false,
          tab1SlickRangeHigh: false,
          tab1SlickRangeLow: false,
          tab1BusinessUnit: false,
          tab1Ground: false,
          tab1Three: false,
          tab1Two: false,
          tab1one: false,

          tab2MemberName:false,
          tab2AccessLevel: false,
          tab2Country:false,
          tab2District: false,
          tab2State: false,
          tab2SlicRangeLow: false,
          tab2SlicRangeHigh: false
        };

  selectedGovernance: GovernanceLevel;

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
              private store: Store<Community>,
              private communityService: CommunityService) { }

  /**
   * This fires when the component is creating, Subscribe to the store in order to get the updated object.
   */
  ngOnInit() {
    //Galdino
    //Subscribe to the services subjects
    //These are the subscriptions that are going to fill
    //the booleans that are going to validate when fullfiled
    //after an option of the select has been changed
    debugger;
    this.countryIdSubscription = this.countryService.getCountryId().subscribe(
      (countryId: number) => {
        console.log("Country");
        if(this.communityObject.activeTab = 1) {
          this.gridValidator.tab1Country = true;
        }
        if(this.communityObject.activeTab = 2) {
          this.gridValidator.tab2Country = true;
        }

      }, (error: any) => {});

      this.districtSubscription = this.districtService.getDistrictId().subscribe(
        (districtId: number) => {
          console.log("District");
          if(this.communityObject.activeTab = 1) {
            this.gridValidator.tab1District = true;
          }
          if(this.communityObject.activeTab = 2) {
            this.gridValidator.tab2District = true;
          }

        }, (error: any) => {});

      this.memberNameSubscription = this.memberNameService.getMemberId().subscribe(
        (memberNameId: number) => {
          console.log('Member Name');
          if(this.communityObject.activeTab = 2) {
            this.gridValidator.tab2MemberName = true;
          }

        }, (error: any) => {});

      this.stateSubscription = this.stateService.getStateId().subscribe(
        (stateId: number) => {
          console.log('State');
          if(this.communityObject.activeTab = 1) {
            this.gridValidator.tab1State = true;
          }
          if(this.communityObject.activeTab = 2) {
            this.gridValidator.tab2State;
          }

        }, (error: any) => {});

      this.accessLevelSubscription = this.accessLevelService.getAccessLevelId().subscribe(
        (accessLevelId: number) => {
          console.log('Access Level');
          if(this.communityObject.activeTab = 2) {
            this.gridValidator.tab2AccessLevel;
          }
        }, (error: any) => {});

    //Galdino end

      // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.communityObject = obj;
    });
  }

  /**
  * When we enter to the first tab we change the activeTab in the store.
  * @param event the id of the tab.
  */
  stepEnterTab1(event: any) {
    // this.CommunityObject.activeTab = 1;
    this.store.dispatch(new communityActions.ActiveTab(1));
  }

  /**
    * When we enter to the second tab we change the activeTab in the store.
    * @param event the id of the tab.
    */
  stepEnterTab2(event: any) {
    // this.CommunityObject.activeTab = 2;
    this.store.dispatch(new communityActions.ActiveTab(2));
  }

  /**
   * When we enter to the third tab we change the activeTab in the store.
   * @param event the id of the tab.
   */
  stepEnterTab3(event: any) {
    // this.CommunityObject.activeTab = 3;
    this.store.dispatch(new communityActions.ActiveTab(3));
  }

  /**
   * Every times you click next in the first tab it will fire, fill the community object and dispatch an action.
   * @param event the id of the tab.
   */
  stepExitTab1(event: any) {
    if (this.attributeComponent.form.valid && this.canExitAgGrid && this.canExitAttributesComponent) {
      this.communityObject.name = this.attributeComponent.form.controls['name'].value;
      this.communityObject.description = this.attributeComponent.form.controls['description'].value;

      const communityType = this.attributeComponent.communityTypes.filter(type =>
        type.id === this.attributeComponent.form.controls['communityType'].value
      );

      this.communityObject.communityType = communityType[0];
      this.store.dispatch(new communityActions.AddAttributes(this.communityObject));
    } else {
      Swal(
        'Some details are missing',
        'Please fill out the details mark with * to continue',
        'info'
      );
    }
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

  /**
   * Checks the validity of the members data, and determines if can leave from the second tab.
   * @param isRowSelectedMember the value that returns the validation true or false.
   */
  checkMemberCheckValidity(isRowSelectedMember: boolean) {
    this.canExitMembersGrid = isRowSelectedMember;
}

ngOnDestroy(): void {
  /**
   *
   */
  this.countryIdSubscription.unsubscribe();
  this.accessLevelSubscription.unsubscribe();
  this.communitySubscription.unsubscribe();
  this.memberNameSubscription.unsubscribe();
  this.stateSubscription.unsubscribe();
  this.districtSubscription.unsubscribe();
}
  

  /**
   * This methods call the community api to save the fethced community.
   */
  onSave() {
    if (this.communityObject.governance) {
      // Fetching geo services.
      const communityGeoServices = [];
      this.communityObject.geoServices.forEach(geoService => {
        communityGeoServices.push({
          bussinesUnit: geoService.businessUnit.id,
          community: 0,
          gnd: geoService.ground,
          id: 0,
          oneds: geoService.one,
          slicRangeHigh: geoService.slicRangeHigh,
          slicRangeLow: geoService.slicRangeLow,
          stateProvince: geoService.state.id,
          treeds: geoService.three,
          twods: geoService.two
        });
      });

      // Fetching governances.
      const communityGovernances = [];
      this.communityObject.governance.forEach(governance => {
        communityGovernances.push({
          atLevelOneApprover: governance.altlevelOneApprover.id,
          atLevelTwoApprover: governance.atlLevelTwoApprover.id,
          geoService: 0,
          community: 0,
          id: 0,
          levelOneApprover: governance.levelOneApprover.id,
          levelTwoApprover: governance.levelOTwoApprover.id
        });
      });

      // Fetching the members.
      const communnityMembers = [];
      this.communityObject.members.forEach(member => {
        communnityMembers.push({
          accessLevel: member.accessLevel.id,
          id: 0,
          mannageMembers: {
            community: 0,
            id: 0,
            slicRangeLow: member.slicRangeLow,
            slicRangehigh: member.slicRangeHigh,
            stateProvince: member.state.id,
            member: member.id
          }
        });
      });

      // Save the community object.
      const saveCommunity = {
        id: 0,
        name: this.communityObject.name,
        communityType: this.communityObject.communityType.id,
        communityGeoServices: communityGeoServices,
        communityGovernances: communityGovernances,
        communnityMembers: communnityMembers,
        governanceLevel: this.selectedGovernance.id
      };

      // Call community save service.
      this.communityService.addPost(saveCommunity).subscribe(data => {
        console.log('Community Saved: ', data);
        Swal({
          type: 'success',
          title: 'Community Saved!'
        });
        this.store.dispatch(new communityActions.CommunityDelete());
      });
    }
  }

  /**
   * Fires every time the governance level select changes.
   * @param selectedGovernance the selected governance.
   */
  onGovernanceLevelChange(selectedGovernance: GovernanceLevel) {
    this.selectedGovernance = selectedGovernance;
  }
}
