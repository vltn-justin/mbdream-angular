import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HeaderComponent} from './components/layout/header/header.component';
import {FooterComponent} from './components/layout/footer/footer.component';
import {AppRoutingModule} from './app-routing.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AccueilComponent} from './components/accueil/accueil.component';
import {HttpClientModule} from '@angular/common/http';
import {FourOhFourComponent} from './components/four-oh-four/four-oh-four.component';
import {MotoComponent} from './components/moto/moto/moto.component';
import {MotoListComponent} from './components/moto/moto-list/moto-list.component';
import {DescriptionComponent} from './components/moto/moto/description/description.component';
import {ImagesComponent} from './components/moto/moto/images/images.component';
import {VideosComponent} from './components/moto/moto/videos/videos.component';
import {InfosComponent} from './components/moto/moto/infos/infos.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MotoAddComponent} from './components/moto/moto-add/moto-add.component';
import {ForumComponent} from './components/moto/moto/forum/forum.component';
import {QuillModule} from 'ngx-quill';
import {MarqueListComponent} from './components/marque/marque-list/marque-list.component';
import {MarqueComponent} from './components/marque/marque/marque.component';
import {MarqueAddComponent} from './components/marque/marque-add/marque-add.component';
import {DescriptionMarqueComponent} from './components/marque/marque/description-marque/description-marque.component';
import {MotosMarqueComponent} from './components/marque/marque/motos-marque/motos-marque.component';
import { CategorieComponent } from './components/categorie/categorie.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    FourOhFourComponent,
    MotoComponent,
    MotoListComponent,
    DescriptionComponent,
    ImagesComponent,
    VideosComponent,
    InfosComponent,
    MotoAddComponent,
    ForumComponent,
    MarqueListComponent,
    MarqueComponent,
    MarqueAddComponent,
    DescriptionMarqueComponent,
    MotosMarqueComponent,
    CategorieComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot({
      modules : {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          ['link'],
          ['clean'],
        ],
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
