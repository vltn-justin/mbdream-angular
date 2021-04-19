import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfoForm, InfoModel} from '../models/info-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get info of a moto with is slug
   * @param slugMoto Slug of moto
   */
  getInfoMoto(slugMoto: string): Observable<InfoModel> {
    return this.http.get<InfoModel>(environment.apiBaseUrl + '/info/get/' + slugMoto);
  }

  /**
   * Method to add info
   * @param newInfo Info to add
   */
  addInfo(newInfo: InfoForm): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/info/add', newInfo, {responseType: 'text'});
  }

  /**
   * Method to update info
   * @param newInfo Info with update
   */
  updateInfo(newInfo: InfoForm): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/info/update', newInfo, {responseType: 'text'});
  }
}
