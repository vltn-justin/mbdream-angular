import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {MarqueService} from '../../../services/marque.service';
import {MarqueModel} from '../../../models/marque-model';
import {ActivatedRoute, Router} from '@angular/router';
import {faAlignLeft, faMotorcycle} from '@fortawesome/free-solid-svg-icons';
import {DescriptionMarqueComponent} from './description-marque/description-marque.component';
import {MotosMarqueComponent} from './motos-marque/motos-marque.component';

@Component({
  selector: 'app-marque',
  templateUrl: './marque.component.html',
  styleUrls: ['./marque.component.sass']
})
export class MarqueComponent implements OnInit {

  faDesc = faAlignLeft;
  faMoto = faMotorcycle;

  marque: MarqueModel;
  slug: string;
  backgroundIMG = '';

  tabSelector: string;

  @ViewChild('contentTabMarque', {read: ViewContainerRef, static: true}) container: ViewContainerRef;

  private componentRef: ComponentRef<{}>;
  private componentsMapping = {
    description: DescriptionMarqueComponent,
    motos: MotosMarqueComponent,
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private marqueService: MarqueService,
              private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    // Path Variable; Slug
    this.slug = this.route.snapshot.params.slug;

    this.getOneMarque(this.slug);

    // Default tab is Description
    this.tabSelector = 'description';
  }

  /**
   * Method to get one marque from back
   * @param slugMarque Slug of marque
   */
  getOneMarque(slugMarque: string): void {
    this.marqueService.getOneMarque(slugMarque).subscribe(res => {
      this.marque = res;
      // On charge l'image background
      this.loadImg();
      // Partage des données avec les components enfant
      this.marqueService.saveOneMarque(this.marque);
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
    if (this.marque.logoMarque !== null) {
      this.backgroundIMG = this.marque.logoMarque;
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
