import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';

import * as communityActions from '../../store/actions/community-attributes.actions';
import { CommunityAttributesComponent } from './community-attributes/community-attributes.component';

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

  // Hectorf
  @ViewChild(CommunityAttributesComponent) attributeComponent: CommunityAttributesComponent;
  canExitAttributesComponent = false;
  communitySubscription: Subscription;

  arrayFilled = [];
  isFormFilled: boolean;
  step2: boolean;

  constructor(private store: Store<Community>) { }

  ngOnInit() {
    // Subscribe to the store in order to get the updated object.
    this.communitySubscription = this.store.select('community').subscribe((obj) => {
      this.CommunityObject = obj;
    });
  }

  stepEnterTab1(event: any) {
    this.CommunityObject.activeTab = 1;
    this.store.dispatch(new communityActions.ActiveTab( this.CommunityObject));
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
    if (this.attributeComponent.form.valid) {
      this.CommunityObject.name = this.attributeComponent.form.controls['name'].value;
      this.CommunityObject.description = this.attributeComponent.form.controls['description'].value;

      const communityType = this.attributeComponent.communityTypes.filter(type =>
        type.id === this.attributeComponent.form.controls['community_type'].value
      );

      this.CommunityObject.communityType = communityType[0];
      this.store.dispatch(new communityActions.AddAttributes(this.CommunityObject));
    } else {
      alert(`Please fill out the details mark with * to continue`);
    }
  }


  stepExitTab2(event: any) {
    console.log('Step Enter', event);
    // Here we need to save the members that are added.
  }

  stepExitTab3(event: any) {
    console.log('Step Enter', event);
    // Here we need to save all the community object.
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

  onDataChange(event: any) {
    // debugger;
  }
}
