import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {MediaService} from '../../../../services/media.service';
import {ImageModel} from '../../../../models/image-model';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit {

  moto: MotoModel;
  selectedImg: File;
  url = '';
  texteIMG = 'Ajoutez une image';

  imageTab: ImageModel[];

  imgToShow: any;

  constructor(private motoService: MotoService,
              private mediaService: MediaService){
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();
    this.imageTab = this.mediaService.getSavedImage();
  }

  /**
   * Method when you charge an img
   * @param event Event generated when choose an img
   */
  onFileSelected(event): void {
    this.selectedImg = event.target.files[0];
    this.texteIMG = this.selectedImg.name;

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedImg);
    reader.onload = (ev: any) => {
      this.url = ev.target.result;
    };
  }

  /**
   * Method when you upload an img
   */
  onUpload(): void {
    const formData = new FormData();
    formData.append('fileMedia', this.selectedImg, this.selectedImg.name);
    formData.append('slugMoto', this.moto.slugMoto);
    formData.append('descriptionMedia', this.selectedImg.name);
    formData.append('isVideo', 'false');

    this.mediaService.saveImgMoto(formData);
  }
}
