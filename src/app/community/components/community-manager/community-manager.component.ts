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
  wizzardLayout = 'large-filled';
  formNotValid = true;
  constructor() { }

  ngOnInit() {
  }

  onChangeFormValidity(event) {
    if (event === true) {
      this.formNotValid = false;
    }
  }

}
