import { Component, OnInit, OnDestroy } from '@angular/core';
import { DistrictService } from '../../services/district.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { District } from '../../models/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../../services/country.service';
import { Subscription, Subject } from 'rxjs';
import { map, switchMap, tap, concatMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Community } from 'src/app/community/models/community.model';
import * as communityActions from 'src/app/community/store/actions/community-attributes.actions';

@Component({
  selector: 'ups-district-select',
  templateUrl: './district-select.component.html',
  styleUrls: ['./district-select.component.scss']
})
export class DistrictSelectComponent implements OnInit, ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  districts: District[] = [];
  selectedDistrict: District;
  countryIdSubscription: Subscription;
  countryId: number;
  communityObject: Community;
  currentRow: number;
  tabNumber = -1;
  isShow = false;

  constructor(private districtService: DistrictService,
    private countryService: CountryService,
    private store: Store<Community>) { }

  ngOnInit() {
    this.currentRow = +this.params.node.id;
    // get Districts
    this.countryIdSubscription = this.countryService.getCountryId().subscribe(
      (countryId: number) => {
        this.districtService.getDistrictsByCountryId(countryId).subscribe((districts: District[]) => {
          let filteredDistricts;
          if (this.communityObject.activeTab === 2) {
            filteredDistricts = this.communityObject.geoServices.filter(geo =>
              countryId === geo.country.id
            );
            filteredDistricts.forEach(element => {
              const alreadyAdded = this.districts.filter(dist =>
                dist.id === element.district.id
              );
              if (alreadyAdded.length < 1) {
                this.districts.push(element.district);
              }
            });
          }
          if ((this.communityObject.activeRow === this.currentRow || this.districts.length === 0)
            && this.tabNumber === this.communityObject.activeTab && (!filteredDistricts || filteredDistricts.length < 1)) {
            this.districts = districts;
          }
        }, (error: HttpErrorResponse) => {
          this.districts = this.districtService.getHardCodedDistricts(countryId);
        });
      }
    );

    this.store.select('community').subscribe((obj: Community) => {
      if (this.tabNumber === -1) {
        this.tabNumber = obj.activeTab;
      }
      this.communityObject = obj;

      if (this.districts.length === 0 && this.communityObject.geoServices && this.communityObject.geoServices.length > 0) {
        if (this.communityObject.activeTab === 1) {
          if (this.communityObject.geoServices[this.currentRow]) {
            this.districts.push(this.communityObject.geoServices[this.currentRow].district);
            this.selectedDistrict = this.communityObject.geoServices[this.currentRow].district;
            this.isShow = true;
          }
        } else if (this.communityObject.activeTab === 2) {
          if (this.communityObject.members && this.communityObject.members[this.currentRow]) {
            this.districts.push(this.communityObject.members[this.currentRow].district);
            this.selectedDistrict = this.communityObject.members[this.currentRow].district;
            this.isShow = true;
          }
        }
      }

    });
  }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;
    this.params = params;
    this.cell = { row: params.value, col: params.colDef.headerName };
  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return false;
  }

  onDistrictChange(selectedDistrict: string) {
    if (+selectedDistrict > 0) {
      this.selectedDistrict = this.districts.filter(state => state.id === +selectedDistrict)[0];
      this.districtService.setDistrictId(+selectedDistrict);
    }
  }

  /* ngOnDestroy(): void {
    this.countryIdSubscription.unsubscribe();
  } */

}
