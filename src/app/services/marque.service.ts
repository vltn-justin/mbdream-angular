import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarqueModel} from '../models/marque-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get One marque from database
   * @param id Id of marque
   */
  getOneMarque(id: string): Observable<MarqueModel> {
    return this.http.get<MarqueModel>(environment.apiBaseUrl + '/marque/get/' + id);
  }

  /**
   * Method to get all marques
   */
  getAllMarques(page: number): Observable<MarqueModel[]> {
    return this.http.get<MarqueModel[]>(environment.apiBaseUrl + '/marque/get/page/' + page);
  }

  /**
   * Method to get the count of all Marque
   */
  countAllMarque(): Observable<number> {
    return this.http.get<number>(environment.apiBaseUrl + '/marque/count');
  }
}
