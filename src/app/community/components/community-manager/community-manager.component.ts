import { Component, OnInit } from '@angular/core';

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

  arrayFilled: Array<any>;
  isFormFilled: boolean;

  constructor() {
    this.arrayFilled = new Array();
    this.isFormFilled = false;
  }

  ngOnInit() {
  }

  onChangeFormValidity(event) {
    if (event === true) {
      this.formNotValid = false;
    }
  }

  onInputChange($event) {
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
    // console.log(this.arrayFilled);
    if(countBooleans == 2)
      this.isFormFilled = true;
    else
      this.isFormFilled = false;
  }

}
