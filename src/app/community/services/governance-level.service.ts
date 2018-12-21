import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GovernanceLevel } from '../models/governance-level.model';
import { Governance } from '../models/governance.model';

@Injectable({
  providedIn: 'root'
})
export class GovernanceLevelService {
  private url = environment.apiUrl;
  private harcodedGovernanceLevels: GovernanceLevel[] = [];

  constructor(private http: HttpClient) {
    const comm1 = new GovernanceLevel();
    comm1.id = 1;
    comm1.name = 'HardCoded value 1';
    const comm2 = new GovernanceLevel();
    comm2.id = 2;
    comm2.name = 'HardCoded value 2';
    const comm3 = new GovernanceLevel();
    comm3.id = 3;
    comm3.name = 'HardCoded value 3';
    this.harcodedGovernanceLevels.push(comm1);
    this.harcodedGovernanceLevels.push(comm2);
    this.harcodedGovernanceLevels.push(comm3);
  }

  /**
   * Return the list of governance level.
   */
  getGovernanceLevel() {
    return this.http.get<GovernanceLevel>(this.url + 'governancelevel/governance-level');
  }

  getHardCodedGovernanceLevels() {
    return this.harcodedGovernanceLevels;
  }

}
