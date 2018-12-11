import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { CommunityModule } from '../../community.module';
import { CommunityService } from '../../services/community.service';

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

  attributesObject: any;

  constructor(
    private _communityService: CommunityService,
  ) {
    this.communityObject.push(
      { name: 'hi' }
    );
    console.log(this.communityObject);
  }

  ngOnChanges() {
    this._communityService.subject.next(this.communityObject);
  }

  ngOnInit() {
  }

  onChangeFormValidity(event) {
    if (event === true) {
      this.formNotValid = false;
    }
  }

  selectedAttributes(e) {
    this.attributesObject = e;
    console.log(this.attributesObject);
  }

  selectedMembers(e) {
  }

}
