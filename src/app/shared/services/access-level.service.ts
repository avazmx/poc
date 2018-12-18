import { Injectable } from '@angular/core';
import { AccessLevel } from '../models/access-level.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccessLevelService {
  private url = environment.apiUrl;
  public harcodedAccessLevels: AccessLevel[] = [];

  constructor(private http: HttpClient) {
    const comm1 = new AccessLevel();
    comm1.id = 1;
    comm1.name = 'HardCoded value 1';
    const comm2 = new AccessLevel();
    comm2.id = 2;
    comm2.name = 'HardCoded value 2';
    const comm3 = new AccessLevel();
    comm3.id = 3;
    comm3.name = 'HardCoded value 3';
    this.harcodedAccessLevels.push(comm1);
    this.harcodedAccessLevels.push(comm2);
    this.harcodedAccessLevels.push(comm3);
  }

  /**
   * Return the list of access levels.
   */
  getAccessLevels() {
    // return this.http.get<AccessLevel[]>(this.url + 'accesslevels/v1/list');
    return this.http.get<AccessLevel[]>(this.url + 'accesslevels/');
  }

  getHardCodedAccessLevels() {
    return this.harcodedAccessLevels;
  }

}
