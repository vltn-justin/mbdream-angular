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
import {MediaService} from '../../../services/media.service';
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
              private mediaService: MediaService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    // Path Variable; Slug
    this.slug = this.route.snapshot.params.slug;

    if (this.slug !== undefined) {
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
      // Charge les images
      this.loadImg();
      // Partage des données avec les components enfant
      this.service.saveOneMoto(this.moto);
      // Pour actualiser les données afficher par le component enfant
      this.changeContent();
    }, error => {
      this.router.navigate(['/404']).then(null);
    });
  }

  /**
   * Method to load image and save them inside image service
   */
  loadImg(): void {
    if (this.moto.nbImages > 0) {
      this.mediaService.getAllImgMoto(this.moto.idMoto).subscribe(res => {
        this.imageTab = res;
        this.mediaService.saveListImage(this.imageTab);
      });
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

  /**
   * Method to get a random number between 0 and number of img, for display in header
   */
  randomImg(): number {
    return Math.floor((Math.random() * this.imageTab.length));
  }
}
