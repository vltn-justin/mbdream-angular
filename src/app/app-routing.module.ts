import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccueilComponent} from './components/accueil/accueil.component';
import {MotoComponent} from './components/moto/moto/moto.component';
import {FourOhFourComponent} from './components/four-oh-four/four-oh-four.component';
import {MotoListComponent} from './components/moto/moto-list/moto-list.component';
import {MotoAddComponent} from './components/moto/moto-add/moto-add.component';
import {MarqueComponent} from './components/marque/marque/marque.component';
import {MarqueListComponent} from './components/marque/marque-list/marque-list.component';
import {MarqueAddComponent} from './components/marque/marque-add/marque-add.component';

const routes: Routes = [
  {path: '', component: AccueilComponent, pathMatch: 'full'},
  {path: 'motos', component: MotoListComponent},
  {path: 'motos/add', component: MotoAddComponent}, // Avant les routes avec param !
  {path: 'motos/:slug', component: MotoComponent},
  {path: 'marques', component: MarqueListComponent},
  {path: 'marques/add', component: MarqueAddComponent},
  {path: 'marques/:slug', component: MarqueComponent},
  {path: '404', component: FourOhFourComponent},
  {path: '**', redirectTo: '/404'} // Toujours en dernier !
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
