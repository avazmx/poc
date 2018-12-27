import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Member } from '../models/member.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberNameService {
  private url = environment.apiUrl;
  public harcodedMemberNames: Member[] = [];

  private memberOneState = new Subject<any>();
  private memberTwoState = new Subject<any>();
  private altMemberOneState = new Subject<any>();
  private altMembertwoState = new Subject<any>();

  public memberOne: Member;
  public memberTwo: Member;
  public altMemberOne: Member;
  public altMemberTwo: Member;

  setMemberOne(member: any) {
    this.memberOneState.next(member);
  }

  getMemberOneState() {
    return this.memberOneState.asObservable();
  }

  setAltMemberOne(member: any) {
    this.altMemberOneState.next(member);
  }

  getAltMemberOneState() {
    return this.altMemberOneState.asObservable();
  }

  setMemberTwo(member: any) {
    this.memberTwoState.next(member);
  }

  getMemberTwoState() {
    return this.memberTwoState.asObservable();
  }

  setAltMemberTwo(member: any) {
    this.altMembertwoState.next(member);
  }

  getAltMemberTwoState() {
    return this.altMembertwoState.asObservable();
  }


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
    return this.http.get<any>(this.url + 'members/member');
    // return this.http.get<Member[]>(this.url + 'member');
  }

  getHardCodedMemberNames() {
    return this.harcodedMemberNames;
  }

}
