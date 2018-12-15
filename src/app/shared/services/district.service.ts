import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { District } from '../models/district.model';

@Injectable({
  providedIn: 'root'
})
export class DistrictService {
  private url = environment.apiUrl;
  private harcodedDistricts: District[] = [];
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

  /**
   * Return the list of districts.
   */
  getDistricts(countryId: number) {
    const params = new HttpParams().set('id', countryId.toString());
    return this.http.get<District[]>(this.url + 'district', { params: params });
  }

  getHardCodedDistricts(countryId: number) {
    return this.harcodedDistricts.filter(district => district.id === countryId);
  }
}
