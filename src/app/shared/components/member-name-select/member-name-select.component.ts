import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MemberName } from '../../models/member-name.model';
import { Member } from 'src/app/shared/models/member.model';
import { MemberNameService } from '../../services/member-name.service';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import * as communityActions from 'src/app/community/store/actions/community-attributes.actions';
import { Community } from 'src/app/community/models/community.model';

@Component({
  selector: 'ups-member-name-select',
  templateUrl: './member-name-select.component.html',
  styleUrls: ['./member-name-select.component.scss']
})
export class MemberNameSelectComponent implements OnInit {
  public altData;
  public params: any;
  public cell: any;
  public memberNameSubscription: Subscription;
  public memberNames: MemberName[];
  public selectedMemberName: MemberName;
  public CommunityObject: Community;

  constructor(private memberNameService: MemberNameService, private store: Store<Member>) { }
  ngOnInit() {
     // Subscribe to the store in order to get the updated object for the countries.
     this.store.select('community').subscribe((obj: Community) => {

      this.CommunityObject = obj;
      if (obj.activeTab === 1 && this.memberNames.length === 0) {
        // Get countries
        this.fetchMembers();
      } else if (obj.activeTab === 2 && this.memberNames.length === 0) {
        if (obj.members && obj.members.length > 0) {
          obj.members.forEach(element => {
            this.memberNames.push(element);
          });
        }
        else{
          this.fetchMembers();
        }
      }
    });
  }

  fetchMembers() {
    this.memberNameService.getMemberNames()
          .subscribe((memberNames: MemberName[]) => {
            this.memberNames = memberNames;
          }, (error: HttpErrorResponse) => {
            this.memberNames = this.memberNameService.getHardCodedMemberNames();
          });
  }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };


    // Subscribe to the store in order to get the updated object for the countries.
    this.memberNameSubscription = this.store.select('business').subscribe((obj: Member) => {
      this.memberNames = [];

      // Get Business units
      this.memberNameService.getMemberNames()
        .subscribe((memberNames: MemberName[]) => {
          this.memberNames = memberNames;
        }, (error: HttpErrorResponse) => {
            this.memberNames = this.memberNameService.getHardCodedMemberNames();
        });
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

}
