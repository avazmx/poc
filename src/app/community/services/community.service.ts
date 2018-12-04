import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

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

  private communityTypes: CommunityType[] = [{ community_type_id: 1, name: 'Community type 1' }, { community_type_id: 2, name: 'Community type 2' }];

  constructor(private http: HttpClient) { }

  /**
    * Return the list of countries.
    */
  getCommunityTypes() {
    // return this.http.get('whatever the url is/comunitiesTypes');
    return this.communityTypes;
  }

  setCommunityAttributes(communityTipe: CommunityType, name: string, description: string) {
   
    this.community.community_type = communityTipe;
    this.community.name = name;
    this.community.description = description;

    this.communityUpdated.next({ community: this.community });
  }
}
