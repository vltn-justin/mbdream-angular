import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageModel} from '../models/image-model';
import {Observable} from 'rxjs';
import {VideoModel} from '../models/video-model';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get all img of moto
   * @param idMoto Id of Moto
   */
  getAllImgMoto(idMoto: number): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(environment.apiBaseUrl + '/media/img/get-all-moto/' + idMoto);
  }

  /**
   * Method to get all video of moto
   * @param idMoto Id of moto
   */
  getAllVideoMoto(idMoto: number): Observable<VideoModel[]> {
    return this.http.get<VideoModel[]>(environment.apiBaseUrl + '/media/video/get-all-moto/' + idMoto);
  }

  /**
   * Method to save an img
   * @param formData FormData with all data to save
   */
  saveMedia(formData: FormData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/media/add-media', formData, {responseType: 'text', reportProgress: true, observe: 'events'});
  }
}
