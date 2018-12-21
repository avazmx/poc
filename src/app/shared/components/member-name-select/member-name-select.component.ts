import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Member } from 'src/app/shared/models/member.model';
import { ManageMember } from 'src/app/shared/models/manage-member.model';
import { MemberNameService } from '../../services/member-name.service';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import * as communityActions from 'src/app/community/store/actions/community-attributes.actions';
import { Community } from 'src/app/community/models/community.model';
import { ICellRendererAngularComp } from 'ag-grid-angular';

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
  public selectedMemberName;
  public CommunityObject: Community;
  public currentRow: number;
  public selectedLevelApproverOne: Member;
  public selectedAltLevelApproverOne: Member;
  public selectedLevelApproverTwo: Member;
  public selectedAtlLevelApproverTwo: Member;

  public tabTwoSelectedMembers: Member[] = [];
  public communityObject: Community;
  gridApi;
  gridColumnApi;

  constructor(private memberNameService: MemberNameService, private store: Store<Community>) { }
  ngOnInit() { }

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


  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  onMemberNameChange(selectedMemberName: string) {
    this.selectedMemberName = selectedMemberName;
    this.gridColumnApi.setColumnVisible('checkbox', true);
    this.gridApi.sizeColumnsToFit();
  }

}
