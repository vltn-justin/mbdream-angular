import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InfoModel} from '../models/info-model';
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
}
