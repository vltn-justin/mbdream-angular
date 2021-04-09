import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {MediaService} from '../../../../services/media.service';
import {VideoModel} from '../../../../models/video-model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {HttpEventType} from '@angular/common/http';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.sass']
})
export class VideosComponent implements OnInit {

  moto: MotoModel;
  videoTab: VideoModel[];

  texteVideo = 'Ajoutez une vidéo';
  url = '';
  descriptionVideo = '';
  urlSafe: SafeResourceUrl;

  uploadProgress: number;

  constructor(private motoService: MotoService, private mediaService: MediaService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
    this.mediaService.getAllVideoMoto(this.moto.idMoto).subscribe(res => {
      this.videoTab = res;
    });
  }

  /**
   * Method to trust an url of a video
   * @param url Url to trust
   */
  sanitizeURL(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  /**
   * Method when you want to charge a video from a link
   * @param event Event when input change
   */
  onLinkChange(event): void {
    if (this.url.length > 0) {
      this.urlSafe = this.sanitizeURL(event.target.value);
      document.getElementById('previewVideo').style.display = 'block';
    } else {
      this.url = '';
      document.getElementById('previewVideo').style.display = 'none';
    }
  }

  /**
   * Method to upload a video
   */
  onUpload(): void {
    const formData = new FormData();

    formData.append('fileMedia', new File([], ''));

    formData.append('slugMoto', this.moto.slugMoto);
    formData.append('descriptionMedia', this.descriptionVideo);
    formData.append('isVideo', 'true');
    formData.append('urlMedia', this.url);

    this.mediaService.saveMedia(formData).subscribe(res => {
        if (res.type === HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(res.loaded / res.total) * 100;
        }
      }
    );
  }
}
