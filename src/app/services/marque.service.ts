import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarqueModel} from '../models/marque-model';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  private url = 'http://chamalo-web.ddns.net:16650/marque';

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get One marque from database
   * @param id Id of marque
   */
  getOneMarque(id: string): Observable<MarqueModel> {
    return this.http.get<MarqueModel>(this.url + '/get/' + id);
  }

  /**
   * Method to get the count of all Marque
   */
  countAllMarque(): Observable<number> {
    return this.http.get<number>(this.url + '/count');
  }
}
