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
