import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MemberName } from '../models/member-name.model';

@Injectable({
  providedIn: 'root'
})
export class MemberNameService {
  private url = environment.apiUrl;
  public harcodedMemberNames: MemberName[] = [];

  constructor(private http: HttpClient) {
    const comm1 = new MemberName();
    comm1.id = 1;
    comm1.name = 'HardCoded value 1';
    const comm2 = new MemberName();
    comm2.id = 2;
    comm2.name = 'HardCoded value 2';
    const comm3 = new MemberName();
    comm3.id = 3;
    comm3.name = 'HardCoded value 3';
    this.harcodedMemberNames.push(comm1);
    this.harcodedMemberNames.push(comm2);
    this.harcodedMemberNames.push(comm3);
  }

  /**
   * Return the list of member names.
   */
  getMemberNames() {
    // return this.http.get<MemberName[]>(this.url + 'members/v1/list');
    return this.http.get<MemberName[]>(this.url + 'member');
  }

  getHardCodedMemberNames() {
    return this.harcodedMemberNames;
  }

}
