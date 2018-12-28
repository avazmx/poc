import { Component, OnInit, Input, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/shared/models/member.model';
// import { ManageMember } from 'src/app/shared/models/manage-member.model';
import { MemberNameService } from '../../services/member-name.service';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
// import * as communityActions from 'src/app/community/store/actions/community-attributes.actions';
import { Community } from 'src/app/community/models/community.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { disableDebugTools } from '@angular/platform-browser';
//Services

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
        this.memberNameService.setMemberOne(false);
        this.isLevelOneSelected = false;
        this.selectedLevelApproverOne = this.selectedMember;
        this.memberNameService.memberOne = this.selectedLevelApproverOne;
      } if (this.isLevelTwoSelected) {
        this.memberNameService.setMemberTwo(false);
        this.selectedLevelApproverTwo = this.selectedMember;
        this.memberNameService.memberTwo = this.selectedLevelApproverTwo;
      } if (this.isAltLevelOneSelected) {
        this.memberNameService.setAltMemberOne(false);
        this.selectedAltLevelApproverOne = this.selectedMember;
        this.memberNameService.altMemberOne = this.selectedAltLevelApproverOne;
      } if (this.isAltLevelTwoSelected) {
        this.memberNameService.setAltMemberTwo(false);
        this.selectedAtlLevelApproverTwo = this.selectedMember;
        this.memberNameService.altMemberTwo = this.selectedAtlLevelApproverTwo;
      }
    }
  }

  onMemberNameSet(isMemberNameSet: boolean) {
    this.isMemberNameSet.emit(isMemberNameSet);
  }

}
