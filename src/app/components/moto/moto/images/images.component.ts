import {Component, OnInit} from '@angular/core';
import {MotoModel} from '../../../../models/moto-model';
import {MotoService} from '../../../../services/moto.service';
import {MediaService} from '../../../../services/media.service';
import {ImageModel} from '../../../../models/image-model';
import {imgValidator} from '../../../../validator/img-validator';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit {

  moto: MotoModel;
  selectedImg: File;
  url = '';
  urlMedia = '';
  texteIMG = 'Ajoutez une image';

  imageTab: ImageModel[];

  imgToShow: any;

  errorMsg = '';

  constructor(private motoService: MotoService,
              private mediaService: MediaService) {
  }

  ngOnInit(): void {
    this.moto = this.motoService.getSavedMoto();

    this.mediaService.getAllImgMoto(this.moto.idMoto).subscribe(res => {
      this.imageTab = res;
    });
  }

  /**
   * Method when you charge an img from your computer
   * @param event Event generated when choose an img
   * @param inputUrl Input where you tap url, only here for reset it
   */
  onFileSelected(event, inputUrl): void {
    if (event.target.files.length > 0) {
      this.selectedImg = event.target.files[0];
      this.texteIMG = this.selectedImg.name;

      const reader = new FileReader();
      reader.readAsDataURL(this.selectedImg);
      reader.onload = (ev: any) => {
        this.url = ev.target.result;
      };

      this.urlMedia = '';
      inputUrl.value = '';
    } else {
      this.texteIMG = 'Ajoutez une image';
      this.url = '';
    }
  }

  /**
   * Method when user want to add img by his link
   * @param event Event when input change
   * @param inputFile input File to reset it
   */
  onLinkChange(event, inputFile): void {
    if (event.target.value !== null && event.target.value.length !== 0) {
      this.url = event.target.value;
      this.texteIMG = this.moto.slugMoto + '_' + (this.moto.nbImages + 1);
      this.urlMedia = this.url;
      inputFile.value = null;
      this.selectedImg = null;
    } else {
      this.texteIMG = 'Ajoutez une image';
      this.url = '';
    }
  }

  /**
   * Method to upload an img
   */
  onUpload(): void {
    if (this.checkValidator()) {
      const formData = new FormData();

      if (this.selectedImg !== undefined && this.selectedImg !== null) {
        formData.append('fileMedia', this.selectedImg, this.selectedImg.name);
      } else {
        formData.append('fileMedia', new File([], ''));
      }

      formData.append('slugMoto', this.moto.slugMoto);
      formData.append('descriptionMedia', this.moto.slugMoto + '_' + (this.moto.nbImages + 1));
      formData.append('isVideo', 'false');
      formData.append('urlMedia', this.urlMedia);

      this.mediaService.saveImgMoto(formData);
    } else {
      this.errorMsg = 'Ceci n\'est pas une image';
    }
  }

  /**
   * Method to check with img validator
   */
  checkValidator(): boolean {
    if (this.url.length > 0) {
      return imgValidator(this.url);
    }
    if (this.selectedImg.name !== null) {
      return imgValidator(this.selectedImg.name);
    }
  }
}
