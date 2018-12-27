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

  stepEnterTab1(event: any) {
    this.communityObject.activeTab = 1;
    this.store.dispatch(new communityActions.ActiveTab(this.communityObject));
  }

  stepEnterTab2(event: any) {
    this.communityObject.activeTab = 2;
    this.store.dispatch(new communityActions.ActiveTab(this.communityObject));
  }

  stepEnterTab3(event: any) {
    this.communityObject.activeTab = 3;
    this.store.dispatch(new communityActions.ActiveTab(this.communityObject));
  }

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
}
