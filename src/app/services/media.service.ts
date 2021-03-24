import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ImageModel} from '../models/image-model';
import {Observable} from 'rxjs';
import {VideoModel} from '../models/video-model';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  private url = 'http://chamalo-web.ddns.net:16650/media';

  constructor(private http: HttpClient) {
  }

  /**
   * Method to get all img of moto
   * @param idMoto Id of Moto
   */
  getAllImgMoto(idMoto: number): Observable<ImageModel[]> {
    return this.http.get<ImageModel[]>(this.url + '/img/get-all-moto/' + idMoto);
  }

  /**
   * Method to get all video of moto
   * @param idMoto Id of moto
   */
  getAllVideoMoto(idMoto: number): Observable<VideoModel[]> {
    return this.http.get<VideoModel[]>(this.url + '/video/get-all-moto/' + idMoto);
  }

  /**
   * Method to save an img
   * @param formData FormData with all data to save
   */
  saveImgMoto(formData: FormData): void {
    this.http.post(this.url + '/add-media', formData, {responseType: 'text'}).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    });
  }
}
