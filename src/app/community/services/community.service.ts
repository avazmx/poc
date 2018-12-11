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

  private url = 'http://22HW020536:8080/';
  private localUrl = 'http://10.101.170.1:8080/';

  constructor(
    private http: HttpClient,
    ) {
  }

  getCountries() {
    return this.http.get(this.url + 'countries');
  }

  getDistricts() {
    return this.http.get(this.url + 'district');
  }

  getStates() {
    return this.http.get(this.url + 'state/province');
  }

  getSlicLow() {
    return this.http.get(this.url + 'geo/service');
  }

  getSlicHigh() {
    return this.http.get(this.url + 'geo/service');
  }

  setCommunityAttributes(communityTipe: CommunityType, name: string, description: string) {

    this.community.community_type = communityTipe;
    this.community.name = name;
    this.community.description = description;

    this.communityUpdated.next({ community: this.community });
  }

}
