import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MemberName } from '../models/member-name.model';

@Injectable({
  providedIn: 'root'
})
export class MemberNameService {
  private url = environment.apiUrl;
  public membersCountries: MemberName[] = [];

  constructor(private http: HttpClient) { }

  /**
   * Return the list of countries.
   */
  getBusinessUnit() {
    return this.http.get<MemberName[]>(this.url + 'members/v1/list');
  }

}
