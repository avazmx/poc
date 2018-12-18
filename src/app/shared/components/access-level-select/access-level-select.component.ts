import { Component, OnInit } from '@angular/core';
import { AccessLevel } from '../../models/access-level.model';
import { AccessLevelService } from '../../services/access-level.service';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Member } from 'src/app/community/models/member.model';

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
  public selectedaccessLevel: AccessLevel;

  constructor(private accessLevelService: AccessLevelService, private store: Store<Member>) { }
  ngOnInit() { }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };


    // Subscribe to the store in order to get the updated object for the countries.
    this.accessLevelSubscription = this.store.select('business').subscribe((obj: Member) => {
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

}
