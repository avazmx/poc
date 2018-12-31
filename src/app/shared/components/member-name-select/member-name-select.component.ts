import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Community } from 'src/app/community/models/community.model';
import { Member } from 'src/app/shared/models/member.model';

import { MemberNameService } from '../../services/member-name.service';

@Component({
  selector: 'ups-member-name-select',
  templateUrl: './member-name-select.component.html',
  styleUrls: ['./member-name-select.component.scss']
})
export class MemberNameSelectComponent implements OnInit, ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  public memberNames: Member[];
  public selectedMember: Member;
  public communityObject: Community;
  public currentRow: number;

  public selectedLevelApproverOne: Member = null;
  public selectedAltLevelApproverOne: Member = null;
  public selectedLevelApproverTwo: Member = null;
  public selectedAtlLevelApproverTwo: Member = null;

  public isLevelOneSelected = false;
  public isLevelTwoSelected = false;
  public isAltLevelOneSelected = false;
  public isAltLevelTwoSelected = false;


  public tabTwoSelectedMembers: Member[] = [];
  gridApi;
  gridColumnApi;

  @Output() isMemberNameSet: EventEmitter<boolean> = new EventEmitter();

  constructor(private memberNameService: MemberNameService, private store: Store<Community>) { }
  ngOnInit() {
  }

  fetchMembers() {
    this.memberNameService.getMemberNames()
      .subscribe((memberNames: Member[]) => {
        this.memberNames = memberNames;
      }, (error: HttpErrorResponse) => {
        this.memberNames = this.memberNameService.getHardCodedMemberNames();
      });
  }

  // AG Grid Initialize
  agInit(params: any) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };

    this.store.select('community').subscribe(selectedCommunity => {
      this.communityObject = selectedCommunity;

      if (this.communityObject.activeTab === 3) {
        for (let index = 0; index < this.communityObject.members.length; index++) {
          const member = this.communityObject.members[index];

          const memberTab2: Member = {
            id: member.id,
            email: member.email,
            lastNameL: member.lastName,
            name: member.name
          };

          this.tabTwoSelectedMembers.push(memberTab2);
        }
        this.memberNames = this.tabTwoSelectedMembers;
      } else {
        // Get Member units
        this.memberNameService.getMemberNames()
          .subscribe((memberNames: Member[]) => {
            this.memberNames = memberNames;
          }, (error: HttpErrorResponse) => {
            this.memberNames = this.memberNameService.getHardCodedMemberNames();
          });
      }
    });

    this.memberNameService.getMemberOneState().subscribe(one => {
      this.isLevelOneSelected = one;
    });
    this.memberNameService.getMemberTwoState().subscribe(two => {
      this.isLevelTwoSelected = two;
    });
    this.memberNameService.getAltMemberOneState().subscribe(altTwo => {
      this.isAltLevelOneSelected = altTwo;
    });
    this.memberNameService.getAltMemberTwoState().subscribe(altTwo => {
      this.isAltLevelTwoSelected = altTwo;
    });

  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  /**
   * Fires when the select changes, we check if we are in the third tab and do some validations.
   * @param selectedMemberName the selected member id.
   */
  onMemberNameChange(selectedMemberName: any) {
    this.selectedMember = this.memberNames.filter(id => id.id === +selectedMemberName.target.value)[0];

    if (this.communityObject.activeTab !== 3) {
      this.gridColumnApi.setColumnVisible('checkbox', true);
      this.gridApi.sizeColumnsToFit();
    } else {

      if (this.isLevelOneSelected) {

        console.log('One selected => ', this.isLevelOneSelected);
        console.log('two selected => ', this.isLevelTwoSelected);
        console.log('Alt One selected => ', this.isAltLevelOneSelected);
        console.log('Alt two selected => ', this.isAltLevelTwoSelected);

        this.memberNameService.setMemberOne(false);
        this.isLevelOneSelected = false;
        this.selectedLevelApproverOne = this.selectedMember;
        this.memberNameService.memberOne = this.selectedLevelApproverOne;

      } if (this.isLevelTwoSelected) {
        console.log('two selected => ', this.isLevelTwoSelected);
        console.log('Alt One selected => ', this.isAltLevelOneSelected);
        console.log('Alt two selected => ', this.isAltLevelTwoSelected);
        console.log('One selected => ', this.isLevelOneSelected);

        this.memberNameService.setMemberTwo(false);
        this.selectedLevelApproverTwo = this.selectedMember;
        this.memberNameService.memberTwo = this.selectedLevelApproverTwo;
        if (this.memberNameService.memberOne.id === this.selectedMember.id) {
          console.log('Service member one === ', this.selectedMember);
        }

      } if (this.isAltLevelOneSelected) {
        console.log('Alt One selected => ', this.isAltLevelOneSelected);
        console.log('Alt two selected => ', this.isAltLevelTwoSelected);
        console.log('One selected => ', this.isLevelOneSelected);
        console.log('two selected => ', this.isLevelTwoSelected);

        this.memberNameService.setAltMemberOne(false);
        this.selectedAltLevelApproverOne = this.selectedMember;
        this.memberNameService.altMemberOne = this.selectedAltLevelApproverOne;

      } if (this.isAltLevelTwoSelected) {
        console.log('Alt two selected => ', this.isAltLevelTwoSelected);
        console.log('One selected => ', this.isLevelOneSelected);
        console.log('two selected => ', this.isLevelTwoSelected);
        console.log('Alt One selected => ', this.isAltLevelOneSelected);

        this.memberNameService.setAltMemberTwo(false);
        this.selectedAtlLevelApproverTwo = this.selectedMember;
        this.memberNameService.altMemberTwo = this.selectedAtlLevelApproverTwo;

      }


      console.log(this.memberNameService.memberOne);
      console.log(this.memberNameService.memberTwo);
      console.log(this.memberNameService.altMemberTwo);
      console.log(this.memberNameService.altMemberOne);
    }

    if (+this.selectedMember.id > 0) {
      this.memberNameService.setMemberId(+this.selectedMember.id);
    }
  }

  onMemberNameSet(isMemberNameSet: boolean) {
    this.isMemberNameSet.emit(isMemberNameSet);
  }

}
