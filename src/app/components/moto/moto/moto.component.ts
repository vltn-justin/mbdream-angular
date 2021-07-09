import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MotoModel} from '../../../models/moto-model';
import {ActivatedRoute, Router} from '@angular/router';
import {MotoService} from '../../../services/moto.service';
import {faAlignLeft, faComments, faImages, faInfo, faPlay} from '@fortawesome/free-solid-svg-icons';
import {DescriptionComponent} from './description/description.component';
import {InfosComponent} from './infos/infos.component';
import {ImagesComponent} from './images/images.component';
import {VideosComponent} from './videos/videos.component';
import {ForumComponent} from './forum/forum.component';

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

  backgroundIMG = '';

  tabSelector: string;

  @ViewChild('contentTabMoto', {read: ViewContainerRef, static: true}) container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;
  private componentsMapping = {
    description: DescriptionComponent,
    infos: InfosComponent,
    images: ImagesComponent,
    videos: VideosComponent,
    forum: ForumComponent
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private service: MotoService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    // Path Variable; Slug
    this.slug = this.route.snapshot.params.slug;

    this.getOneMoto(this.slug);

    // Default tab is Description
    this.tabSelector = 'description';
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
      // Dynamic component loader for tabs
      this.changeContent();
    }, error => {
      this.router.navigate(['/404']).then(null);
    });
  }

  /**
   * Method to set background img
   */
  loadImg(): void {
    if (this.moto.backgroundImage !== null) {
      this.backgroundIMG = this.moto.backgroundImage;
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
