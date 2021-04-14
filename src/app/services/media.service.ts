import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MediaModel} from '../models/media-model';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get all video of moto
   * @param slugMoto Slug of moto
   * @param isVideo Boolean to know if you want videos or images
   */
  getAllMediaMoto(slugMoto: string, isVideo: boolean): Observable<MediaModel[]> {
    return this.http.get<MediaModel[]>(environment.apiBaseUrl + '/media/get/' + slugMoto + '/' + isVideo);
  }

  /**
   * Method to save an img
   * @param formData FormData with all data to save
   */
  saveMedia(formData: FormData): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/media/add', formData, {
      responseType: 'text',
      reportProgress: true,
      observe: 'events'
    });
  }
}
