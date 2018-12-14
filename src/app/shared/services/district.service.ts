import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { District } from '../models/district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * Return the list of districts.
   */
  getDistricts() {
    return this.http.get<District>(this.url + 'district');
  }
}
