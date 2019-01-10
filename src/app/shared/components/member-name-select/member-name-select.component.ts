import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
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
  public memberNames: Member[] = [];
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
  selectedOption = null;
  isShow = false;


  @ViewChild('ddlMember') ddlMember: ElementRef;


  public tabTwoSelectedMembers: Member[] = [];
  gridApi;
  gridColumnApi;


  defaultOption = '0';
  memberSelectOption = new Member();



  @Output() isMemberNameSet: EventEmitter<boolean> = new EventEmitter();

  constructor(private memberNameService: MemberNameService, private store: Store<Community>) { }
  ngOnInit() {
    this.currentRow = +this.params.node.id;
    this.memberSelectOption.id = 0;
    this.memberSelectOption.name = 'Select';



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
        // this.memberNames.unshift(this.memberSelectOption);
      } else {
        // Get Member units
        if (this.communityObject.members && this.communityObject.members.length > 0) {
          if (this.communityObject.activeTab === 2) {
            if (this.communityObject.members[this.currentRow]) {
              this.memberNames = [];
              const selectedMemberTabTwo: Member = {
                id: this.communityObject.members[this.currentRow].id,
                email: this.communityObject.members[this.currentRow].email,
                lastNameL: this.communityObject.members[this.currentRow].lastName,
                name: this.communityObject.members[this.currentRow].name
              };

              this.memberNames.push(selectedMemberTabTwo);
              this.selectedMember = selectedMemberTabTwo;
              this.isShow = true;
            }
          } else if (this.communityObject.activeTab === 3) {
            if (this.communityObject.governance[this.currentRow]) {
              this.memberNames = [];
              const selectedMemberTabTwo: Member = {
                id: this.communityObject.governance[this.currentRow].id,
                email: this.communityObject.governance[this.currentRow].email,
                lastNameL: this.communityObject.governance[this.currentRow].lastName,
                name: this.communityObject.governance[this.currentRow].name
              };

              this.memberNames.push(selectedMemberTabTwo);
              this.selectedMember = selectedMemberTabTwo;
              this.isShow = true;
            }
          }
        } else {
          if (this.memberNames.length === 0) {
            this.fetchMembers();
          }
        }
      }


      if (this.communityObject.activeTab === 3) {
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

    });
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
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return false;
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
    } else if (this.communityObject.activeTab === 3) {






      // if (this.isLevelOneSelected) {
      //   this.memberNameService.isMemberTwoSelected = false;
      //   if (this.memberNameService.memberTwo) {

      //     if (this.memberNameService.memberTwo.id === this.selectedMember.id) {
      //       this.isLevelOneSelected = false;
      //       alert('should be different in select approver one');
      //       this.defaultOption = this.memberSelectOption.id.toString();
      //       this.ddlMember.nativeElement.value = '0';
      //       this.selectedMember = null;
      //       this.memberNameService.memberOne = null;

      //     } else {

      //       this.ddlMember.nativeElement.value = this.selectedMember.id.toString();
      //       this.isLevelOneSelected = false;
      //       this.memberNameService.setMemberOne(false);
      //       this.selectedLevelApproverOne = this.selectedMember;
      //       this.memberNameService.memberOne = this.selectedLevelApproverOne;

      //     }
      //   } else {

      //     this.isLevelOneSelected = false;
      //     this.memberNameService.setMemberOne(false);
      //     this.selectedLevelApproverOne = this.selectedMember;
      //     this.memberNameService.memberOne = this.selectedLevelApproverOne;

      //   }
      //   this.isLevelOneSelected = false;
      //   this.memberNameService.setMemberOne(false);

      // } else if (this.isLevelTwoSelected) {
      //   this.memberNameService.isMemberTwoSelected = false;
      //   if (this.memberNameService.memberOne) {

      //     if (this.memberNameService.memberOne.id === this.selectedMember.id) {
      //       this.isLevelTwoSelected = false;
      //       alert('should be different in select approver two');
      //       this.defaultOption = this.memberSelectOption.id.toString();
      //       this.ddlMember.nativeElement.value = '0';
      //       this.selectedMember = null;
      //       this.memberNameService.memberTwo = null;

      //     } else {

      //       this.isLevelTwoSelected = false;
      //       this.memberNameService.setMemberTwo(false);
      //       this.ddlMember.nativeElement.value = this.selectedMember.id.toString();
      //       this.selectedLevelApproverTwo = this.selectedMember;
      //       this.memberNameService.memberTwo = this.selectedLevelApproverTwo;

      //     }

      //   } else {

      //     this.isLevelTwoSelected = false;
      //     this.memberNameService.setMemberTwo(false);
      //     this.selectedLevelApproverTwo = this.selectedMember;
      //     this.memberNameService.memberTwo = this.selectedLevelApproverTwo;

      //   }
      //   this.isLevelTwoSelected = false;
      //   this.memberNameService.setMemberTwo(false);
      // }


      // if (this.isAltLevelOneSelected) {

      //   this.memberNameService.setAltMemberOne(false);
      //   this.selectedAltLevelApproverOne = this.selectedMember;
      //   this.memberNameService.altMemberOne = this.selectedAltLevelApproverOne;

      // }
      // if (this.isAltLevelTwoSelected) {

      //   this.memberNameService.setAltMemberTwo(false);
      //   this.selectedAtlLevelApproverTwo = this.selectedMember;
      //   this.memberNameService.altMemberTwo = this.selectedAtlLevelApproverTwo;

      // }
    }
    if (this.selectedMember && +this.selectedMember.id > 0) {
      this.memberNameService.setMemberId(+this.selectedMember.id);
    }
  }

  onMemberNameSet(isMemberNameSet: boolean) {
    this.isMemberNameSet.emit(isMemberNameSet);
  }

}
