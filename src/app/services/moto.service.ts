import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MotoForm, MotoModel} from '../models/moto-model';
import {environment} from '../../environments/environment';
import {MotoList} from '../models/moto-list';

@Injectable({
  providedIn: 'root'
})
export class MotoService {

  private moto: MotoModel;

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get One Moto from database
   * @param slug Slug of moto
   */
  getOneMoto(slug: string): Observable<MotoModel> {
    return this.http.get<MotoModel>(environment.apiBaseUrl + '/motos/' + slug);
  }

  /**
   * Method to get all moto
   */
  getAllMoto(page: number): Observable<MotoList> {
    return this.http.get<MotoList>(environment.apiBaseUrl + '/motos?page=' + page);
  }

  /**
   * Method to add a new moto
   * @param newMoto MotoForm, with all data for new moto
   */
  addMoto(newMoto: MotoForm): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/motos/', newMoto, {
      responseType: 'text'
    });
  }

  /**
   * Method to update a moto
   * @param slugMoto Slug of moto
   * @param newMoto Moto with new data
   */
  updateMoto(slugMoto: string, newMoto: MotoForm): Observable<string> {
    return this.http.put(environment.apiBaseUrl + '/motos/' + slugMoto, newMoto, {
      responseType: 'text',
    });
  }

  /**
   * Method to get the count of all Moto
   */
  countAllMoto(): Observable<number> {
    return this.http.get<number>(environment.apiBaseUrl + '/motos/count');
  }

  /**
   * Method used to share data of moto to different components for moto component
   * @param moto Moto to save
   */
  saveOneMoto(moto: MotoModel): void {
    this.moto = moto;
  }

  /**
   * Method to recover saved moto
   */
  getSavedMoto(): MotoModel {
    return this.moto;
  }
}
