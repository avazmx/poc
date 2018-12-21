import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { District } from '../models/district.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private url = environment.apiUrl + 'district';
  private harcodedDistricts: District[] = [];

  private districtIdState = new Subject<number>();

  constructor(private http: HttpClient) {
    const comm1 = new District();
    comm1.id = 1;
    comm1.name = 'HardCoded value 1';
    const comm2 = new District();
    comm2.id = 2;
    comm2.name = 'HardCoded value 2';
    const comm3 = new District();
    comm3.id = 3;
    comm3.name = 'HardCoded value 3';
    this.harcodedDistricts.push(comm1);
    this.harcodedDistricts.push(comm2);
    this.harcodedDistricts.push(comm3);
  }


  setDistrictId(id: number) {
    this.districtIdState.next(id);
  }

  getDistrictId() {
    return this.districtIdState.asObservable();
  }


  /**
   * Return the list of districts.
   */
  getDistrictsByCountryId(countryId: number) {
    return this.http.get<District[]>(this.url + '/district/country/' + countryId.toString());
  }

  getHardCodedDistricts(countryId: number) {
    return this.harcodedDistricts.filter(district => district.id === countryId);
  }

}
