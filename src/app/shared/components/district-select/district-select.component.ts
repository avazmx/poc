import { Component, OnInit, OnDestroy } from '@angular/core';
import { DistrictService } from '../../services/district.service';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { District } from '../../models/district.model';
import { HttpErrorResponse } from '@angular/common/http';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';
import { map, switchMap, tap, concatMap } from 'rxjs/operators';

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
  countryIdSubscription: Subscription;
  countryId: number;
  constructor(private districtService: DistrictService, private countryService: CountryService) { }

  ngOnInit() {
    this.countryIdSubscription = this.countryService.getCountryId().subscribe(
      (countryId: number) => {
        this.districtService.getDistricts(countryId).subscribe((districts: District[]) => {
          this.district = districts;
        }, (error: HttpErrorResponse) => {
          console.log('Error trying to load the coutries list, I will load hardcoded data');
          this.district = this.districtService.getHardCodedDistricts(countryId);
        });
      }
    );
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

  onDistrictChange(selectedCountry: District) {

  }


  ngOnDestroy(): void {
    this.countryIdSubscription.unsubscribe();
  }
}
