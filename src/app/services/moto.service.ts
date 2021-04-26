import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MotoForm, MotoModel} from '../models/moto-model';
import {environment} from '../../environments/environment';

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
    return this.http.get<MotoModel>(environment.apiBaseUrl + '/moto/get/' + slug);
  }

  /**
   * Method to get all moto
   */
  getAllMoto(page: number): Observable<MotoModel[]> {
    return this.http.get<MotoModel[]>(environment.apiBaseUrl + '/moto/get/page/' + page);
  }

  /**
   * Method to add a new moto
   * @param newMoto MotoForm, with all data for new moto
   */
  addMoto(newMoto: MotoForm): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/moto/add-moto', newMoto, {
      responseType: 'text'
    });
  }

  /**
   * Method to update a moto
   * @param newMoto Moto with new data
   */
  updateMoto(newMoto: MotoForm): Observable<string> {
    return this.http.post(environment.apiBaseUrl + '/moto/update', newMoto, {
      responseType: 'text'
    });
  }

  /**
   * Method to get the count of all Moto
   */
  countAllMoto(): Observable<number> {
    return this.http.get<number>(environment.apiBaseUrl + '/moto/count');
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
