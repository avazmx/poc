import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, fromEventPattern } from 'rxjs';
import { Community } from 'src/app/community/models/community.model';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {

  private community: Community;
  private communityUpdated = new Subject<{ community: Community }>();

  private geoServices: GeoService[] = [];
  private geoServicesUpdated = new Subject<{ geoServices: GeoService[] }>();

  private members: Member[] = [];
  private membersUpdated = new Subject<{ members: Member[] }>();

  
  private url = environment.apiUrl;

  // private communityTypes: CommunityType[] = [{ community_type_id: 1, name: 'Community type 1' }, { community_type_id: 2, name: 'Community type 2' }];

  constructor(private http: HttpClient) { }

  /**
    * Return the list of countries.
    */

  getCommunityTypes() {
    // return this.http.get(this.url + 'governance/level');
    return this.http.get(this.url + 'countries');
  }


  getGovernanceLevel() {
    return this.http.get(this.url + 'governance/level');
  }

  setCommunityAttributes(communityTipe: CommunityType, name: string, description: string) {

    this.community.community_type = communityTipe;
    this.community.name = name;
    this.community.description = description;

    this.communityUpdated.next({ community: this.community });
  }
}
