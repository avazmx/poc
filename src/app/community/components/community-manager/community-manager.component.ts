import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

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
import { BusinessUnitService } from 'src/app/shared/services/business-unit.service';

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
  selectedGovernance: GovernanceLevel = null;
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

  @ViewChild(CommunityAttributesComponent) attributeComponent: CommunityAttributesComponent;
  canExitAttributesComponent = false;
  canExitAgGrid = false;
  canExitAgGridMembers = false;
  canExitMembersGrid = false;
  agGridFilled: boolean;
  //Subscriptions
  communitySubscription: Subscription;
  countryIdSubscription: Subscription;
  districtSubscription: Subscription;
  memberNameSubscription: Subscription;
  accessLevelSubscription: Subscription;
  stateSubscription: Subscription;
  businessUnitSubscription: Subscription;

  constructor(private districtService: DistrictService,
              private countryService: CountryService,
              private memberNameService: MemberNameService,
              private accessLevelService: AccessLevelService,
              private stateService: StateService,
              private store: Store<Community>,
              private communityService: CommunityService,
              private businessUnitService: BusinessUnitService) { }

  /**
   * This fires when the component is creating, Subscribe to the store in order to get the updated object.
   */
  ngOnInit() {
    //Galdino
    //Subscribe to the services subjects
    //These are the subscriptions that are going to fill
    //the booleans that are going to validate when fullfiled
    //after an option of the select has been changed
    this.countryIdSubscription = this.countryService.getCountryId().subscribe(
      (countryId: number) => {
        if(this.communityObject.activeTab === 1) {
          this.gridValidator.tab1Country = true;
          console.log("Country in tab 1");
        }
        if(this.communityObject.activeTab === 2) {
          this.gridValidator.tab2Country = true;
          console.log("Country in tab 2");
        }
      }, (error: any) => {});

      this.districtSubscription = this.districtService.getDistrictId().subscribe(
        (districtId: number) => {
          if(this.communityObject.activeTab === 1) {
            this.gridValidator.tab1District = true;
            console.log("District in tab 1");
          }
          if(this.communityObject.activeTab === 2) {
            this.gridValidator.tab2District = true;
            console.log("District in tab 2");
          }
        }, (error: any) => {});

      this.memberNameSubscription = this.memberNameService.getMemberId().subscribe(
        (memberNameId: number) => {
          if(this.communityObject.activeTab === 2) {
            this.gridValidator.tab2MemberName = true;
            console.log("Member in tab 2");
          }
        }, (error: any) => {});

      this.stateSubscription = this.stateService.getStateId().subscribe(
        (stateId: number) => {
          if(this.communityObject.activeTab === 1) {
            this.gridValidator.tab1State = true;
            console.log('State in tab 1');
          }
          if(this.communityObject.activeTab === 2) {
            this.gridValidator.tab2State = true;
            console.log('State in tab 2');
          }
        }, (error: any) => {});

      this.accessLevelSubscription = this.accessLevelService.getAccessLevelId().subscribe(
        (accessLevelId: number) => {
          if(this.communityObject.activeTab === 2) {
            this.gridValidator.tab2AccessLevel = true;
            console.log('Access Level in tab 2');
          }
        }, (error: any) => {});

      this.businessUnitSubscription = this.businessUnitService.getBusinessUnitId().subscribe(
        (businessUnitId: number) => {
          if(this.communityObject.activeTab === 1) {
            this.gridValidator.tab1BusinessUnit = true;
            console.log('Business unit in tab 1')
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
    if (this.attributeComponent.form.valid && this.canExitAgGrid && this.canExitAttributesComponent
        && this.gridValidator.tab1BusinessUnit && this.gridValidator.tab1Country && this.gridValidator.tab1District
        &&this.gridValidator.tab1State) {
      this.communityObject.name = this.attributeComponent.form.controls['name'].value;
      this.communityObject.description = this.attributeComponent.form.controls['description'].value;

      const communityType = this.attributeComponent.communityTypes.filter(type =>
        type.id === this.attributeComponent.form.controls['communityType'].value
      );

      this.communityObject.communityType = communityType[0];
      this.store.dispatch(new communityActions.AddAttributes(this.communityObject));
    } else {
      Swal({
        title: "Some fields are missing!!",
        html:'<p>Please fill the next fields: </p>' +
        //(!this.attributeComponent.form. ? 'Community Type' : '') +
        //(!this.gridValidator.tab1Country ? 'Name' : '') +
        //(!this.gridValidator.tab1Country ? 'Description' : '') +
        (!this.gridValidator.tab1BusinessUnit ? '<br>Business Unit*' : '') +
        (!this.gridValidator.tab1Country ? '<br>Country*' : '') +
        (!this.gridValidator.tab1District ? '<br>District*' : '')+
        (!this.gridValidator.tab1State? '<br>State*' : ''),
        type: "warning",
        confirmButtonText: "Ok"
      });
    }
  }

  stepExitTab2(event: any) {
    if (this.canExitAgGridMembers) {
      /*this.communityObject.name = this.attributeComponent.form.controls['name'].value;
      this.communityObject.description = this.attributeComponent.form.controls['description'].value;

      const communityType = this.attributeComponent.communityTypes.filter(type =>
        type.id === this.attributeComponent.form.controls['communityType'].value
      );*/

      //this.communityObject.communityType = communityType[0];
      //this.store.dispatch(new communityActions.AddMembers(this.communityObject));
    } else {
      Swal({
        title: "Some fields are missing!!",
        html:'<p>Please fill the next fields: </p>' +
        (!this.gridValidator.tab2AccessLevel ? '<br>Access Level*' : '')+
        (!this.gridValidator.tab2Country ? '<br>Country*' : '')+
        (!this.gridValidator.tab2District ? '<br>District*' : '') +
        (!this.gridValidator.tab2MemberName ? '<br>Member*' : '') +
        (!this.gridValidator.tab2State ? '<br>State*' : ''),
        type: "warning",
        confirmButtonText: "Ok"
      });
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
  checkAgGridValidityTab1(isRowSelected: boolean) {
    //this.canExitAgGrid = isRowSelected;
    if(this.gridValidator.tab1BusinessUnit && this.gridValidator.tab1State && this.gridValidator.tab1District
       && this.gridValidator.tab1Country) {
      this.canExitAgGrid = true;
    }
  }
  /**
   * Function that check if every option on the members tab has been selected
   * @param isRowSelected boolean
   */
  checkAgGridValidityTab2(isRowSelected: boolean) {
    if(this.gridValidator.tab2AccessLevel && this.gridValidator.tab2Country && this.gridValidator.tab2District
      && this.gridValidator.tab2State && this.gridValidator.tab2MemberName) {
        this.canExitAgGridMembers = true;
      }
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
   *Unsuscribing
   */
  this.accessLevelSubscription.unsubscribe();
  this.businessUnitSubscription.unsubscribe();
  this.communitySubscription.unsubscribe();
  this.countryIdSubscription.unsubscribe();
  this.districtSubscription.unsubscribe();
  this.memberNameSubscription.unsubscribe();
  this.stateSubscription.unsubscribe();
}

  /**
   * This methods call the community api to save the fethced community.
   */
  onSave() {
    if (this.communityObject.governance && this.selectedGovernance) {
      // Fetching geo services.
      const communityGeoServices = [];
      this.communityObject.geoServices.forEach(geoService => {
        communityGeoServices.push(
          {
            bussinesUnit: {
              id: geoService.businessUnit.id
            },
            community: {
              communityType: { id: 0 },
              id: 0
            },
            gnd: geoService.ground,
            id: 0,
            oneds: geoService.one,
            slicRangeHigh: geoService.slicHigh,
            slicRangeLow: geoService.slicLow,
            stateProvince: {
              id: geoService.state.id,
              district: {
                id: 0,
                country: {
                  id: 0
                }
              }
            },
            treeds: geoService.three,
            twods: geoService.two
          }
        );
      });

      // Fetching governances.
      const communityGovernances = [];
      this.communityObject.governance.forEach(governance => {
        communityGovernances.push({
          atLevelOneApprover: { id: governance.altlevelOneApprover.id },
          atLevelTwoApprover: { id: governance.atlLevelTwoApprover.id },
          id: 0,
          levelOneApprover: { id: governance.levelOneApprover.id },
          levelTwoApprover: { id: governance.levelOTwoApprover.id }
        });
      });

      // Fetching the members.
      const communnityMembers = [];
      this.communityObject.members.forEach(member => {
        communnityMembers.push({
          accessLevel: { id: member.accessLevel.id },
          id: 0,
          mannageMembers: {
            community: 0,
            id: 0,
            slicRangeLow: member.slicLow,
            slicRangehigh: member.slicHigh,
            stateProvince: {
              id: member.state.id,
              district: {
                id: 0,
                country: {
                  id: 0
                }
              }
            }
          },
          member: { id: member.id }
        });
      });

      // Save the community object.
      const saveCommunity = {
        id: '0',
        community: {
          id: 0,
          name: this.communityObject.name,
          communityType: { id: this.communityObject.communityType.id },
          description: this.communityObject.description
        },
        governanceLevel: { id: this.selectedGovernance.id },
        communityGeoServices: communityGeoServices,
        communityGovernances: communityGovernances,
        communnityMembers: communnityMembers
      };

      // Call community save service.
      this.communityService.addCommunity(saveCommunity).subscribe(createdCommunity => {
        if (createdCommunity.id) {
          Swal({
            type: 'success',
            title: 'Community Saved!'
          });
          this.store.dispatch(new communityActions.CommunityDelete());
          console.log(this.communityObject);
        }
      });
    } else {
      Swal({
        type: 'info',
        title: 'Please fill the required values!'
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
