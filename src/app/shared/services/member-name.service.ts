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

  private memberId = new Subject<number>();
  // Emitters for the members change
  private memberOneState = new Subject<any>();
  private memberTwoState = new Subject<any>();
  private altMemberOneState = new Subject<any>();
  private altMembertwoState = new Subject<any>();

  // Public members for the governance level.
  public memberOne: Member;
  public memberTwo: Member;
  public altMemberOne: Member;
  public altMemberTwo: Member;

  public listOfMembers: Member[] = [];

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
   * Emittes a new member.
   * @param member the member to be emitted.
   */
  setMemberOne(member: any) {
    this.memberOneState.next(member);
  }

  /**
   * Gets the observable member
   */
  getMemberOneState() {
    return this.memberOneState.asObservable();
  }

  /**
   * Emittes a new member.
   * @param member the member to be emitted.
   */
  setAltMemberOne(member: any) {
    this.altMemberOneState.next(member);
  }

  /**
   * Gets the observable member
   */
  getAltMemberOneState() {
    return this.altMemberOneState.asObservable();
  }

  /**
    * Emittes a new member.
    * @param member the member to be emitted.
    */
  setMemberTwo(member: any) {
    this.memberTwoState.next(member);
  }

  /**
   * Gets the observable member
   */
  getMemberTwoState() {
    return this.memberTwoState.asObservable();
  }

  /**
   * Emittes a new member.
   * @param member the member to be emitted.
   */
  setAltMemberTwo(member: any) {
    this.altMembertwoState.next(member);
  }

  /**
   * Gets the observable member
   */
  getAltMemberTwoState() {
    return this.altMembertwoState.asObservable();
  }

  /**
   * Sets the id of the member id id selected
   * @param id id of the member id selected
   */
  setMemberId(id: number) {
    this.memberId.next(id);
  }

  /**
   * returns the id of the member selected
   */
  getMemberId() {
    return this.memberId.asObservable();
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
