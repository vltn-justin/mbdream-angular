import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {MediaService} from '../../../../services/media.service';
import {VideoModel} from '../../../../models/video-model';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.sass']
})
export class VideosComponent implements OnInit {

  moto: MotoModel;
  videoTab: VideoModel[];

  selectedVideo: File;

  texteVideo = 'Ajoutez une vidéo';
  url = '';

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
   * Method when you charge a video from your computer
   * @param event Event generated when you charge a video
   * @param input Input where you tap url, only here for reset it
   */
  onFileSelected(event, input): void {

  }

  /**
   * Method when you want to charge a video from a link
   * @param event Event when input change
   * @param input Input file, only here for reset
   */
  onLinkChange(event, input): void {

  }

  /**
   * Method to upload a video
   */
  onUpload(): void {
    const formData = new FormData();
  }
}
