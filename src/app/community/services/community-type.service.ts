import { Injectable } from '@angular/core';
import { CommunityType } from '../models/community-type.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommunityTypeService {

  private harcodedCommunityTypes: CommunityType[] = [];
  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * This method will return the community types.
   */
  getCommunityTypes() {
    return this.http.get<CommunityType[]>(this.url + 'communitytypes/community-type');
  }

  /**
   * This method will return the hardcoded communities.
   */
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

}
