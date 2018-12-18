import { Injectable } from '@angular/core';
import { AccessLevel } from '../models/access-level.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelService {
  private url = environment.apiUrl;
  public membersCountries: AccessLevel[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Return the list of countries.
   */
  getBusinessUnit() {
    return this.http.get<AccessLevel[]>(this.url + 'accesslevels/v1/list');
  }

}
