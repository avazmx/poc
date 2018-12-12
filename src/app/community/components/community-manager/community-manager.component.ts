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
  arrayFilled: Array<any>;
  isFormFilled: boolean;

  constructor(
    private _communityService: CommunityService,
  ) {
    this.communityObject.push(
      { name: 'hi' }
    );
    console.log(this.communityObject);
    this.arrayFilled = new Array();
    this.isFormFilled = false;
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

  onInputChange($event) {
    let isInside: boolean = false;
    for (let x=0; x<this.arrayFilled.length; x++) {
      if (this.arrayFilled[x] === $event) {
        isInside = true;
        break;
      }
    }
    if (!isInside) {
      this.arrayFilled.push($event);
    }
    let countBooleans: number = 0;
    for(let y=0; y<this.arrayFilled.length; y++){
      if(this.arrayFilled[y].value.length > 0)
        countBooleans++;
    }
    // console.log(this.arrayFilled);
    if(countBooleans == 2)
      this.isFormFilled = true;
    else
      this.isFormFilled = false;
  }

}
