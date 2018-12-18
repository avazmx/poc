import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MemberName } from '../../models/member-name.model';
import { Member } from 'src/app/community/models/member.model';
import { MemberNameService } from '../../services/member-name.service';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

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
  public selectedmemberName: MemberName;

  constructor(private memberNameService: MemberNameService, private store: Store<Member>) { }
  ngOnInit() { }

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
