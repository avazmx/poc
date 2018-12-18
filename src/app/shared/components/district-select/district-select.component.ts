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

@Component({
  selector: 'ups-district-select',
  templateUrl: './district-select.component.html',
  styleUrls: ['./district-select.component.scss']
})
export class DistrictSelectComponent implements OnInit, OnDestroy, ICellRendererAngularComp {
  public altData;
  public params: any;
  public cell: any;
  district: District[];
  selectedDistrict: District;
  countryIdSubscription: Subscription;
  countryId: number;
  communityObject: Community;

  constructor(private districtService: DistrictService, private countryService: CountryService, private store: Store<Community>) { }

  ngOnInit() {

    
    // get Districts
    this.countryIdSubscription = this.countryService.getCountryId().subscribe(
      (countryId: number) => {
        this.districtService.getDistrictsByCountryId(countryId).subscribe((districts: District[]) => {
          this.district = districts;
        }, (error: HttpErrorResponse) => {
          console.log('Error trying to load the coutries list, I will load hardcoded data');
          this.district = this.districtService.getHardCodedDistricts(countryId);
        });
      }
    );

    this.store.select('community').subscribe((obj: Community) => {
      this.communityObject = obj;

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
    return true;
  }

  onDistrictChange(selectedDistrict: string) {
    if (+selectedDistrict > 0) {
      this.selectedDistrict = this.district.filter(state => state.id === +selectedDistrict)[0];
      this.districtService.setDistrictId(+selectedDistrict);
    }
  }

  ngOnDestroy(): void {
    this.countryIdSubscription.unsubscribe();
  }
}
