import { Injectable } from '@angular/core';
import { AccessLevel } from '../models/access-level.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

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

  // Subject created for validation
  private accessLevelId = new Subject<number>();

  /**
   * Return the list of access levels.
   */
  /**
   * Sets the id of the access level id selected
   * @param id id of the access level selected
   */
  setAccessLevelId(id: number) {
    this.accessLevelId.next(id);
  }
  /**
   * Returns the id of the access level selected
   */
  getAccessLevelId() {
    return this.accessLevelId.asObservable();
  }

  getAccessLevels() {
    return this.http.get<AccessLevel[]>(this.url + 'access-level/service');
    // return this.http.get<AccessLevel[]>(this.url + 'access/level');
  }

  getHardCodedAccessLevels() {
    return this.harcodedAccessLevels;
  }

}
