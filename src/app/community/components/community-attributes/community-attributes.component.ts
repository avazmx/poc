import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CountryService } from 'src/app/shared/services/country.service';
import { NgOption } from '@ng-select/ng-select';
import { CommunityService } from '../../services/community.service';

@Component({
  selector: 'ups-community-attributes',
  templateUrl: './community-attributes.component.html',
  styleUrls: ['./community-attributes.component.scss']
})
export class CommunityAttributesComponent implements OnInit {
  @ViewChild('localForm') formFromLocal;
  form: FormGroup;

  columnDefs = [
    {headerName: 'Make', field: 'make' },
    {headerName: 'Model', field: 'model' },
    {headerName: 'Price', field: 'price'}
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxter', price: 72000 }
  ];

  constructor(
    private _formBuilder: FormBuilder,
    private _communityService: CommunityService,
    private _countriesService: CountryService) {

  }

  countries: NgOption[] = [];
  communityTypes: NgOption[] = [];
  formIsValid: EventEmitter<boolean>;

  ngOnInit() {

    // We create the form.
    this.form = this._formBuilder.group({
      community_type: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });

    // We fill the countries from the countries service.
    this._countriesService.getCountries().forEach(element => {
      this.countries.push({ id: element.country_id, value: element.name });
    });

    // We fill the community types.
    this._communityService.getCommunityTypes().forEach(element => {
      this.communityTypes.push({ id: element.community_type_id, name: element.name });
      console.log(element);
      console.log(this.communityTypes);
    });

    // We emit an event if the form changes.
    this.formIsValid = new EventEmitter();

    this._countriesService.getInfo().subscribe(data => {
      // console.log(data);
    });

  }

  onSubmit() {
    debugger;
    if (this.form.invalid) {
      return;
    }
    const communityType: CommunityType = {
      community_type_id: this.form.controls['community_type'].value,
      name: this.form.controls['community_type'].value
    };

    this._communityService.setCommunityAttributes(communityType, this.form.get('name').value, this.form.get('description').value);
    this.formIsValid.emit(true);
  }


}


/**
 * 
 * 
 * interface Community {
    community_id: number;
    community_type: CommunityType;
    name: string;
    description: string;
    geo_services: GeoService[];
    members: Member[];
    governance: GovernanceLevel[];   
}
 */