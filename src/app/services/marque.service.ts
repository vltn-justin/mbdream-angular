import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MarqueForm, MarqueModel} from '../models/marque-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MarqueService {

  marque: MarqueModel;

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get One marque from database
   * @param slug Slug of marque
   */
  getOneMarque(slug: string): Observable<MarqueModel> {
    return this.http.get<MarqueModel>(environment.apiBaseUrl + '/marque/get/' + slug);
  }

  /**
   * Method to get all marques limited by 10
   * @param page Page number
   */
  getAllMarquesPage(page: number): Observable<MarqueModel[]> {
    return this.http.get<MarqueModel[]>(environment.apiBaseUrl + '/marque/get/page/' + page);
  }

  /**
   * Method to get all marques (used for form)
   */
  getAllMarques(): Observable<MarqueModel[]> {
    return this.http.get<MarqueModel[]>(environment.apiBaseUrl + '/marque/get');
  }

  /**
   * Method to add a marque
   * @param newMarque New marque to add
   */
  addMarque(newMarque: MarqueForm): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/marque/add', newMarque, {
      responseType: 'text'
    });
  }

  /**
   * Method to update marque
   * @param updatedMarque Updated marque
   */
  updateMarque(updatedMarque: MarqueForm): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/marque/update', updatedMarque, {
      responseType: 'text'
    });
  }

  /**
   * Method to get the count of all Marque
   */
  countAllMarque(): Observable<number> {
    return this.http.get<number>(environment.apiBaseUrl + '/marque/count');
  }

  /**
   * Method used to share data of marque to different components for marque component
   * @param marque Marque to save
   */
  saveOneMarque(marque: MarqueModel): void {
    this.marque = marque;
  }

  /**
   * Method to recover saved marque
   */
  getSavedMarque(): MarqueModel {
    return this.marque;
  }
}
