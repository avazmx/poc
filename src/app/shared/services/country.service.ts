import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private url = environment.apiUrl;
  countries: Country[] = [{ id: 1, name: 'Unated States Of America' }, { id: 2, name: 'México' }];

  constructor(private http: HttpClient) { }

  /**
   * Return the list of countries.
   */
  getCountries() {
    return this.http.get(this.url + 'countries');
  }
}
