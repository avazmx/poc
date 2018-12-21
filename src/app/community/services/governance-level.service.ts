import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GovernanceLevel } from '../models/governance-level.model';

@Injectable({
  providedIn: 'root'
})
export class GovernanceLevelService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * Return the list of governance level.
   */
  getGovernanceLevel() {
    return this.http.get<GovernanceLevel>(this.url + 'governancelevel/governance-level');
  }
}
  