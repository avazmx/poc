import { Injectable } from '@angular/core';
import { BusinessUnit } from '../models/business-unit.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {
  private url = environment.apiUrl;
  private harcodedBusinessUnits: BusinessUnit[] = [];

  constructor(private http: HttpClient) {
    const comm1 = new BusinessUnit();
    comm1.id = 1;
    comm1.name = 'HardCoded value 1';
    const comm2 = new BusinessUnit();
    comm2.id = 2;
    comm2.name = 'HardCoded value 2';
    const comm3 = new BusinessUnit();
    comm3.id = 3;
    comm3.name = 'HardCoded value 3';
    this.harcodedBusinessUnits.push(comm1);
    this.harcodedBusinessUnits.push(comm2);
    this.harcodedBusinessUnits.push(comm3);
  }

  /**
   * Return the list of business units.
   */
  getBusinessUnits() {
    // return this.http.get<BusinessUnit[]>(this.url + 'business/v1/list');
    return this.http.get<BusinessUnit[]>(this.url + 'business/unit');
  }

  getHardCodedBusinessUnits() {
    return this.harcodedBusinessUnits;
  }

}
