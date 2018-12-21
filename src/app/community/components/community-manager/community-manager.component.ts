import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';

import * as communityActions from '../../store/actions/community-attributes.actions';
import { CommunityAttributesComponent } from './community-attributes/community-attributes.component';
import { CommunityService } from '../../services/community.service';

//Services
import { CountryService } from 'src/app/shared/services/country.service';

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
  gridValidator: [
    [
      {
        country: false
        district: false;
        state: false,
        slickRangeHigh: false,
        slickRangeLow: false,
        businessUnit: false,
        ground: false,
        three: false,
        two: false,
        one: false,
      },
      {
        memberName: false,
        accessLevel: false,
        country: false,
        district: false,
        state: false,
        slicRangeLow: false,
        slicRangeHigh: false
      },
      {}
    ]
  ]

  // Hectorf
  @ViewChild(CommunityAttributesComponent) attributeComponent: CommunityAttributesComponent;
  canExitAttributesComponent = false;
  canExitAgGrid = false;
  canExitMembersGrid = false;
  communitySubscription: Subscription;
  agGridFilled: boolean;
  countryIdSubscription: Subscription;

  constructor(private store: Store<Community>, private communityService: CommunityService, private countryService: CountryService) { }

  ngOnInit() {
    // Subscribe to the country service subject
    this.countryIdSubscription = this.countryService.getCountryId().subscribe(
      (countryId: number) => {
        console.log("I am subscribed and the values are changing")
      }, (error: any) => { });

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
    if (this.canExitMembersGrid) {
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

  onSave() {
    if (this.CommunityObject.governance) {
      const communityRequest = Object.assign({}, this.CommunityObject);
      delete communityRequest['community'];
      delete communityRequest['activeRow'];
      delete communityRequest['activeTab'];
      delete communityRequest['communityId'];

      this.communityService.addPost(communityRequest).subscribe(data => {
        alert('Community Saved!');
        this.store.dispatch(new communityActions.CommunityDelete());
      });
    }
  }

}
