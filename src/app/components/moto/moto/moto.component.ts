import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MotoModel} from '../../../models/moto-model';
import {ActivatedRoute, Router} from '@angular/router';
import {MotoService} from '../../../services/moto.service';
import {faAlignLeft, faComments, faImages, faInfo, faPlay} from '@fortawesome/free-solid-svg-icons';
import {DescriptionComponent} from './description/description.component';
import {InfosComponent} from './infos/infos.component';
import {ImagesComponent} from './images/images.component';
import {VideosComponent} from './videos/videos.component';
import {CommentairesComponent} from './commentaires/commentaires.component';
import {ImageModel} from '../../../models/image-model';

@Component({
  selector: 'app-moto',
  templateUrl: './moto.component.html',
  styleUrls: ['./moto.component.sass']
})
export class MotoComponent implements OnInit {

  faDesc = faAlignLeft;
  faInfo = faInfo;
  faImage = faImages;
  faVideo = faPlay;
  faComment = faComments;

  moto: MotoModel;
  slug: string;

  imageTab: ImageModel[];
  backgroundIMG = '';

  tabSelector: string;

  @ViewChild('contentTabMoto', {read: ViewContainerRef, static: true}) container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;
  private componentsMapping = {
    description: DescriptionComponent,
    infos: InfosComponent,
    images: ImagesComponent,
    videos: VideosComponent,
    comments: CommentairesComponent
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: MotoService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    // Path Variable; Slug
    this.slug = this.route.snapshot.params.slug;

    // Get saved moto from motoList
    this.moto = this.service.getSavedMoto();

    if (this.moto !== undefined) {
      this.loadImg();
    } else if (this.slug !== undefined) {
      this.getOneMoto(this.slug);
    }

    // Default tab is Description
    this.tabSelector = 'description';

    // Dynamic component loader for tabs
    this.changeContent();
  }

  /**
   * Method to get one moto from back
   * @param slugMoto Slug of moto
   */
  getOneMoto(slugMoto: string): void {
    this.service.getOneMoto(slugMoto).subscribe(res => {
      this.moto = res;
      // On charge l'image background
      this.loadImg();
      // Partage des données avec les components enfant
      this.service.saveOneMoto(this.moto);
    }, error => {
      this.router.navigate(['/404']).then(null);
    });
  }

  /**
   * Method to set background img
   */
  loadImg(): void {
    if (this.moto.backgroundImgMoto !== null) {
      this.backgroundIMG = this.moto.backgroundImgMoto;
    }
  }

  /**
   * Method to change content displayed inside contentTabMoto
   */
  changeContent(): void {
    this.container.clear();
    const component = this.componentsMapping[this.tabSelector];
    const factory = this.componentFactoryResolver.resolveComponentFactory(component);
    this.componentRef = this.container.createComponent(factory);
  }
}
