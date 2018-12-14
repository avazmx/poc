import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  // countries: Country[] = [{ id: 1, name: 'Unated States Of America' }, { id: 2, name: 'México' }];
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * Return the list of countries.
   */
  getCountries() {
    return this.http.get<Country>(this.url + 'country');
  }
}
