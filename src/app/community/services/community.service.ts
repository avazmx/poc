import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { environment } from '../../../environments/environment';
import { ManageMember } from '../../shared/models/manage-member.model';
import { CommunityType } from '../models/community-type.model';
import { Community } from '../models/community.model';
import { GeoService } from '../models/geo-services.model';

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

  getCommunityTypes() {
    return this.http.get<CommunityType[]>(this.url + 'communitytypes/community-type');
  }

  getHardCodedCommunityTypes() {
    const comm1 = new CommunityType();
    comm1.id = 1;
    comm1.description = 'HardCoded value 1';
    comm1.name = 'HardCoded value 1';
    const comm2 = new CommunityType();
    comm2.id = 2;
    comm2.description = 'HardCoded value 2';
    comm2.name = 'HardCoded value 2';
    const comm3 = new CommunityType();
    comm3.id = 3;
    comm3.description = 'HardCoded value 3';
    comm3.name = 'HardCoded value 3';
    this.harcodedCommunityTypes.push(comm1);
    this.harcodedCommunityTypes.push(comm2);
    this.harcodedCommunityTypes.push(comm3);

    return this.harcodedCommunityTypes;
  }

  /**
   * This method saves the community object into the database.
   * @param community the community to be added.
   */
  addPost(community: any): Observable<any> {
    return this.http.post<any>(this.url + 'communitystore/community-store', community);
  }


}
