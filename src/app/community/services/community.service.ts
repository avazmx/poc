import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Subject, fromEventPattern } from 'rxjs';
import { Community } from '../models/community.model';

import { environment } from '../../../environments/environment';
import { Member } from '../models/member.model';
import { GeoService } from '../models/geo-services.model';
import { CommunityType } from '../models/community-type.model';
import { District } from 'src/app/shared/models/district.model';
import { State } from 'src/app/shared/models/state.model';
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

  private members: Member[] = [];
  private membersUpdated = new Subject<{ members: Member[] }>();

  private harcodedCommunityTypes: CommunityType[] = [];

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCommunityTypes() {
    return this.http.get<CommunityType>(this.url + 'community/type');
  }

  getHardCodedCommunityTypes() {
    const comm1 = new CommunityType();
    comm1.community_type_id = 1;
    comm1.description = 'HardCoded value 1';
    comm1.name = 'HardCoded value 1';
    const comm2 = new CommunityType();
    comm2.community_type_id = 1;
    comm2.description = 'HardCoded value 1';
    comm2.name = 'HardCoded value 1';
    const comm3 = new CommunityType();
    comm3.community_type_id = 1;
    comm3.description = 'HardCoded value 1';
    comm3.name = 'HardCoded value 1';
    this.harcodedCommunityTypes.push(comm1);
    this.harcodedCommunityTypes.push(comm2);
    this.harcodedCommunityTypes.push(comm3);

    return this.harcodedCommunityTypes;
  }


  getDistricts() {
    return this.http.get<District[]>(this.url + 'district');
  }

  getStates() {
    return this.http.get<State[]>(this.url + 'state/province');
  }

  getSlicLow() {
    return this.http.get<GeoService>(this.url + 'geo/service');
  }

  getSlicHigh() {
    return this.http.get<GeoService>(this.url + 'geo/service');
  }

  getGovernanceLevel() {
    return this.http.get<GovernanceLevel>(this.url + 'governance/level');
  }
}
