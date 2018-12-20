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
  public memberNameSubscription: Subscription;
  public memberNames: Member[];
  public selectedMemberName;
  public CommunityObject: Community;
  public currentRow: number;
  gridApi;
  gridColumnApi;

  constructor(private memberNameService: MemberNameService, private store: Store<Community>) {}
  ngOnInit() {
     // Subscribe to the store in order to get the updated object for the members.
     //this.store.select('community').subscribe((obj: Community) => {

    //   this.CommunityObject = obj;
    //   if (obj.activeTab === 1 && this.memberNames.length === 0) {
    //     // Get members
    //     this.fetchMembers();
    //   } else if (obj.activeTab === 2 && obj.activeRow === 0) {
    //     if (obj.members && obj.members.length > 0) {
    //       obj.members.forEach(element => {
    //         this.memberNames.push(element);
    //       });
    //     }
    //     else{
    //       this.fetchMembers();
    //     }
    //   }
    // });
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
      // Get Member units
      this.memberNameService.getMemberNames()
        .subscribe((memberNames: Member[]) => {
          this.memberNames = memberNames;
        }, (error: HttpErrorResponse) => {
            this.memberNames = this.memberNameService.getHardCodedMemberNames();
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
