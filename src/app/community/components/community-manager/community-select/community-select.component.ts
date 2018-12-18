import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { Observable } from 'rxjs/Observable';
import { Community } from 'src/app/community/models/community.model';
import { Country } from 'src/app/shared/models/country.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';
import { CountryService } from 'src/app/shared/services/country.service';
import { attributesDef } from '../../../models/attributes-def';
import { StateService } from 'src/app/shared/services/state.service';
import { DistrictService } from 'src/app/shared/services/district.service';

@Component({
  selector: 'ups-community-select',
  templateUrl: './community-select.component.html',
  styleUrls: ['./community-select.component.scss']
})

export class CommunitySelectComponent implements OnInit, ICellRendererAngularComp {
  altData;
  attributesDef;
  countries: Country[];
  districts: District[];
  allDistricts: District[] = [];
  states: State[];
  allStates: State[] = [];
  public groundChecked: boolean;
  public threeDsChecked: boolean;
  public twoDsChecked: boolean;
  public oneDsChecked: boolean;
  community$: Observable<Community>;
  CommunityObject: Community;

  @ViewChild('ddlDistrict') ddlDistrict: ElementRef;
  @ViewChild('ddlState') ddlState: ElementRef;
  @ViewChild('ddlCountry') ddlCountry: ElementRef;

  constructor(private countryService: CountryService, private districtService: DistrictService, private stateService: StateService,
    private store: Store<Community>) {
    this.groundChecked = false;
    this.threeDsChecked = false;
    this.twoDsChecked = false;
    this.oneDsChecked = false;
    this.attributesDef = attributesDef;
  }

  ngOnInit() {

  }

  // AG Grid Initialize
  agInit(params: any) {
    this.altData = params.value;

  }

  // AG Grid reload
  refresh(params: any): boolean {
    this.altData = params.value;
    return true;
  }

  // groundCheckedSelected checkmark boolean
  groundCheckedSelected() {
    this.groundChecked = !this.groundChecked;
    console.log(this.groundChecked);
  }

  // threeDsCheckedSelected checkmark boolean
  threeDsCheckedSelected() {
    this.threeDsChecked = !this.threeDsChecked;
    console.log(this.threeDsChecked);
  }

  // twoDsCheckedSelected checkmark boolean
  twoDsCheckedSelected() {
    this.twoDsChecked = !this.twoDsChecked;
    console.log(this.twoDsChecked);
  }

  // oneDsCheckedSelected checkmark boolean
  oneDsCheckedSelected() {
    this.oneDsChecked = !this.oneDsChecked;
    console.log(this.oneDsChecked);
  }

}
