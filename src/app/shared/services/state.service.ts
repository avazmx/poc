import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private url = environment.apiUrl;
  private harcodedStates: State[] = [];
  constructor(private http: HttpClient) {
    const comm1 = new State();
    comm1.id = 1;
    comm1.name = 'HardCoded value 1';
    const comm2 = new State();
    comm2.id = 2;
    comm2.name = 'HardCoded value 2';
    const comm3 = new State();
    comm3.id = 3;
    comm3.name = 'HardCoded value 3';
    this.harcodedStates.push(comm1);
    this.harcodedStates.push(comm2);
    this.harcodedStates.push(comm3);
  }

  /**
   * Return the list of states.
   */
  getStates() {
    return this.http.get<State[]>(this.url + 'state/province');
  }

  getHardCodedStates() {

    return this.harcodedStates;
  }
}
