import { Component, OnInit } from '@angular/core';
import { AccessLevel } from '../../models/access-level.model';
import { AccessLevelService } from '../../services/access-level.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ManageMember } from 'src/app/shared/models/manage-member.model';
import * as communityActions from 'src/app/community/store/actions/community-attributes.actions';
import { Community } from 'src/app/community/models/community.model';

@Component({
  selector: 'ups-access-level-select',
  templateUrl: './access-level-select.component.html',
  styleUrls: ['./access-level-select.component.scss']
})
export class AccessLevelSelectComponent implements OnInit {
  public altData;
  public params: any;
  public cell: any;
  public accessLevelSubscription: Subscription;
  public accessLevels: AccessLevel[];
  public selectedAccessLevel: AccessLevel;
  public CommunityObject: Community;

  constructor(private accessLevelService: AccessLevelService, private store: Store<ManageMember>) { }
  ngOnInit() {
    // Subscribe to the store in order to get the updated object for the countries.
    this.store.select('community').subscribe((obj: Community) => {

      this.CommunityObject = obj;
      if (obj.activeTab === 1 && this.accessLevels.length === 0) {
        // Get countries
        this.fetchAccessLevels();
      } else if (obj.activeTab === 2 && this.accessLevels.length === 0) {
        if (obj.members && obj.members.length > 0) {
          obj.members.forEach(element => {
            this.accessLevels.push(element.accessLevel);
          });
        }
        else {
          this.fetchAccessLevels();
        }
      }
    });
  }

  fetchAccessLevels() {
    this.accessLevelService.getAccessLevels()
      .subscribe((accessLevels: AccessLevel[]) => {
        this.accessLevels = accessLevels;
      }, (error: HttpErrorResponse) => {
        this.accessLevels = this.accessLevelService.getHardCodedAccessLevels();
      });
  }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };


    // Subscribe to the store in order to get the updated object for the countries.
    this.accessLevelSubscription = this.store.select('community').subscribe((obj: any) => {
      this.accessLevels = [];

      // Get Business units
      this.accessLevelService.getAccessLevels()
        .subscribe((accessLevels: AccessLevel[]) => {
          this.accessLevels = accessLevels;
        }, (error: HttpErrorResponse) => {
          this.accessLevels = this.accessLevelService.getHardCodedAccessLevels();
        });
    });
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  onAccessLevelChange(selectedAccessLevel: string) {
    if (+selectedAccessLevel > 0) {
      this.selectedAccessLevel = this.accessLevels.filter(state => state.id === +selectedAccessLevel)[0];
      this.CommunityObject.activeRow = +this.params.node.id;
      this.store.dispatch(new communityActions.ActiveRow(+this.params.node.id));
    }
  }

}
