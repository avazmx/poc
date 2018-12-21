import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberNameService {
  private url = environment.apiUrl;
  public harcodedMemberNames: Member[] = [];

  constructor(private http: HttpClient) {
    const comm1 = new Member();
    comm1.id = 1;
    comm1.name = 'Vikash value 1';
    const comm2 = new Member();
    comm2.id = 2;
    comm2.name = 'Mango value 2';
    const comm3 = new Member();
    comm3.id = 3;
    comm3.name = 'Satish value 3';
    this.harcodedMemberNames.push(comm1);
    this.harcodedMemberNames.push(comm2);
    this.harcodedMemberNames.push(comm3);
  }

  /**
   * Return the list of member names.
   */
  getMemberNames(): Observable<Member[]> {
    return this.http.get<any>(this.url + 'members/v1/list');
    // return this.http.get<Member[]>(this.url + 'member');
  }

  getHardCodedMemberNames() {
    return this.harcodedMemberNames;
  }

}
