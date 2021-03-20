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

  constructor(private motoService: MotoService, private mediaService: MediaService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
    this.mediaService.getAllVideoMoto(this.moto.idMoto).subscribe(res => {
      this.videoTab = res;
    });
  }

  sanitizeURL(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
