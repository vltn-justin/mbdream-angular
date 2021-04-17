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
import { DescriptionComponent } from './components/moto/moto/description/description.component';
import { ImagesComponent } from './components/moto/moto/images/images.component';
import { VideosComponent } from './components/moto/moto/videos/videos.component';
import { CommentairesComponent } from './components/moto/moto/commentaires/commentaires.component';
import { InfosComponent } from './components/moto/moto/infos/infos.component';
import {FormsModule} from '@angular/forms';
import { MotoAddComponent } from './components/moto/moto-add/moto-add.component';

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
    CommentairesComponent,
    InfosComponent,
    MotoAddComponent,
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FontAwesomeModule,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
