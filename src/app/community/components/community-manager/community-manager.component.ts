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
  canExitAgGrid = false;
  communitySubscription: Subscription;
  agGridFilled: boolean;

  constructor(private store: Store<Community>) { }

  ngOnInit() {
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

}
