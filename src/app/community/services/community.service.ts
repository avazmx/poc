import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ManageMember } from '../../shared/models/manage-member.model';
import { CommunityType } from '../models/community-type.model';
import { Community } from '../models/community.model';
import { GeoService } from '../models/geo-services.model';
import { Governance } from '../models/governance.model';
import { GovernanceLevel } from '../models/governance-level.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  subject: Subject<Object>;
  private community: Community;
  private communityUpdated = new Subject<{ community: Community }>();

  private geoServices: GeoService[] = [];
  private geoServicesUpdated = new Subject<{ geoServices: GeoService[] }>();

  private members: ManageMember[] = [];
  private membersUpdated = new Subject<{ members: ManageMember[] }>();

  private harcodedCommunityTypes: CommunityType[] = [];
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * This method will return all the communities from the database.
   */
  getCommunities() {
    return this.http.get<Community[]>(this.url + 'communitystore/community-store');
  }

  /**
   * This method will return the values from GeoServices, Manage Members and Governance.
   * @param id is related to the id from the community.
   * {geoServices: GeoService[],
      members: ManageMember[], governance: Governance[],
      governanceLevel: GovernanceLevel}
   */
  getCommunityDetail(id: string) {
    return this.http.get<[]>(this.url + 'communitystore/community-store/' + id);
  }

  /**
   * This method saves the community object into the database.
   * @param community the community to be added.
   */
  addCommunity(community: any): Observable<any> {
    return this.http.post<any>(this.url + 'communitystore/community-store', community);
  }

}
