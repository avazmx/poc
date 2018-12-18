import { Injectable } from '@angular/core';
import { BusinessUnit } from '../models/business-unit.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessUnitService {
  private url = environment.apiUrl;
  public membersCountries: BusinessUnit[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Return the list of countries.
   */
  getBusinessUnit() {
    return this.http.get<BusinessUnit[]>(this.url + 'businessunit/v1/list');
  }

}
