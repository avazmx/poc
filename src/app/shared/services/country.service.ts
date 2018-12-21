import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Country } from '../models/country.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = environment.apiUrl;
  private harcodedCountries: Country[] = [];
  public membersCountries: Country[] = [];

  constructor(private http: HttpClient) {
    const comm1 = new Country();
    comm1.id = 1;
    comm1.name = 'HardCoded value 1';
    const comm2 = new Country();
    comm2.id = 2;
    comm2.name = 'HardCoded value 2';
    const comm3 = new Country();
    comm3.id = 3;
    comm3.name = 'HardCoded value 3';
    this.harcodedCountries.push(comm1);
    this.harcodedCountries.push(comm2);
    this.harcodedCountries.push(comm3);
  }

  private countryIdState = new Subject<number>();
  private memberCountriesState = new Subject<Country[]>();

  setCountryId(id: number) {
    this.countryIdState.next(id);
  }

  getCountryId() {
    return this.countryIdState.asObservable();
  }

  addMembersCounties(country: Country) {
    this.membersCountries.push(country);
    this.memberCountriesState.next(this.membersCountries);
  }

  getMembersCountries() {
    return this.memberCountriesState.asObservable();
  }

  /**
   * Return the list of countries.
   */
  getCountries(): Observable<Country[]> {
    // return this.http.get<Country[]>(this.url + 'countries/v1/list');
    return this.http.get<Country[]>(this.url + 'countries');
  }

  getHardCodedCountries() {
    return this.harcodedCountries;
  }

}
