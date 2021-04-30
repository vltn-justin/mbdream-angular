import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CategorieModel} from '../models/categorie-model';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get all categories
   */
  getAllCategories(): Observable<CategorieModel[]> {
    return this.http.get<CategorieModel[]>(environment.apiBaseUrl + '/category/get');
  }

  /**
   * Method to get one category
   * @param slug Slug of category
   */
  getCategorie(slug: string): Observable<CategorieModel> {
    return this.http.get<CategorieModel>(environment.apiBaseUrl + '/category/get/' + slug);
  }
}
