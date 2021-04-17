import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AccueilComponent} from './components/accueil/accueil.component';
import {MotoComponent} from './components/moto/moto/moto.component';
import {FourOhFourComponent} from './components/four-oh-four/four-oh-four.component';
import {MotoListComponent} from './components/moto/moto-list/moto-list.component';
import {MotoAddComponent} from './components/moto/moto-add/moto-add.component';

const routes: Routes = [
  {path: '', component: AccueilComponent, pathMatch: 'full'},
  {path: 'moto', component: MotoListComponent},
  {path: 'moto/add', component: MotoAddComponent}, // Avant les routes avec param !
  {path: 'moto/:slug', component: MotoComponent},
  {path: '404', component: FourOhFourComponent},
  {path: '**', redirectTo: '/404'} // Toujours en dernier !
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: false})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
