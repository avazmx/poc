import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countries: Country[] = [{ country_id: 1, name: 'Unated States Of America' }, { country_id: 2, name: 'México' }];
  carUrl = 'http://22HW020536:8080/governance/level';

  constructor(
    private http: HttpClient
    ) {

  }

  /**
   * Return the list of countries.
   */
  getCountries() {

    // return this.http.get('whatever the url is/countries');
    return this.countries;

  }

  getInfo() {
    return this.http.get('http://22HW020536:8080/governance/level');
  }

}
