import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { State } from '../models/state.model';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private url = environment.apiUrl;
  constructor(private http: HttpClient) { }

  /**
   * Return the list of states.
   */
  getStates() {
    return this.http.get<State>(this.url + 'state/province');
  }
}
